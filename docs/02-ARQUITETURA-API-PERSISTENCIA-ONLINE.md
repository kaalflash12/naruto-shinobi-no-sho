# ARQUITETURA, API, PERSISTÊNCIA E ONLINE

## 1. VISÃO GERAL

```text
NAVEGADOR
  ├─ index.html
  ├─ data/*.js
  ├─ src/r41-core-bundle.js
  ├─ src/r41-canonical-repair.js
  ├─ r41-api-config.js
  ├─ r41-github-api.js
  ├─ app.js
  └─ src/r41-final-ui-repair.js
          │
          ▼
CLOUDFLARE WORKER
  src/entry.js
          │
          ├─ guarda online / membership
          ├─ /api/ai
          ├─ /api/private/claim-leon
          ├─ world tick mapping
          └─ delegação
                 │
                 ▼
          src/index.js
          ├─ autenticação
          ├─ conta
          ├─ saves
          ├─ amigos
          ├─ mundo
          └─ sala online
                 │
        ┌────────┴────────┐
        ▼                 ▼
MONGODB ATLAS      DURABLE OBJECTS
persistência       estado vivo de sala
```

---

## 2. FRONTEND E ADAPTADOR DE API

`r41-github-api.js` substitui `window.fetch` por um adaptador que:

1. preserva o `fetch` original;
2. detecta chamadas iniciadas por `/api/`;
3. resolve o backend a partir de `window.NARUTO_R41_API_ORIGIN` ou `localStorage['sns-r41-api-origin']`;
4. injeta Bearer token de `sessionStorage['sns-v841-auth-token']` quando ainda não existe header Authorization;
5. mantém caminhos estáticos (`/assets/`, `/data/`, `/_r40/`, `/src/`) relativos ao jogo;
6. trata claim privado de Leon após login/registro;
7. não deve gravar a credencial privada Leon em localStorage.

### Estado de autenticação frontend

- token: `sessionStorage['sns-v841-auth-token']`;
- claim temporário: `sessionStorage['sns-r41-leon-claim']`;
- origem da API: `window.NARUTO_R41_API_ORIGIN` ou `localStorage['sns-r41-api-origin']`.

A lista completa de chaves detectadas no runtime é gerada em `docs/generated/04-PERSISTENCE.md`.

---

## 3. ENTRYPOINT DO WORKER

`wrangler.toml` aponta para `src/entry.js`.

O entrypoint atua como camada de segurança/compatibilidade sobre `src/index.js`.

### Responsabilidades observáveis

- CORS;
- membership online persistido;
- consulta da conta corrente usando `/api/auth/me`;
- rejeição de resultado mecânico enviado pelo cliente;
- claim privado de Leon;
- rota Workers AI;
- status enriquecido;
- mapeamento `/api/v84/world/tick` → `/api/v84/world/event`;
- delegação das demais rotas ao worker-base.

---

## 4. MONGODB ATLAS

O worker cria/reutiliza conexão MongoDB usando `MONGODB_URI` e banco `MONGODB_DB`, com fallback literal `naruto_shinobi_r41`.

O worker-base garante índices observáveis para:

| Coleção | Índice/finalidade observável |
|---|---|
| `users` | usernameLower único |
| `sessions` | sid único + TTL expiresAt |
| `saves` | userId+slotId único; data.playerId |
| `friends` | ownerId+friendId único |
| `room_registry` | roomId único + updatedAt |
| `world_events` | campaignId+createdAt |
| `world_state` | campaignId único |
| `audit_events` | createdAt |
| `recovery_codes` | userId |
| `room_memberships` | roomId+userId único, na camada entry |

Outras coleções encontradas no restante do código são incluídas automaticamente no inventário gerado.

---

## 5. AUTENTICAÇÃO

O worker-base implementa token assinado com HMAC SHA-256.

Modelo observável:

1. gera `sid` aleatório;
2. gera payload contendo usuário, sid e expiração;
3. assina payload com `AUTH_SECRET`;
4. persiste sessão em MongoDB;
5. cliente envia Bearer token;
6. backend valida assinatura;
7. valida expiração;
8. valida sessão não revogada no banco;
9. carrega usuário.

Senha é derivada por PBKDF2 SHA-256 com salt e iterações definidas pelo backend-base.

### Segurança documental

Nunca documentar ou armazenar valores reais de:

- `MONGODB_URI`;
- `AUTH_SECRET`;
- `LEON_PRIVATE_CODE`;
- tokens Bearer;
- senhas.

Documentar somente nomes, função e ciclo de vida.

---

## 6. SAVES

O worker-base possui:

- validação de objeto de save;
- limite serializado;
- resumo de slot;
- coleção `saves`;
- identificação por usuário/slot;
- versão do jogo e timestamp observáveis.

Todas as rotas literais relacionadas a save são extraídas para `docs/generated/02-API.md`, e todas as funções que tocam `saves` aparecem em `docs/generated/01-FUNCTIONS.md`.

### Regra

Nenhuma documentação pode afirmar que um campo é persistido se ele não aparecer no save/runtime ou em teste de roundtrip.

---

## 7. DURABLE OBJECT `GameRoom`

A classe `GameRoom` estende `DurableObject`.

### Estado observado

```text
roomId
title
campaignId
mode
ownerUserId
members
messages
actions
nextMessageId
createdAt
updatedAt
```

