import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';

const MNEMONIC_KEY = 'cocowallet:mnemonic';

export function walletExists(): boolean {
  return localStorage.getItem(MNEMONIC_KEY) !== null;
}

export function createWallet(): string {
  const mnemonic = generateMnemonic(wordlist, 256);
  localStorage.setItem(MNEMONIC_KEY, mnemonic);
  return mnemonic;
}

export function loadMnemonic(): string {
  const mnemonic = localStorage.getItem(MNEMONIC_KEY);
  if (!mnemonic) {
    throw new Error('No wallet found in this browser. Call createWallet() first.');
  }
  return mnemonic;
}

export function getOrCreateSeed(): Uint8Array {
  const mnemonic = walletExists() ? loadMnemonic() : createWallet();
  if (!validateMnemonic(mnemonic, wordlist)) {
    throw new Error('Stored mnemonic failed validation');
  }
  return mnemonicToSeedSync(mnemonic);
}
