# NARUTO SHINOBI NO SHO — ESPECIFICAÇÃO TÉCNICA MESTRA

**Projeto:** NARUTO SHINOBI NO SHO  
**Versão técnica atual:** R41  
**Repositório:** `kaalflash12/naruto-shinobi-no-sho`  
**Autoridade mecânica:** TERION 2D10  
**Regra documental:** nenhuma ausência de evidência pode ser convertida em comportamento inventado.

---

## 1. OBJETIVO DESTA DOCUMENTAÇÃO

Este conjunto de documentos existe para responder, de forma rastreável, às perguntas:

1. Que arquivos executam o jogo?
2. Em que ordem eles carregam?
3. Que funções e métodos existem?
4. Que ação/interação chama cada parte do sistema?
5. Que rotas de API existem e quem as usa?
6. Que dados são persistidos, onde e por quê?
7. Que IA é usada, qual modelo real, que contexto recebe e o que pode ou não decidir?
8. Onde TERION resolve a mecânica e onde a IA apenas narra?
9. Como online, salas, mensagens, ações, presença e mundo persistente funcionam?
10. Que evidência existe para movimento, mapa, treinamento, missão, combate, descanso, hospital, evolução, itens, transformações, dōjutsu e demais sistemas?
11. Qual é o estado de validação de cada elemento?

A documentação manual é complementada por `tools/generate-technical-spec.mjs`, que percorre o repositório e gera inventários em `docs/generated/`. Isso é obrigatório porque `app.js` é grande e uma lista manual pode ficar desatualizada.

---

## 2. FONTES DE VERDADE E PRECEDÊNCIA

Quando duas fontes divergem, usar esta ordem:

1. **Código executável do `main` atual**.
2. **`index.html`**, para ordem real de carregamento do frontend.
3. **`cloudflare/r41-api/wrangler.toml`**, para entrypoint e bindings reais do Worker.
4. **`cloudflare/r41-api/src/entry.js`**, porque é o entrypoint configurado do backend.
5. **`cloudflare/r41-api/src/index.js`**, backend-base importado pelo entrypoint.
6. **`app.js`**, runtime principal do jogo.
7. **`src/r41-canonical-repair.js` e `src/r41-final-ui-repair.js`**, reparos carregados sobre o core conforme a ordem do HTML.
8. **arquivos `data/*.js`**, conteúdo, configuração, missões, mundo e manifests.
9. **documentação manual**.
10. **documentação gerada**, para localização e rastreabilidade estática.

Documentação nunca pode sobrepor comportamento diferente existente no código. Se a documentação e o runtime divergem, a divergência deve ser registrada como `FAIL_DOC_DRIFT` até correção.

---

## 3. ARQUITETURA EXECUTÁVEL

### 3.1 Frontend

O frontend é estático e carrega a partir de `index.html`. O HTML declara explicitamente os módulos de dados, os reparos R41, configuração de API, adaptador de `fetch`, `app.js` e o reparo final de UI.

A ordem exata não deve ser copiada manualmente para outro documento: ela é gerada em `docs/generated/06-SCRIPTS.md` diretamente das tags `<script>` do `index.html`.

### 3.2 Backend

O backend final é Cloudflare Workers.

`cloudflare/r41-api/wrangler.toml` define:

- `main = "src/entry.js"`;
- `nodejs_compat`;
- binding de Workers AI chamado `AI`;
- Durable Object `GAME_ROOMS` usando a classe `GameRoom`;
- storage SQLite para o Durable Object;
- banco lógico MongoDB `naruto_shinobi_r41`.

### 3.3 Persistência

Há duas camadas principais:

- **MongoDB Atlas:** contas, sessões, saves, amizades, registro de salas, estado/eventos do mundo, auditoria, códigos de recuperação e coleções adicionais encontradas estaticamente.
- **Durable Objects:** estado vivo de cada sala online: membros, presença, mensagens e intents/ações recentes.

