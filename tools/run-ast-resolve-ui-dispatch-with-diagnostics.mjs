import fs from 'node:fs';
import path from 'node:path';

// CI trigger: canonical specification validation after streaming + selector AST fixes.
const outDir = path.join(process.cwd(), 'docs', 'generated');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'AST-UI-DISPATCH-ERROR.log');

try {
  await import('./ast-resolve-ui-dispatch.mjs');
  fs.writeFileSync(outFile, 'PASS: ast-resolve-ui-dispatch.mjs terminou sem excecao.\n', 'utf8');
} catch (error) {
  const text = [
    'FAIL: ast-resolve-ui-dispatch.mjs',
    '',
    error?.stack || String(error),
    ''
  ].join('\n');
  fs.writeFileSync(outFile, text, 'utf8');
  console.error(text);
  process.exitCode = 1;
}
