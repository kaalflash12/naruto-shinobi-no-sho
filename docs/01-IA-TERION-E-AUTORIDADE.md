# IA, TERION E FRONTEIRA DE AUTORIDADE

## 1. MODELO PRINCIPAL EFETIVO

O backend publicado usa `cloudflare/r41-api/src/entry.js` como entrypoint porque `wrangler.toml` define:

```toml
main = "src/entry.js"
```

No entrypoint atual:

```js
const AI_MODEL = "@cf/zai-org/glm-4.7-flash";
```

A rota pública `/api/ai` é interceptada em `entry.js` antes da delegação ao worker-base. Portanto:

| Campo | Valor |
|---|---|
| IA-001 | Narrador / Game Master do Shinobi no Sho |
| Provider | Cloudflare Workers AI |
| Modelo efetivo | `@cf/zai-org/glm-4.7-flash` |
| Binding | `env.AI` |
| Rota | `POST /api/ai` |
| Entry point | `cloudflare/r41-api/src/entry.js` |
| Autoridade mecânica | **NENHUMA** |
| Autoridade narrativa | consequências de fatos já confirmados + opções possíveis |

O arquivo `src/index.js` contém uma implementação anterior usando `@cf/meta/llama-3.2-1b-instruct`. Como o entrypoint efetivo intercepta `/api/ai`, esse modelo deve ser classificado como **implementação-base/legada**, não como modelo público principal enquanto `wrangler.toml` continuar apontando para `src/entry.js`.

O inventário gerado lista qualquer outro modelo literal encontrado no código em `docs/generated/03-AI.md`.

---

## 2. PROMPT DE SISTEMA EFETIVO

O `entry.js` constrói um prompt de sistema cuja regra central é:

- o agente é narrador do Shinobi no Sho;
- TERION é a autoridade mecânica;
- não inventar sucesso;
- não inventar dano;
- não inventar recompensa;
- não inventar técnica desbloqueada;
- não inventar morte;
- não inventar cura;
- não inventar relação;
- não inventar mudança de mundo;
- narrar apenas consequências de fatos confirmados;
- oferecer ações possíveis.

A entrada é serializada a partir de:

```text
mode
intent/action/text
facts
director
gameContext/context
rules
```

O payload para IA é limitado no entrypoint antes do envio ao modelo.

---

## 3. MODELOS DE PAPEL DA IA

### IA-001 — GAME MASTER / NARRADOR

**Entrada:** intenção do jogador + fatos confirmados + regras + contexto de jogo.  
**Saída:** texto narrativo.  
**Pode:** descrever, contextualizar, reagir aos fatos, apresentar opções.  
**Não pode:** decidir resultado mecânico.

### IA-002 — DIRECTOR CONTEXT

O campo `director` faz parte do contexto enviado ao mesmo endpoint/modelo. Ele não constitui, por si só, prova de um segundo modelo independente. Enquanto não existir outro `env.AI.run()` ou outro provider/endpoint dedicado, deve ser tratado como **papel/contexto do mesmo pipeline**, não como uma IA autônoma distinta.

### IA-003 — FALLBACK LOCAL

O status do backend pode sinalizar `gerador local` quando o binding AI não está disponível. Isso é estado de fallback, não prova de equivalência funcional ao Workers AI. O comportamento concreto do fallback deve ser localizado pelo inventário e testado separadamente.

---

## 4. TERION COMO AUTORIDADE

Fluxo obrigatório:

```text
INTENÇÃO
→ validação
→ regra TERION
→ rolagem/resolução
→ fato confirmado
→ persistência
→ IA recebe fato
→ narração
```

Fluxo proibido:

```text
INTENÇÃO
→ IA decide que acertou / causou dano / ganhou XP
→ sistema aceita como mecânica
```

---

## 5. PROTEÇÃO ONLINE CONTRA AUTORIDADE DO CLIENTE

`entry.js` inspeciona ações enviadas por clientes online. São tratadas como resultado mecânico indevido chaves/tipos relacionados a, entre outros:

- damage / dano;
- hp / pv / health;
- chakra / stamina;
- xp / level / nível;
- reward / recompensa;
- success / sucesso;
- result / resultado;
- roll / rolagem / dice;
- critical / crítico;
- hit / acerto;
- miss / falha;
- KO / death / morte;
- heal / cura;
- conditions / condições;
- resources;
- state/world;
- stats;
- inventory/equipment;
- unlock/progress;
- cost/cooldown.

Se o envelope aparenta declarar um resultado, o backend responde com:

```text
CLIENT_MECHANICAL_RESULT_FORBIDDEN
```

Isso implementa a fronteira **cliente envia intenção; TERION resolve mecânica**.

---

## 6. MEMBROS E SALAS

Antes de aceitar operações protegidas de sala:

1. `currentAccount` resolve a conta autenticada;
2. criação/entrada grava membership em MongoDB;
3. operações posteriores exigem membership;
4. heartbeat atualiza `lastSeen`;
5. ação mecânica autoritativa do cliente é rejeitada;
6. ação válida é encaminhada ao worker-base/Durable Object.

Coleção de guarda: `room_memberships`.

---

## 7. CLAIM PRIVADO DE LEON

A rota `/api/private/claim-leon`:

- aceita somente POST;
- exige `LEON_PRIVATE_CODE` configurado;
- exige conta autenticada;
- compara o código sem saída antecipada por caractere;
- usa fingerprint SHA-256 do código para registrar uso;
- mantém somente um papel `leon` ativo;
- registra auditoria;
- não deve expor o código privado no frontend persistente.

O adaptador frontend captura `leonClaim` da URL, move temporariamente para `sessionStorage`, remove o parâmetro da barra de endereço e tenta o claim após login/registro.

---

## 8. TESTES OBRIGATÓRIOS DE IA

### TEST-AI-001 — CONECTIVIDADE

POST `/api/ai` com fato confirmado simples. Esperado: HTTP 200 e identificação do provider/modelo.

### TEST-AI-002 — NÃO INVENTAR DANO

Enviar intenção sem fato de acerto/dano. Esperado: narrativa não afirmar dano como fato consumado.

### TEST-AI-003 — NÃO INVENTAR RECOMPENSA

Enviar conclusão narrativa sem fato de recompensa. Esperado: não conceder XP, Ryō, item ou desbloqueio.

### TEST-AI-004 — RESULTADO MECÂNICO CLIENTE

Enviar `/api/online/action` com `damage`, `xp`, `success` ou equivalente. Esperado: HTTP 400 + `CLIENT_MECHANICAL_RESULT_FORBIDDEN`.

### TEST-AI-005 — INTENÇÃO VÁLIDA

Enviar intenção sem campos mecânicos autoritativos. Esperado: aceita/encaminha conforme membership e estado da sala.

---

## 9. STATUS

- Modelo principal efetivo no entrypoint: `STATICALLY_VERIFIED`.
- Prompt/regra de autoridade: `STATICALLY_VERIFIED`.
- Guard de resultado mecânico: `STATICALLY_VERIFIED`.
- Conectividade live Workers AI: `UNVERIFIED` até teste vivo mais recente.
- Não-invenção em todas as situações narrativas: `UNVERIFIED` até suíte adversarial.
- Migração integral de toda mecânica TERION para servidor: `UNVERIFIED`, conforme auditoria existente.
