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
| sourceFiles | 60 |
| gameRuntimeSourceFiles | 51 |
| toolingSourceFiles | 9 |
| functions | 946 |
| gameRuntimeFunctions | 881 |
| toolingFunctions | 65 |
| routes | 31 |
| models | 2 |
| collections | 11 |
| storage | 10 |
| uiActions | 217 |
| events | 9 |
| movementEvidence | 7824 |
| scripts | 30 |
| runtimeFiles | 57 |
| uniqueAssetReferences | 5442 |
| missingLiteralAssetReferences | 67 |

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
- **assetPathCompleteness:** FAIL_OR_EXTERNAL_OVERLAY_REQUIRED

## Avisos

- 67 referencias literais de assets nao materializadas; ver docs/generated/10-ASSET-REFERENCES.md e auditoria especifica de assets
