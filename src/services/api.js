const API_BASE = 'https://tikts.au/organizer/api';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}/${path}`, {
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export async function apiPost(path, payload = {}) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export { API_BASE };
