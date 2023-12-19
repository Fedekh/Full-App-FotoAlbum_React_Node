const baseUrl = "http://localhost:3000/foto/";

export default async function api(path, method = "GET", body = null) {
  try {
    const resp = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": body instanceof FormData ? null : "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!resp.ok) {
      throw new Error(`Failed to fetch: ${resp.status} - ${resp.statusText}`);
    }

    const data = await resp.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
