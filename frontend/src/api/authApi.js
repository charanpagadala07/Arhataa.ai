const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
const TOKEN_KEY = "shortlistai.accessToken";

async function readResponse(response) {
  const body = await response.text();
  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

async function authRequest(path, body) {
  const response = await fetch(`${API_BASE_URL}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(typeof data === "string" ? data : data?.message ?? "Authentication failed.");
  }

  return data;
}

export async function register({ name, email, password }) {
  return authRequest("register", { name, email, password });
}

export async function login({ email, password }) {
  const token = await authRequest("jwtlogin", { email, password });
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("The authentication service returned an invalid token.");
  }

  localStorage.setItem(TOKEN_KEY, token.trim());
  window.dispatchEvent(new Event("shortlistai:auth-change"));
  return { authenticated: true };
}

export function getGoogleLoginUrl() {
  return `${API_BASE_URL}/oauth2/authorization/google`;
}

export function beginGoogleLogin() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("shortlistai:auth-change"));
  window.location.assign(getGoogleLoginUrl());
}

export function saveAccessToken(token) {
  if (!token) throw new Error("Google sign-in did not return an access token.");
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("shortlistai:auth-change"));
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export async function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("shortlistai:auth-change"));
  return { authenticated: false };
}

export async function getSession() {
  return { authenticated: isAuthenticated() };
}
