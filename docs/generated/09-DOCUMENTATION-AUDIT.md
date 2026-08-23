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
| sourceFiles | 88 |
| gameRuntimeSourceFiles | 61 |
| toolingSourceFiles | 27 |
| functions | 1073 |
| gameRuntimeFunctions | 965 |
| toolingFunctions | 108 |
| routes | 33 |
| models | 2 |
| collections | 11 |
| storage | 12 |
| uiActions | 221 |
| events | 11 |
| movementEvidence | 7840 |
| scripts | 33 |
| runtimeFiles | 78 |
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
