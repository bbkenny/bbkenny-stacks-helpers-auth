const STORAGE_KEY = "stacks-helpers-session";

export interface Session {
  address: string;
  network: string;
  connectedAt: number;
}

export function saveSession(session: Session): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}

export function getSession(): Session | null {
  if (typeof localStorage !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  }
  return null;
}

export function clearSession(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function isConnected(): boolean {
  return getSession() !== null;
}
