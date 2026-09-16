import { openWallet } from './manager.js';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.textContent = 'initializing wallet...';

openWallet()
  .then((manager) => {
    console.log('coco manager ready', manager);
    app.textContent = 'wallet ready — see console';
  })
  .catch((error) => {
    console.error('failed to initialize wallet', error);
    app.textContent = 'failed to initialize wallet — see console';
  });

