import { openWallet } from './manager.js';
import { ensureDefaultMint } from './mints.js';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.textContent = 'initializing wallet...';

async function main() {
  const manager = await openWallet();
  await ensureDefaultMint(manager);

  const mints = await manager.mint.getAllMints();
  const balances = await manager.wallet.balances.byMint();
  const total = await manager.wallet.balances.total();

  console.log('coco manager ready', manager);
  console.log('mints', mints);
  console.log('balances', balances);

  const rows = mints
    .map((mint) => {
      const balance = balances[mint.mintUrl];
      const spendable = balance ? balance.spendable.toNumber() : 0;
      const unit = balance?.unit ?? total.unit;
      return `<li>${mint.mintUrl}: ${spendable} ${unit}</li>`;
    })
    .join('');

  app.innerHTML = `
    <p>wallet ready — total balance: ${total.total.toNumber()} ${total.unit}</p>
    <ul>${rows}</ul>
  `;
}

main().catch((error) => {
  console.error('failed to initialize wallet', error);
  app.textContent = 'failed to initialize wallet — see console';
});
