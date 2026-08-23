import fs from 'node:fs';
import path from 'node:path';

const origin = String(process.env.API_ORIGIN || '').trim().replace(/\/+$/g, '');
const outPath = process.env.LIVE_BACKEND_REPORT || 'audit/LIVE-BACKEND.json';
const startedAt = new Date().toISOString();
const failures = [];
const checks = {};
const evidence = {};

function assert(cond, msg) { if (!cond) throw new Error(msg); }
function record(name, value = true) { checks[name] = !!value; }
async function request(route, { method = 'POST', token = '', body, expected = [200] } = {}) {
  const headers = { accept: 'application/json' };
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(`${origin}${route}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'error' });
  let data = null; const raw = await res.text();
  try { data = raw ? JSON.parse(raw) : null; } catch { data = { raw }; }
  if (!expected.includes(res.status)) throw new Error(`${route} retornou HTTP ${res.status}; esperado ${expected.join('/')}; body=${raw.slice(0, 1200)}`);
  return { res, data };
}
function safe(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const copy = structuredClone(obj);
  for (const key of ['token', 'recoveryCode', 'password']) if (key in copy) copy[key] = '[REDACTED]';
  return copy;
}
function writeReport(status, ok) {
  const report = { generatedAt: new Date().toISOString(), startedAt, status, ok, scope: 'CLOUDFLARE_WORKER_MONGODB_DURABLE_OBJECTS_LIVE', apiOrigin: origin || null, checks, evidence, failures };
  fs.mkdirSync(path.dirname(outPath), { recursive: true }); fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n'); console.log(JSON.stringify(report, null, 2)); return report;
}

try {
  assert(/^https:\/\/[^/]+/i.test(origin), 'API_ORIGIN ausente ou inválido; exige HTTPS real.');

  const status = await request('/api/status', { method: 'GET', expected: [200] });
  evidence.status = safe(status.data);
  assert(status.data?.ok === true, 'status.ok != true');
  assert(status.data?.configured === true, `Worker não configurado: ${JSON.stringify(status.data)}`);
  assert(status.data?.cloudSave === true, 'MongoDB/cloudSave não está ativo.');
  assert(status.data?.onlineRooms === true, 'Durable Object GAME_ROOMS não está ativo.');
  assert(status.data?.storage === 'mongodb-atlas', `Storage inesperado: ${status.data?.storage}`);
  assert(status.data?.realtime === 'cloudflare-durable-objects', `Realtime inesperado: ${status.data?.realtime}`);
  assert(status.data?.serverMechanicalResolution === true, 'resolução mecânica server-side não anunciada');
  assert(status.data?.clientDifficultyIgnored === true, 'difficulty do cliente ainda não está marcada como ignorada');
  assert(status.data?.clientRoomCharacterIgnored === true, 'personagem da sala enviado pelo cliente ainda não está marcado como ignorado');
  assert(status.data?.mechanicsReadFromMongoProfile === true, 'TERION não anuncia mechanical_profiles como fonte');
  assert(status.data?.clientAutosaveCannotOverwriteMechanicalProfile === true, 'autosave ainda pode sobrescrever perfil mecânico');
  assert(status.data?.leaderboardUsesMechanicalProfiles === true, 'leaderboard não anuncia mechanical_profiles');
  assert(status.data?.worldMechanicalPayloadSanitized === true, 'world event não anuncia sanitização mecânica');
  record('statusConfigured');
  record('authoritativeBoundariesAdvertised');

  const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const password = `E2E!${suffix}aA9`;
  const userA = `e2e_a_${suffix}`.slice(0, 32);
  const userB = `e2e_b_${suffix}`.slice(0, 32);
  const emailA = `${userA}@example.test`;

  const regA = await request('/api/auth/register', { body: { username: userA, password, displayName: `E2E A ${suffix}`, email: emailA }, expected: [201] });
  const regB = await request('/api/auth/register', { body: { username: userB, password, displayName: `E2E B ${suffix}` }, expected: [201] });
  assert(regA.data?.ok && regA.data?.token && regA.data?.account?.id, 'registro A inválido');
  assert(regB.data?.ok && regB.data?.token && regB.data?.account?.id, 'registro B inválido');
  let tokenA = regA.data.token; const tokenB = regB.data.token;
  evidence.accounts = [{ id: regA.data.account.id, username: regA.data.account.username }, { id: regB.data.account.id, username: regB.data.account.username }];
  record('registerTwoAccounts');

  const meA = await request('/api/auth/me', { token: tokenA });
  const meB = await request('/api/auth/me', { token: tokenB });
  assert(meA.data?.account?.username === userA, 'auth/me A não corresponde');
  assert(meA.data?.account?.email === emailA, 'auth/me A não restituiu e-mail');
  assert(meB.data?.account?.username === userB, 'auth/me B não corresponde');
  record('authenticatedSessions');
  record('accountEmailPersisted');

  const unauthorized = await request('/api/account/slots', { expected: [401] });
  assert(unauthorized.data?.error === 'UNAUTHORIZED', 'rota protegida não recusou anônimo');
  record('unauthorizedRejected');

  const slotId = `e2e-${suffix}`;
  const marker = `marker-${suffix}`;
  const saveData = {
    version: 'R41-E2E', playerId: `player-${suffix}`, campaignId: `campaign-${suffix}`,
    character: { name: 'E2E Shinobi', level: 7, chakra: 19, pv: 21 },
    stats: { totalXp: 700 }, world: { marker }, resources: { chakra: 19, kurai: 8 }, missions: { e2e: { state: 'active' } }
  };
  const save = await request('/api/account/save', { token: tokenA, body: { slotId, save: saveData, gameVersion: 'R41-E2E' } });
  assert(save.data?.saved === true && Number(save.data?.revision) >= 1, 'save não confirmou revisão');
  const load = await request('/api/account/load', { token: tokenA, body: { slotId } });
  assert(load.data?.save?.world?.marker === marker, 'load não restituiu marcador salvo');
  assert(load.data?.save?.resources?.kurai === 8, 'load não restituiu Kurai');
  record('mongoSaveRoundTrip');

  const slots = await request('/api/account/slots', { token: tokenA, body: {} });
  assert(Array.isArray(slots.data?.slots) && slots.data.slots.some(x => x.slotId === slotId), 'slot salvo não apareceu');
  record('slotListing');

  const create = await request('/api/online/create', {
    token: tokenA,
    body: { title: `E2E ${suffix}`, campaignId: `campaign-${suffix}`, playerId: `player-a-${suffix}`, character: { name: 'CLIENT FORGED NAME', level: 77 } }
  });
  const roomId = String(create.data?.roomId || '');
  assert(roomId.startsWith('room-'), `roomId inválido: ${roomId}`);
  const createA = (create.data?.members || []).find(x => String(x.userId) === String(regA.data.account.id));
  assert(Number(createA?.character?.level) === 7, `create aceitou nível do cliente em vez do baseline: ${JSON.stringify(createA)}`);
  evidence.roomId = roomId;
  record('roomCreate');
  record('mechanicalBaselineLockedAtFirstAuthorityUse');

  const forgedSave = structuredClone(saveData);
  forgedSave.character.level = 99;
  forgedSave.character.chakra = 9999;
  forgedSave.character.pv = 9999;
  forgedSave.stats.totalXp = 999999;
  const overwrite = await request('/api/account/save', { token: tokenA, body: { slotId, save: forgedSave, gameVersion: 'R41-E2E-FORGED-CONTINUITY' } });
  assert(overwrite.data?.saved === true, 'autosave de continuidade não foi aceito');
  const continuityLoad = await request('/api/account/load', { token: tokenA, body: { slotId } });
  assert(Number(continuityLoad.data?.save?.character?.level) === 99, 'save de continuidade deveria permanecer independente do perfil mecânico');
  record('continuitySaveSeparatedFromMechanicalAuthority');

  const join = await request('/api/online/join', { token: tokenB, body: { roomId, playerId: `player-b-${suffix}`, character: { name: 'Shinobi B', level: 55 } } });
  assert(join.data?.ok === true, 'join B falhou');
  record('roomJoinSecondAccount');

  await request('/api/online/heartbeat', { token: tokenA, body: { roomId, playerId: `player-a-${suffix}`, character: { name: 'FORGED HEARTBEAT', level: 99, chakra: 9999 } } });
  await request('/api/online/heartbeat', { token: tokenB, body: { roomId, playerId: `player-b-${suffix}`, character: { name: 'Shinobi B', level: 55 } } });
  record('roomHeartbeat');

  const msg = await request('/api/online/message', { token: tokenA, body: { roomId, playerId: `player-a-${suffix}`, characterName: 'Shinobi A', message: `mensagem-${suffix}` } });
  assert(msg.data?.message?.message === `mensagem-${suffix}`, 'mensagem não persistiu');
  const messages = await request('/api/online/messages', { token: tokenB, body: { roomId, afterId: 0 } });
  assert(messages.data?.messages?.some(x => x.message === `mensagem-${suffix}`), 'segunda conta não recebeu mensagem');
  record('roomMessaging');

  const intent = await request('/api/online/action', {
    token: tokenA,
    body: { roomId, playerId: `player-a-${suffix}`, action: { type: 'move', intent: 'move', direction: 'north', target: 'training-field' } }
  });
  assert(intent.data?.accepted === true, 'ação de intenção válida foi recusada');
  assert(intent.data?.mechanicalResult?.authority === 'server', 'resultado TERION não é server-side');
  assert(intent.data?.mechanicalResult?.system === 'TERION_2D10', 'sistema mecânico inesperado');
  assert(Number(intent.data?.mechanicalResult?.modifier?.level) === 7, `autosave forjado alterou nível mecânico: ${JSON.stringify(intent.data?.mechanicalResult)}`);
  assert(Number(intent.data?.mechanicalResult?.dc) === 12, 'CD server-side normal não foi aplicada');
  record('intentActionAccepted');
  record('terionUsesLockedMechanicalProfile');

  const forged = await request('/api/online/action', {
    token: tokenA,
    body: { roomId, playerId: `player-a-${suffix}`, action: { type: 'attack', intent: 'attack', damage: 999, success: true, xp: 5000, atributos: { tecnica: 99 }, CD: 1 } },
    expected: [400]
  });
  assert(forged.data?.error === 'CLIENT_MECHANICAL_RESULT_FORBIDDEN', `resultado mecânico forjado não foi bloqueado: ${JSON.stringify(forged.data)}`);
  record('clientMechanicalResultRejected');

  const state = await request('/api/online/state', { token: tokenB, body: { roomId } });
  const members = state.data?.state?.members || [];
  const actions = state.data?.state?.actions || [];
  assert(members.length >= 2, `estado da sala não contém 2 membros: ${members.length}`);
  assert(actions.some(x => x.type === 'move'), 'ação aceita não apareceu no estado da sala');
  const stateA = members.find(x => String(x.userId) === String(regA.data.account.id));
  assert(Number(stateA?.character?.level) === 7, `heartbeat forjado alterou nível da sala: ${JSON.stringify(stateA)}`);
  record('roomStateSynchronized');
  record('forgedHeartbeatIgnored');

  const leaderboard = await request('/api/leaderboard', { token: tokenA, body: {} });
  assert(leaderboard.data?.authority === 'mechanical_profiles', 'leaderboard não usa mechanical_profiles');
  assert(leaderboard.data?.clientSaveRankIgnored === true, 'leaderboard não declara save do cliente ignorado');
  const rankA = (leaderboard.data?.leaderboard || []).find(x => x.username === userA);
  assert(Number(rankA?.level) === 7, `autosave forjado alterou ranking: ${JSON.stringify(rankA)}`);
  assert(Number(rankA?.xp) === 700, `XP forjado alterou ranking: ${JSON.stringify(rankA)}`);
  record('leaderboardIgnoresForgedAutosave');

  const world = await request('/api/v84/world/event', {
    token: tokenA,
    body: { type: 'world_tick', campaignId: `campaign-${suffix}`, minutes: 20, source: 'live-e2e', detail: { verified: true, marker, hp: 9999, recompensa: { xp: 999999 }, nested: { note: 'preserved', chakra: 9999 } } }
  });
  assert(world.data?.ok === true && world.data?.event?.type === 'world_tick', 'world event não persistiu');
  assert(world.data?.event?.detail?.marker === marker, 'world event perdeu dado narrativo legítimo');
  assert(world.data?.event?.detail?.hp === undefined, 'world event persistiu HP mecânico do cliente');
  assert(world.data?.event?.detail?.recompensa === undefined, 'world event persistiu recompensa mecânica do cliente');
  assert(world.data?.event?.detail?.nested?.note === 'preserved' && world.data?.event?.detail?.nested?.chakra === undefined, 'sanitização aninhada de world event falhou');
  record('worldEventPersisted');
  record('worldMechanicalPayloadSanitizedLive');

  const savepoint = await request('/api/v84/world/savepoint', {
    token: tokenA,
    body: { campaignId: `campaign-${suffix}`, label: `E2E savepoint ${suffix}`, changes: [{ note: 'room joined', hp: 9999 }, { note: 'intent accepted', recompensa: { xp: 9999 } }], character: { name: 'FORGED SAVEPOINT', level: 99, chakra: 9999 } }
  });
  assert(savepoint.data?.ok === true, 'savepoint não persistiu');
  record('worldSavePointPersisted');

  if (status.data?.enabled === true) {
    const ai = await request('/api/ai', {
      token: tokenA,
      body: { mode: 'game_master', intent: 'narrar consequência', facts: [{ type: 'verified_e2e_fact', text: 'O shinobi entrou na sala de treino.' }], gameContext: { rules: 'TERION 2D10 é autoridade mecânica. Não invente resultados.', facts: [{ type: 'verified_e2e_fact', text: 'O shinobi entrou na sala de treino.' }] } }
    });
    assert(ai.data?.ok === true && ai.data?.provider === 'cloudflare-workers-ai' && ai.data?.model, 'Workers AI live falhou');
    evidence.ai = { provider: ai.data.provider, model: ai.data.model }; record('workersAiLive');
  } else { checks.workersAiLive = false; failures.push('Workers AI binding não está ativo no status live.'); throw new Error('Workers AI binding não está ativo.'); }

  await request('/api/account/delete', { token: tokenA, body: { slotId } });
  record('e2eSaveCleanup');

  await request('/api/auth/logout', { token: tokenA, body: {} });
  const afterLogout = await request('/api/auth/me', { token: tokenA, body: {}, expected: [401] });
  assert(afterLogout.data?.error === 'UNAUTHORIZED', 'logout não revogou sessão');
  record('sessionRevocation');

  const emailLogin = await request('/api/auth/login', { body: { identifier: emailA, password } });
  assert(emailLogin.data?.ok === true && emailLogin.data?.account?.username === userA, 'login por e-mail live falhou');
  tokenA = emailLogin.data.token;
  record('emailLoginLive');

  const deleteA = await request('/api/auth/delete-account', { token: tokenA, body: {} });
  assert(deleteA.data?.deleted === true, 'exclusão da conta A falhou');
  const deletedMe = await request('/api/auth/me', { token: tokenA, body: {}, expected: [401] });
  assert(deletedMe.data?.error === 'UNAUTHORIZED', 'sessão A permaneceu válida após excluir conta');
  const afterDeleteRank = await request('/api/leaderboard', { token: tokenB, body: {} });
  assert(!(afterDeleteRank.data?.leaderboard || []).some(x => x.username === userA), 'perfil mecânico da conta excluída permaneceu no leaderboard');
  record('accountDeleteCleansMechanicalProfile');

  const deleteB = await request('/api/auth/delete-account', { token: tokenB, body: {} });
  assert(deleteB.data?.deleted === true, 'exclusão da conta B falhou');
  record('e2eAccountCleanup');

  writeReport('PASS_LIVE_BACKEND_E2E', true);
} catch (error) {
  failures.push(String(error?.stack || error?.message || error));
  writeReport('FAIL_LIVE_BACKEND_E2E', false);
  process.exitCode = 1;
}
