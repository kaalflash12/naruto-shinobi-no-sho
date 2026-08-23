# SCRIPTS E ORDEM DE CARREGAMENTO

Ordem real das tags script do index e inventário de fonte/tooling com SHA-256.

Gerado em: `2026-08-23T12:31:17.299Z`

| Ordem | Script | Existe | Linha |
|---:|---|---|---:|
| 1 | `data/catalogo.js` | SIM | 2 |
| 2 | `data/conteudo-livros.js` | SIM | 3 |
| 3 | `data/v5-content.js` | SIM | 4 |
| 4 | `data/v6-content.js` | SIM | 5 |
| 5 | `data/v7-content.js` | SIM | 6 |
| 6 | `data/v74-content.js` | SIM | 7 |
| 7 | `data/v75-content.js` | SIM | 8 |
| 8 | `data/v81-leon-content.js` | SIM | 9 |
| 9 | `data/v84-visual-manifest.js` | SIM | 10 |
| 10 | `data/v84-live-world.js` | SIM | 11 |
| 11 | `data/r27-canon-events.js` | SIM | 12 |
| 12 | `data/r27-downloaded-canon-portraits.js` | SIM | 13 |
| 13 | `data/v84-knowledge-catalog.js` | SIM | 14 |
| 14 | `data/r38-master-loader.js` | SIM | 15 |
| 15 | `data/v83-integrated-config.js` | SIM | 16 |
| 16 | `data/v84-integrated-config.js` | SIM | 17 |
| 17 | `data/r29-user-assets.js` | SIM | 18 |
| 18 | `data/r30-assets.js` | SIM | 19 |
| 19 | `data/r31-assets.js` | SIM | 20 |
| 20 | `data/r33-mission-scripts.js` | SIM | 21 |
| 21 | `data/r41-data-delta.js` | SIM | 22 |
| 22 | `data/r41-verified-visuals.js` | SIM | 23 |
| 23 | `data/r41-exact-visuals.js` | SIM | 24 |
| 24 | `data/r41-user-visuals.js` | SIM | 25 |
| 25 | `src/r41-core-bundle.js` | SIM | 26 |
| 26 | `src/r41-canonical-repair.js` | SIM | 27 |
| 27 | `r41-api-config.js` | SIM | 28 |
| 28 | `r41-github-api.js` | SIM | 29 |
| 29 | `app.js` | SIM | 30 |
| 30 | `src/r41-local-reset-fix.js` | SIM | 31 |
| 31 | `src/r41-final-ui-repair.js` | SIM | 32 |
| 32 | `r41-account-ui.js` | SIM | 33 |
| 33 | `r41-account-deeplink-fix.js` | SIM | 34 |

## Fonte/configuração/tooling

