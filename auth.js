
const TOKEN_KEY = "orkio_token";
const USER_KEY = "orkio_user";
const TENANT_KEY = "orkio_tenant";

export function setSession({ token, user, tenant }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (tenant) localStorage.setItem(TENANT_KEY, tenant);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TENANT_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getTenant() {
  return localStorage.getItem(TENANT_KEY) || "public";
}

export function isAdmin() {
  return (getUser()?.role || "") === "admin";
}
