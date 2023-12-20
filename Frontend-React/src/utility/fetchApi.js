export default async function fetchApi(id = null, method = "GET", body = null) {
  const baseUrl = "http://localhost:3000/foto/";
  try {
    const url = id ? `${baseUrl}${id}` : `${baseUrl}`;

    const requestOptions = {
      method,
      headers: {
        "Content-Type": body instanceof FormData ? null : "application/json",
      },
    };

    // Aggiungi il corpo solo se il metodo non è GET o HEAD
    if (method !== "GET" && method !== "HEAD") {
      requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const resp = await fetch(url, requestOptions);

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
