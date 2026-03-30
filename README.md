# bbkenny-stacks-helpers-auth

Wallet connection, nonce management, and session handling for Stacks L2 development.

## Install

```bash
npm install bbkenny-stacks-helpers-auth
```

## Usage

```typescript
import { deriveAccounts, deriveAccount, getNonce, getBalance, saveSession, getSession } from "bbkenny-stacks-helpers-auth";

// Derive multiple accounts from mnemonic
const accounts = await deriveAccounts("your mnemonic phrase", 0, 10);

// Derive a single account
const account = await deriveAccount("your mnemonic phrase", 0);

// Get nonce and balance
const nonce = await getNonce(account.address);
const balance = await getBalance(account.address);

// Session management
saveSession({ address: account.address, network: "mainnet", connectedAt: Date.now() });
const session = getSession();
```

## API

### `deriveAccounts(mnemonic, startIndex, endIndex)`
Derives multiple wallet accounts from a mnemonic phrase.

### `deriveAccount(mnemonic, index)`
Derives a single wallet account.

### `getNonce(address, networkUrl?)`
Fetches the current nonce, balance, and locked amount for an address.

### `getBalance(address, networkUrl?)`
Fetches the total and available STX balance for an address.

### `saveSession(session)` / `getSession()` / `clearSession()` / `isConnected()`
localStorage-based session management for browser apps.

## Dependencies

- `@stacks/wallet-sdk`
- `@stacks/transactions`
- `@stacks/network`
- `@stacks/auth`
- `richiey1-stacks-helpers-types`

## License

MIT

## Author

bbkenny
