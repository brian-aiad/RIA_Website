import { spawnSync } from 'node:child_process';
import { COMING_SOON_ENABLED } from '../config/release.mjs';
const review = process.argv.includes('--review');
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run('npx', ['tsc', '-b']);
if (COMING_SOON_ENABLED && !review) {
  run('node', ['--experimental-strip-types', 'scripts/build-coming-soon.mjs']);
} else {
  const mode = review ? 'review' : 'production';
  run('npx', ['vite', 'build', '--mode', mode]);
  run('npx', ['vite', 'build', '--mode', mode, '--ssr', 'src/entry-server.tsx', '--outDir', 'node_modules/.cache/rafla-ssr']);
  run('node', ['scripts/prerender.mjs', review ? 'dist-review' : 'dist']);
}
