(() => {
  'use strict';

  const SAVE_KEY = 'narutoShinobiNoShoPcV4';
  const ACTIONS = new Set(['v82-basic-melee']);
  let installedApiBridge = false;

  const clone = value => {
    try { return JSON.parse(JSON.stringify(value)); } catch { return value; }
  };

  function readSave() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch { return null; }
  }

  function writeSave(save) {
    if (!save || typeof save !== 'object') return false;
    try {
      save.updatedAt = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
      return true;
    } catch (error) {
      console.error('[R41_V82_BRIDGE_SAVE]', error);
      return false;
    }
  }

  function collectVitals(root) {
    const out = [];
    const seen = new WeakSet();
    const walk = (value, path, depth) => {
      if (!value || typeof value !== 'object' || depth > 9) return;
      if (seen.has(value)) return;
      seen.add(value);
      for (const [key, child] of Object.entries(value)) {
        const nextPath = path ? `${path}.${key}` : key;
        if (typeof child === 'number' && Number.isFinite(child) && /(?:^|\.)(?:hp|pv|life|vida|chakra)$/i.test(nextPath)) {
          out.push({ path: nextPath, value: child });
        } else if (child && typeof child === 'object') {
          walk(child, nextPath, depth + 1);
        }
      }
    };
    walk(root, '', 0);
    return out;
  }

  function byPath(vitals) {
    return new Map((vitals || []).map(item => [item.path, Number(item.value || 0)]));
  }

  function classifyPath(path) {
    const p = String(path || '').toLowerCase();
    if (/(enemy|inimigo|opponent|target|advers)/.test(p)) return 'enemy';
    if (/(player|jogador|character|personagem|hero|leon)/.test(p)) return 'player';
    return 'unknown';
  }

  function diffVitals(beforeSave, afterSave) {
    const before = byPath(collectVitals(beforeSave));
    const after = byPath(collectVitals(afterSave));
    const changes = [];
    for (const [path, b] of before) {
      if (!after.has(path)) continue;
      const a = after.get(path);
      if (a !== b) changes.push({ path, before: b, after: a, delta: a - b, owner: classifyPath(path) });
    }
    return changes;
  }

  function saveFingerprint(save) {
    if (!save) return '';
    try {
      const r = save.r41 || {};
      const master = save.masterV83 || save.masterV84 || save.r27?.master || {};
      return JSON.stringify({
        vitals: collectVitals(save),
        ticks: master?.world?.ticks,
        encounter: save.v82 || save.encounter || save.combat || save.battle || null,
        narrative: r.narrative?.lastConfirmedFact || ''
      });
    } catch { return ''; }
  }

  function makeResult(beforeSave, afterSave, beforeText, afterText) {
    const changes = diffVitals(beforeSave, afterSave);
    const enemyLosses = changes.filter(x => x.owner === 'enemy' && x.delta < 0 && /(?:hp|pv|life|vida)$/i.test(x.path));
    const playerSpend = changes.filter(x => x.owner === 'player' && x.delta < 0 && /chakra$/i.test(x.path));
    const enemyDamage = enemyLosses.reduce((sum, x) => sum + Math.abs(x.delta), 0);
    const spent = playerSpend.reduce((sum, x) => sum + Math.abs(x.delta), 0);
    const changed = saveFingerprint(beforeSave) !== saveFingerprint(afterSave) || String(beforeText || '') !== String(afterText || '');
    if (!changed) return null;

    const lower = String(afterText || '').toLowerCase();
    const blocked = /bloqueio lógico|exige aproximação|não pode|impedido|sem alvo/.test(lower);
    const hit = enemyDamage > 0;
    const enemyKo = enemyLosses.some(x => x.after <= 0);
    return {
      actionType: 'attack',
      source: 'v82_basic_melee',
      label: 'Ataque básico',
      confirmed: true,
      hit,
      blocked,
      damage: enemyDamage,
      resourceSpent: spent,
      ko: enemyKo,
      changes
    };
  }

  function makePresentation(result) {
    const technique = { id: 'v82-basic-melee', name: 'Ataque básico', type: 'attack', class: 'attack' };
    const events = window.SNSCombatPresentationEngine?.fromResult?.(result) || [];
    const validation = window.SNSCombatPresentationEngine?.validate?.(result, events) || { ok: true, errors: [] };
    const states = window.SNSVisualStateEngine?.fromCombatResult?.(result) || [];
    const animation = window.SNSAnimationRegistry?.infer?.(technique) || null;
    return { at: Date.now(), result: clone(result), events: clone(events), states: clone(states), animation: clone(animation), validation: clone(validation) };
  }

  function renderPresentation(presentation) {
    try { document.querySelectorAll('.r41-combat-present').forEach(node => node.remove()); } catch {}
    const result = presentation?.result || {};
    const node = document.createElement('div');
    node.className = `r41-combat-present ${result.blocked ? 'miss' : Number(result.damage || 0) > 0 ? 'hit' : 'miss'}`;
    const detail = result.blocked ? 'Ação impedida pelas regras do encontro' : result.hit ? `${Number(result.damage || 0)} dano` : 'Sem dano';
    node.innerHTML = `<b>Ataque básico</b><small>${detail}</small>`;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 1100);
  }

  function persistPresentation(presentation) {
    const save = readSave();
    if (!save) return;
    save.r41 = save.r41 && typeof save.r41 === 'object' ? save.r41 : {};
    save.r41.lastCombatPresentation = clone(presentation);
    save.r41.autosave = save.r41.autosave && typeof save.r41.autosave === 'object'
      ? save.r41.autosave
      : { localAt: 0, cloudAt: 0, lastError: '', pending: false };
    save.r41.autosave.localAt = Date.now();
    save.r41.narrative = save.r41.narrative && typeof save.r41.narrative === 'object' ? save.r41.narrative : { freeActions: [], lastConfirmedFact: '' };
    save.r41.narrative.lastConfirmedFact = presentation.result.blocked
      ? 'Ataque básico tentado e impedido pelas regras confirmadas do encontro.'
      : `Ataque básico confirmado: ${Number(presentation.result.damage || 0)} de dano.`;
    writeSave(save);
  }

  function installPublicApiBridge() {
    if (installedApiBridge || !window.__NARUTO_R41__?.state) return;
    const api = window.__NARUTO_R41__;
    const baseState = api.state.bind(api);
    api.state = () => {
      const base = baseState() || {};
      const persisted = readSave()?.r41 || {};
      if (persisted.lastCombatPresentation && !base.lastCombatPresentation) {
        base.lastCombatPresentation = clone(persisted.lastCombatPresentation);
      }
      if (persisted.autosave) base.autosave = { ...(base.autosave || {}), ...clone(persisted.autosave) };
      return base;
    };
    installedApiBridge = true;
  }

  async function finishAction(beforeSave, beforeText) {
    await new Promise(resolve => setTimeout(resolve, 260));
    installPublicApiBridge();
    const afterSave = readSave();
    const afterText = document.querySelector('#screen')?.innerText || '';
    const result = makeResult(beforeSave, afterSave, beforeText, afterText);
    if (!result) return;
    const presentation = makePresentation(result);
    persistPresentation(presentation);
    try { window.SNSSavePointManager?.record?.('combat_result', { result: clone(result), validation: clone(presentation.validation), source: 'v82_bridge' }); } catch {}
    try { document.dispatchEvent(new CustomEvent('sns:r41-combat-result', { detail: clone(presentation) })); } catch {}
    renderPresentation(presentation);
    if (presentation.validation?.ok === false) console.error('[R41_V82_COMBAT_GATE]', presentation.validation.errors, result);
  }

  document.addEventListener('click', event => {
    const button = event.target?.closest?.('[data-action]');
    const action = button?.getAttribute?.('data-action') || '';
    if (!ACTIONS.has(action) || button.disabled) return;
    const beforeSave = readSave();
    const beforeText = document.querySelector('#screen')?.innerText || '';
    queueMicrotask(() => finishAction(beforeSave, beforeText));
  }, true);

  const boot = () => installPublicApiBridge();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  setTimeout(boot, 0);
})();
