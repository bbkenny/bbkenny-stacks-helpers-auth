import { API_URLS } from "richiey1-stacks-helpers-types";
import type { NonceInfo } from "richiey1-stacks-helpers-types";

export async function getNonce(
  address: string,
  networkUrl: string = API_URLS.mainnet
): Promise<NonceInfo> {
  const resp = await fetch(`${networkUrl}/v2/accounts/${address}?proof=0`);

  if (resp.status === 429) {
    await new Promise((r) => setTimeout(r, 30000));
    return getNonce(address, networkUrl);
  }

  if (!resp.ok) throw new Error(`Failed to fetch nonce: ${resp.status}`);

  const data = await resp.json();
  return {
    nonce: BigInt(data.nonce),
    balance: BigInt(data.balance),
    locked: BigInt(data.locked),
  };
}

export async function getBalance(
  address: string,
  networkUrl: string = API_URLS.mainnet
): Promise<{ total: bigint; available: bigint }> {
  const resp = await fetch(`${networkUrl}/extended/v1/address/${address}/balances`);

  if (resp.status === 429) {
    await new Promise((r) => setTimeout(r, 30000));
    return getBalance(address, networkUrl);
  }

  if (!resp.ok) throw new Error(`Failed to fetch balance: ${resp.status}`);

  const data = await resp.json();
  const total = BigInt(data.stx.balance);
  const locked = BigInt(data.stx.locked);
  return { total, available: total - locked };
}
