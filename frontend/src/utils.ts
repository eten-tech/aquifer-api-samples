export async function fetchFromApi<T>(
  path: string,
  params: object = {},
): Promise<T | null> {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value),
  );
  const searchParams = new URLSearchParams(cleanParams);
  const url = `http://localhost:5174/${path}?${searchParams}`;

  return fetch(url)
    .then((response) => response.ok ? response.json() as T : null)
    .catch(() => null);
}
