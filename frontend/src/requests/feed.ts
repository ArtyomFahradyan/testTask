import fetchWithRetry from "helpers/fetchWithRetry";

export async function addFeed(feedBody: {
  title: string;
  content: string;
  createdBy?: string;
}) {
  const res = await fetchWithRetry("http://127.0.0.1:3001/feed", {
    fetchOptions: {
      method: "POST",
      body: JSON.stringify(feedBody),
      headers: { "content-type": "application/json" },
    },
  });

  return res.json();
}

export async function getFeeds() {
  const res = await fetchWithRetry("http://127.0.0.1:3001/feed");

  return res.json();
}

export async function removeFeed(id?: string) {
  return await fetchWithRetry(`http://127.0.0.1:3001/feed/:${id}`, {
    fetchOptions: {
      method: "DELETE",
    },
  });
}