A lista literal de coleções e chaves de `localStorage/sessionStorage` é gerada em `docs/generated/04-PERSISTENCE.md`.

### 3.4 IA

O entrypoint efetivo é `src/entry.js`. Nesse arquivo a constante `AI_MODEL` define `@cf/zai-org/glm-4.7-flash`, e `/api/ai` é interceptado antes do encaminhamento ao worker-base. Portanto, **o modelo efetivo da rota pública `/api/ai` no entrypoint atual é `@cf/zai-org/glm-4.7-flash`**.

O worker-base `src/index.js` ainda contém uma implementação anterior de `aiRoute` com `@cf/meta/llama-3.2-1b-instruct`. Como `wrangler.toml` aponta para `entry.js` e `entry.js` trata `/api/ai` antes de delegar ao worker-base, essa implementação deve ser tratada como **fallback/legado interno**, não como modelo público principal, salvo mudança do entrypoint.

Qualquer outro identificador `@cf/...` encontrado no repositório aparece automaticamente em `docs/generated/03-AI.md`.

---

## 4. REGRA FUNDAMENTAL: IA NÃO RESOLVE MECÂNICA

TERION 2D10 é a autoridade mecânica.

O contrato de IA do entrypoint estabelece:

- a IA recebe fatos confirmados;
- a IA pode narrar consequências desses fatos;
- a IA pode propor ações possíveis;
- a IA não pode inventar sucesso;
- a IA não pode inventar dano;
- a IA não pode inventar recompensa;
- a IA não pode inventar técnica desbloqueada;
- a IA não pode inventar morte;
- a IA não pode inventar cura;
- a IA não pode inventar relação;
- a IA não pode inventar alteração de mundo sem fato confirmado.

A fronteira online segue a mesma regra: o cliente envia **intenção**, não resultado mecânico. O entrypoint rejeita envelopes que tentem declarar dano, PV, chakra, XP, nível, recompensa, sucesso, rolagem, crítico, morte, cura, condições, recursos, estado, inventário, equipamento, desbloqueio, progresso, custo, cooldown e outros resultados autoritativos.

Erro canônico dessa fronteira: `CLIENT_MECHANICAL_RESULT_FORBIDDEN`.

---

## 5. CONTRATO DE UMA AÇÃO DE JOGO

Toda ação real deve poder ser rastreada neste formato:

```text
AÇÃO DO USUÁRIO/NPC
  ↓
pré-condições
  ↓
custo/recurso/tempo
  ↓
validação de regra TERION
  ↓
rolagem/resolução mecânica, quando aplicável
  ↓
resultado mecânico confirmado
  ↓
mutação de estado
  ↓
persistência / Save Point, quando aplicável
  ↓
World Tick / gatilhos, quando aplicável
  ↓
narração/feedback visual
```

Se um sistema pula uma etapa obrigatória, isso deve aparecer como falha de implementação, não como regra implícita.

### Campos obrigatórios de documentação de uma ação

Cada ação deve ter:

- ID documental;
- nome visível;
- gatilho de UI/API/IA;
- função ou método de entrada;
- arquivo e linha;
- pré-condições;
- ator;
- alvo;
- custo;
- duração/tempo;
- regra TERION utilizada;
- entradas mecânicas;
- saída mecânica;
- estado alterado;
- persistência;
- efeito no World Tick;
- feedback visual;
- tratamento de erro;
- teste associado;
- status.

A documentação gerada cobre automaticamente localização, funções, ações literais, rotas e evidências. Campos sem evidência permanecem `UNVERIFIED` até existir código/teste correspondente.

---

## 6. CONTRATO DE MOVIMENTO E MAPA

Todo movimento deve ser tratado como alteração de estado, não apenas animação de interface.

Modelo obrigatório:

```text
origem
+ destino solicitado
+ condição de acesso
+ distância/tempo, quando existir
+ custo, quando existir
+ risco/encontro/gatilho, quando existir
→ validação
→ alteração de localização
→ avanço de tempo/World Tick
→ persistência
→ atualização visual do mapa
```

