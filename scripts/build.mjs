import { spawnSync } from 'node:child_process';
import { COMING_SOON_ENABLED } from '../config/release.mjs';
const review = process.argv.includes('--review');
const run = (args) => {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run(['node_modules/typescript/bin/tsc', '-b']);
if (COMING_SOON_ENABLED && !review) {
  run(['--experimental-strip-types', 'scripts/build-coming-soon.mjs']);
} else {
  const mode = review ? 'review' : 'production';
  run(['node_modules/vite/bin/vite.js', 'build', '--mode', mode]);
  run(['node_modules/vite/bin/vite.js', 'build', '--mode', mode, '--ssr', 'src/entry-server.tsx', '--outDir', 'node_modules/.cache/rafla-ssr']);
  run(['scripts/prerender.mjs', review ? 'dist-review' : 'dist']);
}
