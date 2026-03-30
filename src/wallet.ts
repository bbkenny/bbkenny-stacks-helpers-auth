import { generateWallet, getStxAddress, generateNewAccount } from "@stacks/wallet-sdk";
import type { WalletAccount } from "richiey1-stacks-helpers-types";

export async function deriveAccounts(
  mnemonic: string,
  startIndex: number = 0,
  endIndex: number = 10
): Promise<WalletAccount[]> {
  let wallet = await generateWallet({ secretKey: mnemonic, password: "" });
  const accounts: WalletAccount[] = [];

  for (let i = 0; i <= endIndex; i++) {
    if (i > 0) wallet = await generateNewAccount(wallet);

    if (i >= startIndex) {
      const account = wallet.accounts[i];
      const address = getStxAddress({ account, network: "mainnet" });

      accounts.push({
        address,
        privateKey: account.stxPrivateKey,
        index: i,
      });
    }
  }

  return accounts;
}

export async function deriveAccount(
  mnemonic: string,
  index: number = 0
): Promise<WalletAccount> {
  const accounts = await deriveAccounts(mnemonic, index, index);
  return accounts[0];
}
