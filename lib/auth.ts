export type StoredUser = {
  username: string;
  email: string;
  createdAt: string;
  avatarInitial?: string;
};

const USER_KEY = "ct_user";
const VERIFIED_KEY = "ct_verified";

export function saveUser(user: StoredUser) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    window.dispatchEvent(new Event("ct:user-updated"));
  } catch {}
}

export function getUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(VERIFIED_KEY);
    window.dispatchEvent(new Event("ct:user-updated"));
  } catch {}
}

export function setVerified(v: boolean) {
  try {
    localStorage.setItem(VERIFIED_KEY, v ? "1" : "0");
  } catch {}
}

export function isVerified(): boolean {
  try {
    return localStorage.getItem(VERIFIED_KEY) === "1";
  } catch {
    return false;
  }
}

export function initialFromName(name?: string) {
  const s = (name || "").trim();
  return s ? s[0]!.toUpperCase() : "U";
}

export function initialFromNameOrEmail(name?: string, email?: string) {
  const src = (email || name || "").trim();
  return src ? src[0]!.toUpperCase() : "U";
}
