const baseUrl = "http://localhost:3000/foto/";
export default async function fetchApi(id = null, method = "GET", body = null) {
  try {
    const url = id ? baseUrl + id : baseUrl;
    const resp = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.log("🚀 ~ file: fetchApi.js:16 ~ fetchApi ~ resp:", resp);
      throw new Error(
        data.message ??
          "A causa di un errore non è possibile eseguire l'operazione richiesta."
      );
    }

    console.log("🚀 ~ file: fetchApi.js:32 ~ data.data:", data.data);
    return data.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
