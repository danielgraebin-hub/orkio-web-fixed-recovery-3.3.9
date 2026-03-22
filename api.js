
const ORKIO_ENV = (typeof window !== "undefined" && window.__ORKIO_ENV__) ? window.__ORKIO_ENV__ : {};
const API_BASE_URL = (ORKIO_ENV.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function buildUrl(path) {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
}

export async function apiFetch(path, { method = "GET", token = "", org = "public", body, signal, headers = {} } = {}) {
  const res = await fetch(buildUrl(path), {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(org ? { "X-Org-Slug": org } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });
  let data = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const message = data?.detail || data?.message || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.detail = data?.detail || data?.message || message;
    if (res.status === 401) err.code = "SESSION_EXPIRED";
    throw err;
  }
  return { data, status: res.status };
}

export const uploadFile = ({ token, org, file, thread_id = null, scope = "thread", agent_ids = [] }) => {
  const fd = new FormData();
  fd.append("file", file);
  if (thread_id) fd.append("thread_id", thread_id);
  fd.append("scope", scope);
  if (agent_ids?.length) fd.append("agent_ids", JSON.stringify(agent_ids));
  return fetch(buildUrl("/api/files/upload"), {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(org ? { "X-Org-Slug": org } : {}),
    },
    body: fd,
  }).then(async (res) => {
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!res.ok) throw new Error(data?.detail || data?.message || `HTTP ${res.status}`);
    return { data, status: res.status };
  });
};

export const chat = ({ token, org, thread_id, message, agent_id = null, trace_id = null, client_message_id = null, signal }) =>
  apiFetch("/api/chat", { method: "POST", token, org, body: { thread_id, message, agent_id, trace_id, client_message_id }, signal });

export const chatStream = chat;

export async function transcribeAudio(blob, { token, org, trace_id = null, language = null } = {}) {
  const fd = new FormData();
  fd.append("file", blob, "audio.webm");
  if (trace_id) fd.append("trace_id", trace_id);
  if (language) fd.append("language", language);
  const res = await fetch(buildUrl("/api/stt"), {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(org ? { "X-Org-Slug": org } : {}),
    },
    body: fd,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) throw new Error(data?.detail || data?.message || `HTTP ${res.status}`);
  return data;
}

export const requestFounderHandoff = ({ token, org, ...body }) => apiFetch("/api/founder/handoff", { method: "POST", token, org, body });
export const getRealtimeClientSecret = ({ token, org, ...body }) => apiFetch("/api/realtime/client-secret", { method: "POST", token, org, body });
export const startRealtimeSession = ({ token, org, ...body }) => apiFetch("/api/realtime/start", { method: "POST", token, org, body }).then(r => r.data);
export const startSummitSession = ({ token, org, ...body }) => apiFetch("/api/realtime/start", { method: "POST", token, org, body }).then(r => r.data);
export const postRealtimeEventsBatch = ({ token, org, ...body }) => apiFetch("/api/realtime/events:batch", { method: "POST", token, org, body }).then(r => r.data);
export const endRealtimeSession = ({ token, org, session_id, ...body }) => apiFetch(`/api/realtime/sessions/${encodeURIComponent(session_id)}/end`, { method: "POST", token, org, body }).then(r => r.data);
export const getRealtimeSession = ({ token, org, session_id }) => apiFetch(`/api/realtime/sessions/${encodeURIComponent(session_id)}`, { token, org }).then(r => r.data);
export const getSummitSessionScore = ({ token, org, session_id }) => apiFetch(`/api/realtime/sessions/${encodeURIComponent(session_id)}/score`, { token, org }).then(r => r.data);
export const submitSummitSessionReview = ({ token, org, session_id, ...body }) => apiFetch(`/api/realtime/sessions/${encodeURIComponent(session_id)}/review`, { method: "POST", token, org, body }).then(r => r.data);
export const downloadRealtimeAta = async ({ token, org, session_id }) => {
  const res = await fetch(buildUrl(`/api/realtime/sessions/${encodeURIComponent(session_id)}/ata.txt`), {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(org ? { "X-Org-Slug": org } : {}),
    },
  });
  if (!res.ok) throw new Error("Falha ao baixar ata");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ata-${session_id}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
export const guardRealtimeTranscript = ({ token, org, ...body }) => apiFetch("/api/realtime/guard", { method: "POST", token, org, body });

export const forgotPassword = ({ email, tenant }) => apiFetch("/api/auth/forgot-password", { method: "POST", org: tenant, body: { email, tenant } });
export const resetPassword = ({ token, password, password_confirm, tenant }) => apiFetch("/api/auth/reset-password", { method: "POST", org: tenant, body: { token, password, password_confirm, tenant } });
export const validateInvestorAccessCode = ({ code, org }) => apiFetch("/api/auth/access-code/validate", { method: "POST", org, body: { code } });
