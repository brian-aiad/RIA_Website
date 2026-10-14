import { spawnSync } from 'node:child_process';
import { COMING_SOON_ENABLED } from '../config/release.mjs';
const scripts = COMING_SOON_ENABLED
  ? ['qa-release-gate.mjs', 'test-release-gate-api.mjs']
  : ['seo-lint.mjs', 'validate-schema.mjs', 'qa-production.mjs'];
for (const script of scripts) {
  const result = spawnSync(process.execPath, ['--experimental-strip-types', `scripts/${script}`], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
