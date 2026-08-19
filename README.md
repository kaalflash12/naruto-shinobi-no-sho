# NARUTO SHINOBI NO SHO

Este repositório pertence exclusivamente ao jogo **NARUTO SHINOBI NO SHO**.

- Nome do projeto: **NARUTO SHINOBI NO SHO**
- Versão técnica interna atual: **R41**
- Repositório separado do Naruto Unison

**NARUTO SHINOBI NO SHO NÃO É NARUTO UNISON.**

## Documentação técnica obrigatória

A documentação não depende de listas escritas à mão: um gerador percorre o código e cria inventários rastreáveis por arquivo/linha e SHA-256.

1. [`docs/00-ESPECIFICACAO-MESTRA.md`](docs/00-ESPECIFICACAO-MESTRA.md) — arquitetura, precedência, modelo de função, script, ação, movimento, combate, IA e critérios de PASS.
2. [`docs/01-IA-TERION-E-AUTORIDADE.md`](docs/01-IA-TERION-E-AUTORIDADE.md) — modelo real de IA, prompt, TERION e fronteira de autoridade.
3. [`docs/02-ARQUITETURA-API-PERSISTENCIA-ONLINE.md`](docs/02-ARQUITETURA-API-PERSISTENCIA-ONLINE.md) — Worker, MongoDB, Durable Objects, autenticação, saves, salas e online.
4. [`docs/03-JOGABILIDADE-ACOES-MOVIMENTO-INTERACOES.md`](docs/03-JOGABILIDADE-ACOES-MOVIMENTO-INTERACOES.md) — mapa, movimento, missões, treino, combate, recursos, descanso, hospital, progressão, itens, transformações, NPCs e mundo vivo.
5. [`docs/04-RASTREABILIDADE-E-VALIDACAO.md`](docs/04-RASTREABILIDADE-E-VALIDACAO.md) — matriz de requisitos, gates e distinção entre cobertura estática e teste real.
6. `docs/generated/` — inventário automático de **funções, métodos, rotas, modelos IA, MongoDB/storage, ações UI, eventos, scripts, movimento e matriz de rastreabilidade**.

### Gerar e auditar

```bash
node tools/generate-technical-spec.mjs
node tools/audit-documentation-coverage.mjs
```

`PASS_STATIC_COVERAGE` significa que os elementos descobertos no código foram rastreados e documentados. Não é usado como substituto de `PASS_RUNTIME` ou `PASS_E2E`.
