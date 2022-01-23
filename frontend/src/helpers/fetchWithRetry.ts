import { FetchOptions } from "types";

async function fetchWithRetry(
  url: string,
  options: FetchOptions = {
    token: null,
    retryCount: 4,
    retryDelay: 2000,
    fetchOptions: { method: "GET" },
  }
): Promise<Response> {
  const { token, retryCount, retryDelay, fetchOptions } = options;

  try {
    let headers = { ...fetchOptions?.headers };
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await fetch(url, { ...fetchOptions, headers });
    if (!response.ok) throw response;

    return response;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (error.status === 401) null;
    else if (error.status >= 400 && error.status < 500) throw error;

    if (!retryCount || retryCount === 0) throw error;
    await new Promise((r) => setTimeout(r, retryDelay));
    return await fetchWithRetry(url, {
      fetchOptions,
      token,
      retryCount: retryCount - 1,
    });
  }
}

export default fetchWithRetry;
