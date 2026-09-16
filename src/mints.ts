import type { Manager } from '@cashu/coco-core';

export const DEFAULT_MINT_URL = 'https://testnut.cashu.space';

export async function ensureDefaultMint(manager: Manager): Promise<void> {
  const mints = await manager.mint.getAllMints();
  if (mints.some((mint) => mint.mintUrl === DEFAULT_MINT_URL)) {
    return;
  }
  await manager.mint.addMint(DEFAULT_MINT_URL);
}