`docs/generated/07-MOVEMENT-ACTIONS.md` lista todas as linhas do runtime em que aparecem evidências de movimento, localização, mapa, posição, alcance, distância, viagem ou deslocamento. Isso serve como índice para a regra real; o gerador não inventa distância ou custo que o código não contenha.

---

## 7. CONTRATO DE COMBATE

O pipeline de combate deve respeitar, no mínimo:

1. estado válido dos participantes;
2. iniciativa/ordem, se aplicável à cena;
3. seleção da ação;
4. validação de técnica/equipamento/condição;
5. custo;
6. alvo e alcance;
7. teste/rolagem TERION;
8. reação/defesa, quando permitida;
9. dano/cura/condição calculados pelo sistema mecânico;
10. aplicação no estado;
11. morte/KO/consequência somente após resolução;
12. log de combate;
13. Save Point quando o estado persistente muda;
14. atualização de mundo/gatilhos relevantes;
15. narração baseada no resultado já resolvido.

A IA não substitui os passos 3–11. Ela pode ajudar na apresentação ou escolha de NPC dentro dos limites de autoridade definidos.

---

## 8. ONLINE: AUTORIDADE E FLUXO

O entrypoint guarda associação de usuário a sala em `room_memberships`.

Fluxo mínimo:

```text
login válido
→ create/join
→ membership persistido
→ heartbeat atualiza lastSeen
→ room/message/messages/action/state exigem membership
→ action aceita intenção
→ resultado mecânico enviado pelo cliente é rejeitado
→ Durable Object mantém estado vivo da sala
→ MongoDB mantém registros persistentes necessários
```

O `GameRoom` mantém:

- identificação da sala;
- título/campanha/modo;
- proprietário;
- membros;
- `joinedAt` e `lastSeen`;
- mensagens limitadas;
- ações/intents limitados;
- timestamps de criação/atualização.

A lista completa das rotas encontradas é gerada em `docs/generated/02-API.md`.

---

## 9. SAVE, AUTOSAVE E SAVE POINT

Salvar não é apenas serializar interface. Uma alteração persistente deve identificar:

- que objeto de jogo mudou;
- que jogador/personagem/campanha é dono do estado;
- slot, quando aplicável;
- revisão/versão;
- timestamp;
- limite de tamanho;
- conflito de revisão, se implementado;
- resposta de erro.

As funções e rotas exatas que realizam isso são listadas no inventário gerado. O backend-base possui coleção `saves` e índice único por `userId + slotId`, além de índice por `data.playerId`.

---

## 10. MODELO DE CADA FUNÇÃO

`docs/generated/01-FUNCTIONS.md` é a lista canônica de funções/métodos descobertos.

Cada entrada registra:

- ID `FUNC-xxxxx`;
- nome real;
- arquivo e linha;
- forma de declaração;
- parâmetros;
- chamadas internas detectadas;
- rotas referidas;
- coleções MongoDB referidas;
- modelos IA referidos;
- IDs de DOM;
- chaves de storage;
- variáveis de ambiente;
- ações de UI literais.

**Importante:** quando o código não permite provar uma finalidade, a documentação não cria uma. A fonte indicada continua sendo a autoridade.

---

## 11. MODELO DE CADA SCRIPT

`docs/generated/06-SCRIPTS.md` registra:

- ordem real no `index.html`;
- caminho;
- confirmação de existência;
- linha da tag;
- todos os arquivos de runtime/configuração encontrados;
- tamanho e SHA-256 de cada arquivo.

Isso permite verificar exatamente que versão de um script foi documentada.

---

## 12. MODELO DE CADA INTERAÇÃO DE UI

Uma interação deve ser rastreável como:

```text
elemento / data-action / data-go
→ listener/delegação
→ função
→ validação
→ alteração local OU chamada API
→ resposta
→ alteração de estado
→ renderização
```

