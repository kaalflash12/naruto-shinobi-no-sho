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
| sourceFiles | 56 |
| gameRuntimeSourceFiles | 51 |
| toolingSourceFiles | 5 |
| functions | 926 |
| gameRuntimeFunctions | 881 |
| toolingFunctions | 45 |
| routes | 31 |
| models | 2 |
| collections | 11 |
| storage | 10 |
| uiActions | 217 |
| events | 9 |
| movementEvidence | 7824 |
| scripts | 30 |
| runtimeFiles | 53 |
| uniqueAssetReferences | 5445 |
| missingLiteralAssetReferences | 70 |

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

- 70 referencias literais de assets nao materializadas; ver docs/generated/10-ASSET-REFERENCES.md e auditoria especifica de assets
