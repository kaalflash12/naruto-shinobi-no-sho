# RASTREABILIDADE E VALIDAÇÃO

## 1. PRINCÍPIO

Nenhuma afirmação de “funciona”, “está completo” ou “100%” deve existir sem uma evidência associada.

Cada requisito precisa de:

```text
ID
categoria
descrição
fonte no código
função/método
entrada
efeito esperado
persistência esperada
teste
resultado
status
evidência
```

---

## 2. STATUS CANÔNICOS

| Status | Significado |
|---|---|
| `PASS_STATIC_COVERAGE` | o gerador encontrou o elemento e a documentação liga-o ao código |
| `PASS_RUNTIME` | execução isolada confirmou o comportamento |
| `PASS_E2E` | fluxo completo usuário → sistema → persistência → usuário foi confirmado |
| `FAIL` | existe evidência concreta de erro |
| `UNVERIFIED` | falta prova suficiente |
| `NOT_APPLICABLE` | comprovadamente não se aplica |

### Proibição

`PASS_STATIC_COVERAGE` **não pode** ser renomeado para `PASS_RUNTIME` ou `PASS_E2E`.

---

## 3. MATRIZ GERADA

`tools/generate-technical-spec.mjs` cria `docs/generated/08-TRACEABILITY.md`.

IDs automáticos:

- `FUNC-xxxxx` — função/método;
- `API-xxxxx` — rota;
- `AI-xxxxx` — modelo IA literal;
- `DB-xxxxx` — coleção MongoDB;
- `UI-xxxxx` — ação de interface;
- `EVENT-xxxxx` — evento DOM;
- `SCRIPT-xxxxx` — script carregado;
- evidências de movimento — IDs gerados no inventário.

A fonte inclui arquivo e linha.

---

## 4. GATE DOCUMENTAL AUTOMÁTICO

Executar:

```bash
node tools/generate-technical-spec.mjs
node tools/audit-documentation-coverage.mjs
```

A auditoria falha quando, entre outros casos:

- um script declarado pelo `index.html` não existe;
- função descoberta não tem ID/nome/arquivo/linha;
- rota descoberta não tem fonte;
- modelo IA não tem fonte;
- coleção MongoDB não tem fonte;
- ação UI não tem fonte;
- runtime não tem SHA-256;
- `wrangler.toml` não aponta para `src/entry.js`;
- bindings de IA/Durable Objects esperados não existem;
- guard de resultado mecânico online desaparece.

---

## 5. GATE DE DRIFT

Qualquer alteração em:

- `app.js`;
- `index.html`;
- `src/**`;
- `data/**`;
- `r41-*.js`;
- `cloudflare/**`;
- scripts PowerShell/configuração;

deve regerar o inventário.

Os hashes em `docs/generated/06-SCRIPTS.md` e `TECHNICAL-INVENTORY.json` permitem saber exatamente qual fonte foi documentada.

---

## 6. TESTES E2E OBRIGATÓRIOS POR DOMÍNIO

### AUTENTICAÇÃO

- criar conta;
- login;
- `/auth/me`;
- logout/revogação;
- token inválido/expirado;
- recuperação, se implementada.

### SAVE

- criar slot;
- salvar;
- carregar;
- sobrescrever/revisão;
- reload de navegador;
- isolamento entre contas.

### COMBATE

- ataque válido;
- ação inválida;
- custo;
- defesa/reação;
- dano;
- cura;
- condição;
- KO/morte;
- Save Point;
- não-invenção pela IA.

### MAPA/MOVIMENTO

- origem;
- destino válido;
- destino bloqueado;
- tempo;
- gatilho;
- persistência da localização;
- reload.

### TREINO

- pré-requisito;
- duração;
- custo;
- rolagem;
- progresso;
- desbloqueio;
- persistência.

### MISSÃO

- iniciar;
- objetivo;
- falha;
- sucesso;
- recompensa autoritativa;
- consequência de mundo;
- reload.

### DESCANSO/HOSPITAL

- recuperação permitida;
- recurso/ferimento não autorizado não recupera;
- tempo avança;
- tratamento altera condição correta;
- reload.

### ONLINE

- criar sala;
- entrar;
- membership;
- heartbeat;
- mensagem;
- estado;
- ação/intenção;
- resultado mecânico forjado rejeitado;
- usuário sem membership rejeitado;
- reconexão.

### IA

- modelo/provider;
- fatos confirmados;
- intenção sem resultado;
- tentativa de induzir dano/recompensa inventados;
- fallback quando binding indisponível.

### ASSETS

- referência literal existe;
- arquivo HTTP 200 no site publicado;
- imagem semanticamente correta;
- transformação/estágio utiliza arte correta quando exigido.

---

## 7. COBERTURA DE FUNÇÕES

