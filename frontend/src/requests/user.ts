import fetchWithRetry from "helpers/fetchWithRetry";

export async function login(loginForm: { email: string; password: string }) {
  const res = await fetchWithRetry("http://127.0.0.1:3001/users/login", {
    fetchOptions: {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: { "content-type": "application/json" },
    },
  });

  return res.json();
}

export async function getUserById(id: string) {
  const res = await fetchWithRetry(`http://127.0.0.1:3001/users/:${id}`);

  return res.json();
}

export async function updateUser(user: {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  _id?: string;
}) {
  const res = await fetchWithRetry(`http://127.0.0.1:3001/users/:${user._id}`, {
    fetchOptions: {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    },
  });

  return res.json();
}

export async function signup(user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
}) {
  const res = await fetchWithRetry("http://127.0.0.1:3001/users/signup", {
    fetchOptions: {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    },
  });

  return res.json();
}
