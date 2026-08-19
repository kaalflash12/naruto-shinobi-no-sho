# JOGABILIDADE, AÇÕES, MOVIMENTO E INTERAÇÕES

Este documento define **como cada categoria de gameplay deve ser especificada e validada**. Quando o runtime fornece evidência, o inventário gerado aponta arquivo/linha. Quando não fornece, o item permanece `UNVERIFIED`; não se cria regra por suposição.

---

## 1. REGRA DE AGÊNCIA DO JOGADOR

A narração não pode executar uma escolha relevante pelo jogador sem uma regra explícita que autorize automação.

### Fluxo correto

```text
situação apresentada
→ opções possíveis / ação livre
→ jogador escolhe intenção
→ sistema valida
→ TERION resolve se necessário
→ estado muda
→ narrador descreve o que ocorreu
```

### Fluxo incorreto

```text
situação apresentada
→ narrador escolhe pelo jogador
→ narrador declara sucesso/dano/recompensa
→ estado tenta acompanhar a narrativa
```

### Evidência necessária para PASS

- função de submissão da ação;
- função de validação;
- resolução mecânica;
- mutação de estado;
- renderização posterior;
- teste demonstrando que a IA não substitui a escolha do jogador.

---

## 2. MODELO UNIVERSAL DE AÇÃO

Toda ação documentável deve possuir:

```text
ActionID
nome
ator
origem do comando
intenção
pré-condições
alvo
alcance
custo
recurso
tempo
teste TERION
CD/oposição
resultado possível
mutação de estado
condição aplicada/removida
persistência
world tick
gatilhos
feedback UI
feedback narrativo
falhas/códigos de erro
função/arquivo/linha
teste
status
```

Se algum campo não se aplica, marcar `NOT_APPLICABLE`. Se deveria existir mas não há prova, marcar `UNVERIFIED`.

---

## 3. MOVIMENTO

### 3.1 Movimento local

Modelo:

```text
posição atual
+ destino
+ bloqueios/colisão, se implementados
+ alcance/velocidade, se implementados
→ posição nova
→ atualização visual
```

### 3.2 Viagem entre locais

Modelo:

```text
local atual
+ destino conhecido
+ requisito de acesso
+ tempo de viagem
+ custo/risco, quando existir
→ avanço temporal
→ gatilhos/encontros
→ mudança de localização
→ Save Point
→ renderização do novo local
```

### 3.3 Regra de documentação

Toda linha contendo evidência de `move`, `movement`, `travel`, `location`, `position`, `map`, `route`, `distance`, `range`, `alcance`, `deslocamento`, `mover`, `viajar` ou equivalentes é indexada em `docs/generated/07-MOVEMENT-ACTIONS.md`.

Isso é índice de evidência, não prova de que cada movimento funciona.

---

## 4. MAPA

Um mapa funcional precisa separar:

1. **representação visual**;
2. **localização lógica**;
3. **pontos de interesse**;
4. **requisitos de acesso**;
5. **ações disponíveis por local**;
6. **missões/gatilhos presentes**;
7. **tempo de deslocamento**;
8. **encontros/eventos**;
9. **persistência da posição**.

### Gate MAP-E2E

```text
abrir mapa
→ selecionar destino permitido
→ mover/viajar
→ posição lógica muda
→ tempo muda se aplicável
→ evento dispara se aplicável
→ save persiste
→ recarregar página
→ personagem permanece no destino correto
```

Sem essa sequência validada, mapa visual não equivale a mapa funcional.

---

## 5. MISSÕES

Toda missão deve ter estrutura rastreável:

```text
missionId
título
tipo
pré-condições
local de início
NPC/objeto iniciador
objetivos
estado de cada objetivo
falhas
recompensas definidas pelo sistema
consequências de mundo
gatilhos
script associado
Save Points
estado final
```

### Tipos de objetivo

O código/conteúdo pode suportar diferentes tipos; a documentação não pressupõe quais estão implementados. O inventário deve localizar os scripts reais de missão, em especial `data/r33-mission-scripts.js` e qualquer outro arquivo que o runtime carregar.

### Regra de recompensa

IA não concede recompensa. Recompensa só existe se a regra/missão resolver e persistir o resultado.

---

## 6. TREINO

Um treino funcional deve registrar:

```text
tipo de treino
local
mentor, quando aplicável
duração
custo
atributo/perícia/técnica alvo
pré-requisitos
teste TERION
progresso concedido por regra
falha/consequência
cooldown/limite, quando existir
mudança de tempo
Save Point
desbloqueios válidos
```

Treino não pode ser somente texto ou botão de “continuar”.

### Gate TRAIN-E2E

```text
estado inicial registrado
→ iniciar treino
→ tempo/custo aplicados
→ teste resolvido
→ progresso alterado apenas conforme regra
→ save
→ reload
→ progresso permanece
```

