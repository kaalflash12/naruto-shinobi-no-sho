# AUDITORIA DE COBERTURA DA DOCUMENTAÇÃO

Status: **PASS_STATIC_COVERAGE**

Funções: `all-source-except-docs`. Semântica de jogo: `game-runtime-only`. `docs/`, `tools/` e `.github/` não podem criar IA/rotas/DB/UI/movimento fictícios.

`PASS_STATIC_COVERAGE` não equivale a teste vivo.

## Modelos de IA detectados no runtime

- `@cf/meta/llama-3.2-1b-instruct`
- `@cf/zai-org/glm-4.7-flash`

## Cobertura

| Categoria | Total |
|---|---:|
| sourceFiles | 75 |
| gameRuntimeSourceFiles | 56 |
| toolingSourceFiles | 19 |
| functions | 1007 |
| gameRuntimeFunctions | 919 |
| toolingFunctions | 88 |
| routes | 31 |
| models | 2 |
| collections | 11 |
| storage | 11 |
| uiActions | 217 |
| events | 9 |
| movementEvidence | 7832 |
| scripts | 31 |
| runtimeFiles | 69 |
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
