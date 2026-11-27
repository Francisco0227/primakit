/** Runs the Maestro flows against Metro's LAN address, which changes with each Wi-Fi network. */
const { spawnSync } = require('node:child_process');
const { lanNetworkSync } = require('lan-network');

const { address } = lanNetworkSync();
const appUrl = `exp://${address}:8081`;
console.log(`Maestro -> ${appUrl}`);

const result = spawnSync('maestro', ['test', '-e', `APP_URL=${appUrl}`, '.maestro'], {
  stdio: 'inherit',
  shell: true,
});
process.exit(result.status ?? 1);