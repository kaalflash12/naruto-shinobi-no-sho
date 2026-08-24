# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO

Status: **PASS_STATIC_COVERAGE**

Funções: `all-source-except-docs`. Semântica de jogo: `game-runtime-only`. `docs/`, `tools/` e `.github/` não podem criar IA/rotas/DB/UI/movimento fictícios.

Worker entry selecionado: `cloudflare/r41-api/src/entry-authoritative.js`.

`PASS_STATIC_COVERAGE` não equivale a teste vivo.

## Modelos de IA detectados no runtime

- `@cf/meta/llama-3.2-1b-instruct`
- `@cf/zai-org/glm-4.7-flash`

## Cobertura

| Categoria | Total |
|---|---:|
| sourceFiles | 106 |
| gameRuntimeSourceFiles | 66 |
| toolingSourceFiles | 40 |
| functions | 1184 |
| gameRuntimeFunctions | 1067 |
| toolingFunctions | 117 |
| routes | 33 |
| models | 2 |
| collections | 12 |
| storage | 17 |
| uiActions | 223 |
| events | 12 |
| movementEvidence | 7874 |
| scripts | 38 |
| runtimeFiles | 92 |
| uniqueAssetReferences | 5442 |
| missingLiteralAssetReferences | 0 |

## Gates

- **staticInventory:** PASS
- **documentationExcludedFromDiscovery:** PASS
- **toolingExcludedFromGameSemantics:** PASS
- **runtimeExecution:** UNVERIFIED
- **browserInteraction:** UNVERIFIED
- **workersLive:** UNVERIFIED
- **mongodbLive:** UNVERIFIED
- **gameplayE2E:** UNVERIFIED
- **semanticCompleteness:** REQUIRES_TRACEABLE_EVIDENCE
- **assetPathCompleteness:** PASS