A lista em `docs/generated/01-FUNCTIONS.md` serve como checklist total de funções detectadas.

Para transformar uma função de `STATICALLY_TRACED` em `PASS_RUNTIME`, é necessário ao menos um teste que:

1. alcance a função por fluxo real ou teste unitário;
2. use entrada conhecida;
3. confirme saída/efeito;
4. confirme falha esperada quando aplicável.

Funções utilitárias puras podem usar teste unitário. Funções de UI/API/persistência devem ter integração ou E2E quando o efeito depende de ambiente.

---

## 8. COBERTURA DE IA

Todo identificador `@cf/...` literal é inventariado.

A documentação manual determina qual é efetivo usando o entrypoint configurado. Se outro modelo for adicionado, o inventário o detectará, mas o papel só pode ser declarado quando o fluxo real provar onde ele é usado.

---

## 9. COBERTURA DE PERSISTÊNCIA

Toda ocorrência literal `.collection("...")` e toda chave literal `localStorage/sessionStorage` encontrada entra no inventário.

Gaps possíveis que exigem revisão manual:

- nome de coleção construído dinamicamente;
- storage acessado por wrapper;
- campo montado dinamicamente;
- dependência externa que persiste sem string literal no repositório.

Esses casos devem ser documentados pelo wrapper/função que os constrói.

---

## 10. COBERTURA DE UI

O gerador cobre automaticamente:

- `data-action`;
- `data-go`;
- `addEventListener` com nome literal.

Delegações totalmente dinâmicas devem ser associadas manualmente ao dispatcher correspondente.

---

## 11. COBERTURA DE MOVIMENTO

O gerador cria um índice amplo de linhas com vocabulário de movimento/mapa/localização/posição/alcance.

Esse índice é deliberadamente inclusivo. A revisão semântica deve separar:

- regra mecânica real;
- texto/descrição;
- asset/mapa visual;
- variável de localização;
- função de movimentação;
- requisito/alcance.

---

## 12. MATRIZ MANUAL DE REQUISITOS PRINCIPAIS

| ID | Requisito | Evidência mínima | Estado inicial |
|---|---|---|---|
| REQ-AGENCY-001 | IA não decide ação do jogador | prompt + fluxo UI + teste | UNVERIFIED E2E |
| REQ-TERION-001 | TERION resolve mecânica | funções de regra + guard + teste | PARCIAL/UNVERIFIED integral |
| REQ-AI-001 | modelo efetivo documentado | wrangler + entry.js | STATICALLY_VERIFIED |
| REQ-AI-002 | IA não inventa resultado | prompt + testes adversariais | UNVERIFIED runtime |
| REQ-SAVE-001 | autosave persiste estado | função+API+DB+reload | UNVERIFIED E2E |
| REQ-ONLINE-001 | membership protege sala | entry.js + Mongo | STATICALLY_VERIFIED |
| REQ-ONLINE-002 | cliente não envia resultado | guard + smoke | STATICALLY_VERIFIED / runtime pendente |
| REQ-WORLD-001 | world tick integrado | mapping + backend + teste | STATICALLY_VERIFIED / E2E pendente |
| REQ-MOVE-001 | posição realmente muda/persiste | código + reload | UNVERIFIED E2E |
| REQ-TRAIN-001 | treino altera progresso real | código + save | UNVERIFIED E2E |
| REQ-MISSION-001 | missão altera objetivos/recompensa | script + state + save | UNVERIFIED E2E |
| REQ-COMBAT-001 | combate resolve TERION | pipeline completo | UNVERIFIED integral |
| REQ-REST-001 | descanso não cura indevidamente | regra + teste | UNVERIFIED E2E |
| REQ-HOSPITAL-001 | lesão tratada como estado | regra + save | UNVERIFIED E2E |
| REQ-ASSET-001 | refs literais existem | auditoria assets | gate separado |
| REQ-VISUAL-001 | arte corresponde ao estado | manifest + inspeção visual | UNVERIFIED integral |

Esta tabela não mascara lacunas: ela explicita o que ainda precisa de execução.

---

## 13. GATE HISTÓRICO 896/896

A auditoria existente registra que não existe evidência literal suficiente para declarar `896/896` como provado. Portanto:

```text
896/896 = UNVERIFIED
```

até que seja fornecida uma lista literal ou evidência equivalente que possa ser comparada automaticamente.

---

## 14. DEFINIÇÃO DE CONCLUSÃO

A documentação pode ser chamada de **integralmente rastreada estaticamente** quando `DOCUMENTATION-AUDIT.json` retornar:

```text
status = PASS_STATIC_COVERAGE
failures = []
```

O **jogo** só pode ser chamado de integralmente validado quando os gates runtime/E2E relevantes também estiverem em PASS.
