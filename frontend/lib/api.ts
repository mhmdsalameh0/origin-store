const defaultApiBaseUrl = "http://localhost:4000";

function apiBaseUrl() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || defaultApiBaseUrl;
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutApiPrefix = normalizedPath.replace(/^\/api(?=\/|$)/, "");

  return `${apiBaseUrl()}${pathWithoutApiPrefix}`;
}

