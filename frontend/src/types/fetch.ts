export type FetchOptions = {
  token?: string | null;
  retryCount?: number;
  retryDelay?: number;
  fetchOptions?: RequestInit;
};