- `.github/workflows/account-live-e2e.yml` — domínio `tooling` — 5027 bytes — SHA-256 `dc5c86a4d3a60afbc57bdd38f14bb6a9960f57bfab79ce78860fb04b23aa82f8`
- `.github/workflows/browser-e2e.yml` — domínio `tooling` — 5598 bytes — SHA-256 `6fcfd06f457612eb37a32ebb43bd56fbb80ecc8dc49fbda1e28fcfd7dd37c9cb`
- `.github/workflows/browser-gameplay-e2e.yml` — domínio `tooling` — 6859 bytes — SHA-256 `6654ff587166e20f7b7d431e363608aa0adeb1b1bad1c32653966fb9388cde90`
- `.github/workflows/documentation-audit.yml` — domínio `tooling` — 4399 bytes — SHA-256 `8ba7569a5e0536a2bcf94e990726ab0372529b9267b9c93c6c5688e17decbec6`
- `.github/workflows/final-readiness.yml` — domínio `tooling` — 3097 bytes — SHA-256 `a36786ece900c13a39cd911603c8495430a0b03c8180ad6e48e28a62f4d15be0`
- `.github/workflows/live-backend-e2e.yml` — domínio `tooling` — 11425 bytes — SHA-256 `eafba4deef2fc9f55f7e14bd498513efcb2b6b0661f8bd28717a96793d07526c`
- `.github/workflows/one-shot-terion-authority.yml` — domínio `tooling` — 6191 bytes — SHA-256 `626915f9d67570722ef3c145112860549c95c98b8f12a33beefaf5eef9534eac`
- `.github/workflows/runtime-integrity.yml` — domínio `tooling` — 1964 bytes — SHA-256 `b38aac968497e5acfe430ae981942b6b1f32d4d6f65d6c2b8166161a62761ec4`
- `app.js` — domínio `game-runtime` — 1084160 bytes — SHA-256 `88bc3f11ff90d1c0fe792451c4b01c9c36e5e009ff1fdbedc9693179057b0c06`
- `audit/BROWSER-GAMEPLAY-E2E.json` — domínio `game-runtime` — 779 bytes — SHA-256 `7049d39628192cd8b30d38e76c18484ebb9f664f415ee2c38054bca3701679b7`
- `audit/BROWSER-SMOKE.json` — domínio `game-runtime` — 759 bytes — SHA-256 `55f94066be331af74d06b0db6cf58f5f08446ab07428236a2f8d28d36932406a`
- `cloudflare/oneclick-backend/package.json` — domínio `game-runtime` — 426 bytes — SHA-256 `ae3e5dca5b74eb230651e216aa1cab3577238669c2107bca42abef90805813e2`
- `cloudflare/oneclick-backend/src/index.js` — domínio `game-runtime` — 30353 bytes — SHA-256 `09fe58d5b5893e81768c29ecd74043bda80ff6ca28639c048fe81019eb664df2`
- `cloudflare/oneclick-backend/test/local-e2e.mjs` — domínio `game-runtime` — 4619 bytes — SHA-256 `26add25c775c9090492466118aa2650f6f004832f74a377603946a61bde51221`
- `cloudflare/r41-api/package.json` — domínio `game-runtime` — 449 bytes — SHA-256 `2a5320b2ba99a8f15d2f6d38b63ebfdef983ccbd88aab13542b8c96eb27d8d97`
- `cloudflare/r41-api/src/entry.js` — domínio `game-runtime` — 14173 bytes — SHA-256 `6eb0e3ce5e05445a593af9913a2c819dde387678b4b0eb2926a192eab00d7947`
- `cloudflare/r41-api/src/index.js` — domínio `game-runtime` — 27910 bytes — SHA-256 `a7e4d6a44085a96644bc43c20cc32e4b1ccc24b74c60965a851a776ad214e8c4`
- `cloudflare/r41-api/src/terion-mechanics.js` — domínio `game-runtime` — 4160 bytes — SHA-256 `d98c2decc0de416b3d737b90f74104ec5876721573ddf5e0ca0e90fc9d40d312`
- `cloudflare/r41-api/test/terion-mechanics.test.mjs` — domínio `game-runtime` — 1584 bytes — SHA-256 `4cd30d169a831c5bd73589c510cba6b8429aaf05eca218fbaefc7b2d7a59fed3`
- `cloudflare/r41-api/wrangler.toml` — domínio `game-runtime` — 424 bytes — SHA-256 `f84aee13b76b7ca83811a498cf844b8db08c2ac8242b2b1c05485153aba76c3f`
- `data/aliases/characters.json` — domínio `game-runtime` — 15079 bytes — SHA-256 `2e8aad5cf63738d192f96de4cbd2e9bdcb203814c0aa00ceba84db71e6f0c047`
- `data/aliases/items.json` — domínio `game-runtime` — 3 bytes — SHA-256 `ca3d163bab055381827226140568f3bef7eaac187cebd76878e0b63e9e442356`
- `data/aliases/jutsu.json` — domínio `game-runtime` — 3 bytes — SHA-256 `ca3d163bab055381827226140568f3bef7eaac187cebd76878e0b63e9e442356`
- `data/aliases/locations.json` — domínio `game-runtime` — 73 bytes — SHA-256 `252162175719f7cd26ec6c50b4bcfb1cfe4930659e99c4334385296a45c08375`
- `data/aliases/npcs.json` — domínio `game-runtime` — 623 bytes — SHA-256 `a3fba63d4af5f21c466f4079a9dfe62510528c655ae919a35b6da5f88ed4238e`
- `data/assets/asset-manifest.json` — domínio `game-runtime` — 61554 bytes — SHA-256 `aed22151b60fc7ab84e31e329acdf143399cb55e8b3075d4e24b91d025e70353`
- `data/catalogo.js` — domínio `game-runtime` — 940971 bytes — SHA-256 `f7b198ec2917b416d6e3d6a88ec9beaec0a135cd0415261c3e746935a8402e1e`
- `data/catalogo.json` — domínio `game-runtime` — 1243629 bytes — SHA-256 `d6cf8702da291f6325470fd1024f62c01a17fb4ad40a1f7d236e6dc15e6ddea1`
- `data/conteudo-livros.js` — domínio `game-runtime` — 28464 bytes — SHA-256 `ab05a176f67168df93e98869ae7e0518951d3bf77ee300febf2c92a49984a3f3`
- `data/r27-canon-events.js` — domínio `game-runtime` — 44102 bytes — SHA-256 `cc8a348e2b7f05191e87f6669c518608f48595a4594beb86a607e168c2019841`
- `data/r27-downloaded-canon-portraits.js` — domínio `game-runtime` — 85 bytes — SHA-256 `ebd4bf65b03ab3a8ac4ef01bc24635e211fc060bdc623fdc7a4fd275cca63ed5`
- `data/r29-user-assets.js` — domínio `game-runtime` — 47505 bytes — SHA-256 `f7729460b09c9102d8d3ec9be1341ea47b965cec7faed90bdf07bb1725994145`
- `data/r30-assets.js` — domínio `game-runtime` — 5688 bytes — SHA-256 `9b50a4c54e95a50084c358ac9abb214eb5e379e9362d882204fc14c3f0b162ba`
- `data/r31-assets.js` — domínio `game-runtime` — 269513 bytes — SHA-256 `0eb80e299f4ccdf83ba0073259b6b106e918c88594d80d97c93532c50ebcd8f2`
- `data/r31-assets.json` — domínio `game-runtime` — 301724 bytes — SHA-256 `827d73efdbc0643914532c814857725c6f3c5492ab53c69ce50758d35db2837c`
- `data/r33-mission-scripts.js` — domínio `game-runtime` — 3731805 bytes — SHA-256 `d67f2fe56236956871192ddc836d53afe9d52d68afb6a70ef9d92d2f9ff00668`
- `data/r38-master-2792.json` — domínio `game-runtime` — 10024507 bytes — SHA-256 `b71d1415dc9aeafecfcb560807ed76ccc2f4b826a085c32a94aa3c7f4c746412`
- `data/r38-master-loader.js` — domínio `game-runtime` — 1108 bytes — SHA-256 `5e5adb64d16c3d4338a3a95f6f892cbbfb7ca803ebb3ab0b22f03af12172ca10`
- `data/r41-data-delta.js` — domínio `game-runtime` — 2644 bytes — SHA-256 `4fe6fff7cc81fb915b34eaa85fe77eebb81bf7da8281756fb68a3025210b24cb`
- `data/r41-exact-visuals.js` — domínio `game-runtime` — 97588 bytes — SHA-256 `ae197bd02a7847422c76c030b7da5a0ba66ae5a5dacfde3364a9c5faaa30f54d`
- `data/r41-gm3-techniques.json` — domínio `game-runtime` — 4448697 bytes — SHA-256 `7a08b02137ca8dd13109f1fcaf8507024a324e10c0a4aa6b6b8c267ecf5a1691`
- `data/r41-user-visuals.js` — domínio `game-runtime` — 4321 bytes — SHA-256 `3f2605518e611d00d1f88735c0fe51bd5813ebaf20e3e75e8c97f503ebf04f17`
- `data/r41-verified-visuals.js` — domínio `game-runtime` — 8226 bytes — SHA-256 `38242a7cc4bc83780f2fd5b73f9f1a0ef1673085446cd9e8a63be9a0c243ab08`
- `data/v5-content.js` — domínio `game-runtime` — 15746 bytes — SHA-256 `dc9412391bbc4e6e822b9ebee47d6b7b7965160ec2d0248b6721549e4743c9c8`
- `data/v6-content.js` — domínio `game-runtime` — 2726 bytes — SHA-256 `0a8ce31a1c74f4ae83823cefe2020a5c095052ea72a3ae47ee9b6dd01ac04483`
- `data/v7-content.js` — domínio `game-runtime` — 51600 bytes — SHA-256 `f54a6a89c8d61421a4b2d0c206f6ea8a2b06d7732883967d00388157eb262e13`
- `data/v74-content.js` — domínio `game-runtime` — 14194 bytes — SHA-256 `55772c1b6edf6b91cad17e4e6885d5520f215e1cbcf33f03b21adf87d1935fbb`
- `data/v75-content.js` — domínio `game-runtime` — 106243 bytes — SHA-256 `16f57dc51cdf7adc082fddf246dc8584aab1fcf57d1865eeeac2d32905876969`
- `data/v81-leon-content.js` — domínio `game-runtime` — 166502 bytes — SHA-256 `ac35aea88a4bd7f789be3704aeb9f33130dd19d88970bd6f1876e70f7bb16cf1`
- `data/v83-integrated-config.js` — domínio `game-runtime` — 4549 bytes — SHA-256 `d6d9a707b5ae1eeb3ddaf8b4ee133f14f493f7751c7b0f9914ef62127b488123`
- `data/v84-integrated-config.js` — domínio `game-runtime` — 7177 bytes — SHA-256 `c5bf582ad26f1fa6dcea7d4c3ac61dd66a97c20954061b75d5e5a6f71be88441`
- `data/v84-knowledge-catalog.js` — domínio `game-runtime` — 438049 bytes — SHA-256 `4df8d9db089af3d26a2d59db3a9af83c947aebba1b78d965d9b8ba6e170441a2`
- `data/v84-knowledge-catalog.json` — domínio `game-runtime` — 356957 bytes — SHA-256 `775184e243c4c9bf30d58b3a704eea68c844f7a99ac5943b414307ad49734edc`
- `data/v84-live-world.js` — domínio `game-runtime` — 894903 bytes — SHA-256 `02b7a54e1d27499047618d51e3e01308d276d259c42667527449227849b92ae2`
- `data/v84-live-world.json` — domínio `game-runtime` — 1446635 bytes — SHA-256 `4cd5d0cf319e01d4cdefde444b74b3e1ae5b9eea2e8fba75e4fd3efd649f833c`
- `data/v84-visual-manifest.js` — domínio `game-runtime` — 242316 bytes — SHA-256 `736232844cffbb8d0377bfaecd3857d5cb0b378f73a295844696706fa8848eab`
- `index.html` — domínio `game-runtime` — 3711 bytes — SHA-256 `b3eb157b506978ce164e9f3f7e4a5f66cda53dfbf2bc11d5553a7bf3953f09fb`
- `package.json` — domínio `game-runtime` — 1106 bytes — SHA-256 `e7856d849611cc2f93c3c2183e734ba6489c5f0d8917ec1b01d4a5e1e69e5b46`
- `r31.css` — domínio `game-runtime` — 6504 bytes — SHA-256 `9245dcd7ffd0a7537f86fb80ce5cba141f5a62cf10bee53a42b06139e5c422d1`
- `R41_GITHUB_MATERIALIZATION.json` — domínio `game-runtime` — 818 bytes — SHA-256 `7b87369d1b1a9025b4ef6f5cc190a879edb9ed4198ac6ef89609ae67d00c7ac2`
- `r41-account-deeplink-fix.js` — domínio `game-runtime` — 587 bytes — SHA-256 `656a130f1d83215e8d650cf6c0c9034afc7fc45af24a551985b6f0054f912bf2`
- `r41-account-ui.js` — domínio `game-runtime` — 12242 bytes — SHA-256 `a19b31871cd677b30e881b3728e2e304d4a4adcd63be611b80534a4d9e90dcab`
- `r41-api-config.js` — domínio `game-runtime` — 729 bytes — SHA-256 `6b1837639df2886d142cbe559edbd57ae3354ead5b92b5a22f7ed185a286cdec`
- `r41-github-api.js` — domínio `game-runtime` — 7052 bytes — SHA-256 `bd3dd0a77e0587f7cc8f8951cff67ed8ba0e39670909d1b501b7033fe00f5056`
- `src/r41-canonical-repair.js` — domínio `game-runtime` — 4765 bytes — SHA-256 `9190baa9900f56bdaa04050095cf8f873f33ed94f807c836875a79d43a9783a1`
- `src/r41-core-bundle.js` — domínio `game-runtime` — 14187 bytes — SHA-256 `59dff7a7cd24d1446d426525c93e22ca9e64e091dbd98ad4419e92feb181c558`
- `src/r41-final-ui-repair.js` — domínio `game-runtime` — 2366 bytes — SHA-256 `caffe196b8abd33d0e6237ac2dcf3149a5fabd17c39276f7fbf8b523b1d7c619`
- `src/r41-local-reset-fix.js` — domínio `game-runtime` — 1605 bytes — SHA-256 `6ed3b5d05431c3669834a48f3c6c1d8a10fe631329628ad2b61249fce127a487`
- `styles.css` — domínio `game-runtime` — 153759 bytes — SHA-256 `6fd9f955dddb1825f20a4c4779aa4179d8d293db84040bec9098ed6cface55ab`
- `tools/account-live-e2e.mjs` — domínio `tooling` — 4937 bytes — SHA-256 `e2cc845a2fb5221addbd26ea3ec5c65a1a9677aaaeed6eefae9e1c9c2493b9d7`
- `tools/audit-documentation-coverage.mjs` — domínio `tooling` — 9751 bytes — SHA-256 `baa239d16f0d0a1ec120fa19025a7454ac2cbfa509692945f5c4eaed8f436e35`
- `tools/audit-final-canonical-spec.mjs` — domínio `tooling` — 3143 bytes — SHA-256 `d5ba4fb27a3c519eeca10798716adc5b2f2b594b77b2e5aea2e240cb65e2cabb`
- `tools/audit-operational-static-contracts.mjs` — domínio `tooling` — 2954 bytes — SHA-256 `218e2758c48d50308241329b8715fb3963b673e33b5136e2ebd5b17fcab4eea4`
- `tools/audit-r41-assets.mjs` — domínio `tooling` — 4125 bytes — SHA-256 `39749a4858fc14f1ea27a22e269f947346e90cf51916befec19691945b95606a`
- `tools/browser-account-live.mjs` — domínio `tooling` — 4464 bytes — SHA-256 `9389b1454b69d2f33a4303fd4613182d459c8d160d82e081ea223f14969bbe96`
- `tools/browser-gameplay-e2e-v2.mjs` — domínio `tooling` — 9066 bytes — SHA-256 `1e4f4da345fd560b253054e35b81fa9ce99932b5ee497806512e788d92476a12`
- `tools/browser-gameplay-e2e-v3.mjs` — domínio `tooling` — 5034 bytes — SHA-256 `2a047e3da2b029183c654fdbc5cba970133a72de0b91ce018ec60c46d5ee22aa`
- `tools/browser-gameplay-e2e.mjs` — domínio `tooling` — 24505 bytes — SHA-256 `3b71f9eef487aea41b1232571fb54caa259739640355d801899fe46fbeb2c0ea`
- `tools/browser-live-api.mjs` — domínio `tooling` — 4729 bytes — SHA-256 `67e1046f218c44eae5491df38caf52f820cf097ecb4eaa5b861283cca6a2b8f2`
- `tools/browser-smoke.mjs` — domínio `tooling` — 5675 bytes — SHA-256 `b8475ddc66c704f9c4d77a9ca53f8d040aa43b18c775552c439b9c066250dd60`
- `tools/build-final-canonical-spec.mjs` — domínio `tooling` — 15497 bytes — SHA-256 `5b7420296866c75d337670d0bbe8bf118311e7298857fb883272976df19763ba`
- `tools/final-readiness.mjs` — domínio `tooling` — 9243 bytes — SHA-256 `bd66e89c794d7caa4d80f8cdc49ec930ee51e1051000208aa006c666fa183f3f`
- `tools/finalize-canonical-ui-trace.mjs` — domínio `tooling` — 9765 bytes — SHA-256 `b728c5b66e8f85aaaa803e93adf1a39033bd2901ffe45f48c80b11d96460d24c`
- `tools/generate-technical-spec.mjs` — domínio `tooling` — 14766 bytes — SHA-256 `d0075077513909fb59405acf6a3d726f2d2b2f10edbe366fce90c54ea4b60275`
- `tools/live-worker-e2e.mjs` — domínio `tooling` — 10604 bytes — SHA-256 `a827e48b4312cef2791f6e0981dd7e3a10fb01e907aa015813283a3fafa78a27`
- `tools/reconcile-asset-references.mjs` — domínio `tooling` — 4671 bytes — SHA-256 `50d182a279199d7c78709eda1cba9b8ba256265749fa038dd570dfa148d21d11`
- `tools/refine-technical-spec.mjs` — domínio `tooling` — 12448 bytes — SHA-256 `b7e5f87f940c4634198739263635a951b4d0554a5b8bcdab72e7260a6709ff3c`
- `tools/repair-canonical-markdown-after-trace.mjs` — domínio `tooling` — 4413 bytes — SHA-256 `b11ad92071c66b1b218e1c872ec860e5daa9864bd78e9eabfa31ccba8b534586`