### Membro observado

```text
userId
playerId
character
role
joinedAt
lastSeen
```

### Operações observadas

#### create

- falha se a sala já existe;
- cria sala;
- registra criador como host;
- grava estado.

#### join

- adiciona/atualiza membro;
- preserva joinedAt quando já existe;
- atualiza lastSeen.

#### heartbeat

- garante/atualiza membro;
- atualiza lastSeen;
- pode atualizar character.

#### room

- retorna metadados e membros vivos.

#### message

- sanitiza mensagem;
- rejeita vazia;
- atribui ID incremental;
- limita histórico.

#### messages

- suporta `afterId`;
- devolve mensagens posteriores dentro do limite.

#### action

- recebe envelope de ação/intenção;
- bloqueia tipos administrativos óbvios no worker-base;
- camada `entry.js` aplica bloqueio mais amplo a resultado mecânico;
- mantém histórico limitado.

#### state

- devolve resumo de sala, membros, mensagens e ações recentes.

---

## 8. PRESENÇA

`GameRoom.liveMembers` considera membro vivo a partir de `lastSeen` dentro da janela implementada no código.

Separadamente, `entry.js` registra membership em MongoDB para impedir que um usuário simplesmente invente `roomId` e opere uma sala sem ter criado/entrado nela.

Membership contém, no mínimo:

```text
roomId
userId
mode
role
joinedAt
lastSeen
updatedAt
```

---

## 9. ROTAS ONLINE

A camada de guarda reconhece famílias:

```text
/api/online/*
/api/pvp/*
/api/coop/*
```

com ações:

```text
create
join
heartbeat
room
message
messages
action
state
```

A lista literal completa de rotas encontradas em todo o código está em `docs/generated/02-API.md`.

### Regras

- `create` e `join`: podem estabelecer membership após sucesso do worker-base;
- `state` sem roomId: pode listar memberships do usuário;
- demais operações protegidas exigem roomId;
- usuário deve possuir membership;
- `action` aceita intenção, não resultado mecânico;
- `heartbeat` atualiza presença.

---

## 10. WORLD TICK

O entrypoint converte `/api/v84/world/tick` em evento de mundo:

```text
type: world_tick
campaignId
minutes
source: world-tick
detail: payload original
```

O request mapeado é encaminhado para `/api/v84/world/event`.

### Regra

Avanço de tempo do frontend não deve modificar consequências persistentes de mundo sem passar pelo pipeline implementado de evento/save quando esse efeito é persistente.

---

## 11. CORS E ORIGENS

O Worker retorna headers CORS de acordo com `ALLOWED_ORIGINS/ALLOWED_ORIGIN`.

`wrangler.toml` atual contém origens explícitas de GitHub Pages e Cloudflare Pages. O código-base também inclui origens localhost para desenvolvimento.

Origem desconhecida não deve receber permissão ampla automática.

---

## 12. VARIÁVEIS/BINDINGS

### Obrigatórios para backend completo

- `MONGODB_URI` — segredo;
- `AUTH_SECRET` — segredo;
- `MONGODB_DB` — variável;
- `GAME_ROOMS` — Durable Object binding.

### Funcionalidades opcionais/condicionais

- `AI` — Workers AI binding;
- `LEON_PRIVATE_CODE` — segredo de claim privado;
- `ALLOWED_ORIGINS` / `ALLOWED_ORIGIN` — CORS.

A lista completa de referências `env.*` é produzida no JSON gerado.

---

## 13. CONTRATO DE ERRO

Erros observados devem ser preservados como códigos semânticos, por exemplo:

```text
UNAUTHORIZED
ROOM_ID_REQUIRED
ROOM_MEMBERSHIP_REQUIRED
CLIENT_MECHANICAL_RESULT_FORBIDDEN
PRIVATE_ACCESS_DENIED
LEON_CLAIM_ALREADY_USED
WORKERS_AI_NOT_BOUND
WORKERS_AI_FAILED
DATABASE_UNAVAILABLE
SERVER_NOT_CONFIGURED
```

O inventário de funções/rotas deve ser usado para localizar todos os demais códigos.

---

## 14. MATRIZ DE TESTES MÍNIMA

| ID | Fluxo | Prova esperada |
|---|---|---|
| API-TEST-001 | status | HTTP 200 + build/configuração |
| AUTH-TEST-001 | registro | conta + token |
| AUTH-TEST-002 | login/me | token recupera mesma conta |
| SAVE-TEST-001 | save/load | roundtrip idêntico dos campos persistidos |
| ROOM-TEST-001 | create | criador vira host |
| ROOM-TEST-002 | join | membro aparece |
| ROOM-TEST-003 | heartbeat | lastSeen avança |
| ROOM-TEST-004 | ação sem membership | 403 |
| ROOM-TEST-005 | resultado mecânico cliente | 400 + guard canônico |
| MSG-TEST-001 | message/messages | mensagem reaparece |
| WORLD-TEST-001 | world tick | evento persistido/retornado conforme contrato |
| AI-TEST-001 | `/api/ai` | provider/modelo efetivo |
| AI-TEST-002 | não-invenção | IA não concede mecânica sem fato |

Sem execução recente desses testes, o status é `UNVERIFIED`, não `PASS_RUNTIME`.