---

## 7. COMBATE

### 7.1 Entrada

- participantes válidos;
- PV/recursos/condições atuais;
- local/cena;
- iniciativa/ordem quando aplicável;
- ações disponíveis derivadas da ficha real.

### 7.2 Ação ofensiva

```text
escolher técnica/ataque
→ validar posse/desbloqueio
→ validar custo
→ validar alvo/alcance
→ pagar/reservar custo conforme regra
→ rolar TERION
→ oferecer defesa/reação quando cabível
→ calcular resultado
→ aplicar dano/condições
→ log
→ Save Point
```

### 7.3 Defesa

A documentação deve distinguir claramente mecanismos diferentes, por exemplo esquiva, bloqueio, cobertura e reação por técnica, **somente conforme o conjunto de regras TERION efetivamente carregado pelo jogo**.

Não copiar fórmulas históricas contraditórias para este documento. A fórmula efetiva deve ser ligada à função/regra atualmente usada no runtime e testada.

### 7.4 Fim de combate

- KO/morte somente por regra;
- loot/recompensa somente pelo sistema;
- consequências persistentes;
- missão/mundo atualizados;
- Save Point.

---

## 8. JUTSUS/TÉCNICAS

Cada técnica precisa de contrato operacional:

```text
id
nome
rank/tier
categoria
custo
recurso
alvo
alcance
duração
requisitos
cooldown
rolagem/teste
CD/oposição
efeito mecânico
contramedida
condições
arte semântica
estado de desbloqueio
```

A disponibilidade em combate deve vir da ficha/save e das regras, não de “mostrar todos os jutsus”.

A arte exibida deve representar a técnica/personagem/estado correspondente. `data/r41-user-visuals.js` e outros manifests visuais carregados antes do runtime são parte da resolução visual; a auditoria de assets continua sendo gate separado.

---

## 9. CHAKRA E RECURSOS

Todo recurso deve definir:

- atual;
- máximo;
- fonte;
- gasto;
- recuperação;
- limites;
- interação com descanso;
- persistência;
- apresentação na HUD.

Reservas especiais não podem ser duplicadas por sistemas que não tenham regra explícita para isso.

O inventário de funções deve ser usado para localizar qualquer função que muta `chakra`, `resource`, `resources`, `stamina`, `PV/HP` ou campos equivalentes.

---

## 10. KURAI E RECURSOS ESPECIAIS

Kurai precisa existir simultaneamente em três níveis:

1. regra mecânica;
2. estado persistente;
3. visualização na HUD/ficha.

Se estiver apenas na narração ou apenas em uma variável não renderizada, o sistema está incompleto.

A documentação específica deve apontar todas as funções e campos encontrados pelo inventário para Kurai e marcar os fluxos sem teste como `UNVERIFIED`.

---

## 11. CLONES / ENTIDADES CONTROLADAS

Modelo operacional:

```text
criação
→ custo
→ limite
→ stats derivados
→ recursos permitidos
→ duração
→ ações próprias
→ dano/remoção
→ sincronização com combate
→ persistência quando aplicável
```

Clones não devem duplicar recursos especiais se a regra não permitir.

---

## 12. DESCANSO

Descanso precisa distinguir:

- curto/longo ou qualquer categoria realmente implementada;
- duração no mundo;
- recuperação autorizada;
- recursos não recuperados;
- ferimentos persistentes;
- interrupção;
- consequência temporal;
- limite/anti-spam quando aplicável.

### Regra crítica

Subir de nível ou apertar descansar não pode curar automaticamente braço/ferimento/PV/chakra se a regra correspondente não autorizar.

### Gate REST-E2E

Registrar estado antes/depois, tempo transcorrido e reload do save.

---

## 13. HOSPITAL / TRATAMENTO

Um hospital clínico precisa tratar ferimento como estado, não como texto.

Modelo:

```text
lesão/condição
+ severidade
+ diagnóstico
+ tratamento disponível
+ custo
+ duração
+ teste, quando houver
→ resultado clínico
→ alteração de condição
→ tempo
→ persistência
```

Cura narrativa sem mutação mecânica correspondente não é tratamento funcional.

---

## 14. PROGRESSÃO / NÍVEL / XP

Somente o sistema autoritativo concede:

- XP;
- nível;
- perícias/atributos;
- técnicas;
- itens;
- recompensas;
- marcos.

O online já rejeita resultados mecânicos enviados pelo cliente. O mesmo princípio deve valer para qualquer caminho local/narrativo.

### Gate PROGRESSION

```text
fonte válida de progresso
→ regra calcula concessão
→ estado muda
→ save
→ reload
→ nenhuma cura/recurso não autorizada aparece por efeito colateral
```

---

## 15. EQUIPAMENTOS E ITENS

Cada item/equipamento deve declarar:

