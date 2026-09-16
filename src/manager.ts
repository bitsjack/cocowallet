import { initializeCoco, ConsoleLogger, type Manager } from '@cashu/coco-core';
import { IndexedDbRepositories } from '@cashu/coco-indexeddb';

import { getOrCreateSeed } from './wallet-store.js';

export async function openWallet(): Promise<Manager> {
  const seed = getOrCreateSeed();

  const repo = new IndexedDbRepositories({ name: 'cocowallet' });
  await repo.init();

  const logger = new ConsoleLogger('cocowallet', { level: 'warn' });

  return initializeCoco({
    repo,
    seedGetter: async () => seed,
    logger,
  });
}