`docs/generated/05-UI-INTERACTIONS.md` inventaria `data-action`, `data-go` e eventos registrados por `addEventListener`.

A presença de uma ação na interface não prova que ela funciona. Funcionamento exige teste vivo e deve ter status distinto.

---

## 13. MODELO DE PERSISTÊNCIA

Para cada coleção/chave, a documentação deve responder:

- quem escreve;
- quem lê;
- chave de identidade;
- índice/constraint;
- TTL, se existir;
- estrutura mínima observável;
- dado sensível ou não;
- ciclo de vida;
- limpeza/revogação;
- teste.

A lista literal é gerada em `docs/generated/04-PERSISTENCE.md`.

---

## 14. MODELO DE IA

Toda IA/modo de IA deve ser documentado com:

- ID;
- modelo real;
- entrypoint;
- rota;
- prompt de sistema;
- dados de entrada;
- fatos disponíveis;
- autoridade permitida;
- autoridade proibida;
- saída;
- fallback;
- persistência da saída, se houver;
- teste de conexão;
- teste de não-invenção mecânica.

O modelo principal atual está documentado em `docs/01-IA-TERION-E-AUTORIDADE.md`.

---

## 15. STATUS: PASS, FAIL E UNVERIFIED

São permitidos somente estes significados:

- `PASS_STATIC_COVERAGE`: localizado no código e registrado no inventário.
- `PASS_RUNTIME`: executado com resultado esperado.
- `PASS_E2E`: fluxo completo UI → backend → persistência → UI validado.
- `FAIL`: evidência de comportamento incorreto.
- `UNVERIFIED`: não há prova suficiente.
- `NOT_APPLICABLE`: comprovadamente não se aplica.

É proibido tratar `PASS_STATIC_COVERAGE` como prova de gameplay funcional.

---

## 16. GATES QUE NÃO PODEM SER FALSIFICADOS

A auditoria histórica já registra dois limites importantes:

1. `896/896` não possui lista literal/evidência equivalente suficiente e permanece `UNVERIFIED`.
2. a migração de **toda** a resolução TERION para o servidor não pode ser declarada concluída sem teste específico.

Esses limites permanecem até existir prova nova.

---

## 17. COMO REGERAR E AUDITAR

```bash
node tools/generate-technical-spec.mjs
node tools/audit-documentation-coverage.mjs
```

O primeiro comando gera o inventário completo em `docs/generated/`.

O segundo verifica:

- que todos os scripts carregados pelo HTML existem;
- que todas as funções descobertas têm ID, arquivo, linha e nome;
- que todas as rotas têm fonte;
- que todos os modelos IA têm fonte;
- que todas as coleções têm fonte;
- que ações UI têm fonte;
- que arquivos de runtime têm SHA-256;
- que `wrangler.toml` aponta para `src/entry.js`;
- que os bindings de IA e Durable Object existem;
- que o guard contra resultado mecânico do cliente existe.

A auditoria gera `docs/generated/DOCUMENTATION-AUDIT.json` e `docs/generated/09-DOCUMENTATION-AUDIT.md`.

---

## 18. DEFINIÇÃO DE “TUDO DOCUMENTADO”

Para este projeto, “tudo documentado” significa:

1. todos os arquivos de runtime inventariados por hash;
2. todas as funções/métodos detectáveis inventariados;
3. todas as rotas literais inventariadas;
4. todos os modelos IA literais inventariados;
5. todas as coleções MongoDB literais inventariadas;
6. todas as chaves local/session storage detectáveis inventariadas;
7. todas as ações literais de UI inventariadas;
8. todos os listeners detectáveis inventariados;
9. ordem real de scripts inventariada;
10. evidências de movimento/mapa indexadas;
11. cada item ligado à fonte por arquivo/linha;
12. gaps sem prova marcados `UNVERIFIED`, nunca preenchidos por suposição;
13. testes vivos mantidos separados da cobertura estática.

Esse é o padrão obrigatório da R41 em diante.