```text
id
tipo
slot
requisitos
efeito
cargas/durabilidade
consumo
arte
estado equipado
persistência
```

Itens com cargas precisam reduzir carga na utilização quando essa é a regra.

Equipamento visual deve alterar a camada/arte correspondente quando esse comportamento estiver implementado e documentado.

---

## 16. TRANSFORMAÇÕES / DŌJUTSU / ESTÁGIOS VISUAIS

Cada transformação/estágio precisa separar:

- pré-requisito;
- desbloqueio;
- ativação;
- custo;
- bônus/efeitos;
- duração;
- término;
- cooldown/limite;
- arte específica;
- impacto na ficha;
- impacto no combate;
- persistência.

Arte diferente sem estado mecânico = efeito cosmético.  
Estado mecânico sem arte quando a interface exige representação = integração visual incompleta.

---

## 17. NPCS / MENTORES

Cada NPC relevante precisa de:

```text
npcId
nome
local/agenda
estado vivo/ativo
papel
relação
conhecimento
serviços
técnicas ensináveis
pré-requisitos
recusas
gatilhos
reação a mundo/missão
```

IA narrativa não deve substituir dados permanentes de relação/agenda sem que o estado seja efetivamente alterado e persistido.

---

## 18. MUNDO VIVO / WORLD TICK

Toda passagem relevante de tempo deve poder alimentar o sistema de mundo.

Modelo:

```text
delta temporal
+ campanha
+ contexto
→ world_tick/world_event
→ regras/gatilhos
→ estado de mundo
→ eventos
→ Save Point quando necessário
```

O entrypoint possui mapeamento explícito de `/api/v84/world/tick` para `/api/v84/world/event`.

---

## 19. REPUTAÇÃO / RELAÇÕES / FACÇÕES

Quando existirem no estado atual, devem ser documentadas como dados mecânicos:

- identificador do NPC/facção;
- eixos de relação existentes no código;
- valor anterior;
- causa;
- delta;
- valor posterior;
- persistência;
- consequência/gatilho.

A IA pode narrar a reação; não pode inventar o delta.

---

## 20. MINIGAMES

Cada minigame funcional deve ter:

- ID;
- gatilho;
- regras;
- controles;
- estado inicial;
- objetivo;
- falha;
- resultado;
- integração com missão/treino/mapa;
- recompensa calculada pelo sistema;
- persistência quando necessária;
- teste.

Quantidade de minigames só pode ser afirmada a partir do inventário/código. Este documento não declara um número sem contagem literal.

---

## 21. INTERAÇÕES DE UI

`docs/generated/05-UI-INTERACTIONS.md` contém ações literais e eventos detectados.

Para cada uma, a validação semântica deve seguir:

```text
UI-ID
texto/ícone
seletor/data-action
listener
dispatch/função
efeito esperado
API, se houver
estado alterado
render subsequente
teste
status
```

Botão renderizado sem handler funcional = `FAIL`.  
Handler sem efeito observável esperado = `FAIL`.  
Sem teste = `UNVERIFIED`.

---

## 22. IMAGENS E ASSETS

A arte deve ser resolvida semanticamente:

```text
entidade/técnica/local/estado
→ ID semântico
→ manifest/resolvedor
→ arquivo real
→ preload/carregamento
→ renderização
```

Screenshots de UI de referência não devem ser usados como arte de jutsu/personagem salvo quando explicitamente mapeados como tal por decisão de design documentada.

A auditoria de assets verifica referências literais. Ausência bloqueante deve ser `FAIL`, não fallback silencioso que mascare erro.

---

## 23. TESTE DE INTERAÇÃO COMPLETA

Para cada recurso visível importante:

```text
1. abrir estado inicial conhecido
2. executar interação real
3. observar função/evento
4. observar request se houver
5. observar resposta
6. observar mutação
7. observar persistência
8. recarregar
9. confirmar estado final
```

Somente após isso usar `PASS_E2E`.

---

## 24. ONDE ENCONTRAR CADA COISA

- funções/métodos: `docs/generated/01-FUNCTIONS.md`;
- rotas: `docs/generated/02-API.md`;
- modelos de IA: `docs/generated/03-AI.md`;
- MongoDB/storage: `docs/generated/04-PERSISTENCE.md`;
- ações UI/eventos: `docs/generated/05-UI-INTERACTIONS.md`;
- scripts/ordem/hashes: `docs/generated/06-SCRIPTS.md`;
- movimento/mapa/localização: `docs/generated/07-MOVEMENT-ACTIONS.md`;
- matriz geral: `docs/generated/08-TRACEABILITY.md`;
- auditoria da cobertura: `docs/generated/09-DOCUMENTATION-AUDIT.md`.

Esse conjunto impede que um sistema fique “descrito apenas por alto”: cada afirmação deve terminar em fonte ou em `UNVERIFIED`.
