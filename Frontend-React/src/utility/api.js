import axios from "axios";

export default async function api(path, method = "GET", body = null) {
  try {
    const data = await axios({
      method,
      url: import.meta.env.VITE_API_URL + path,
      data: body,
    });

    const rt6 = data;
    console.log(rt6)
    // if (response.status !== 200) {
    //   if (data.error === "TokenExpiredError" || data.error === "AuthError") {
    //     localStorage.removeItem("token");
    //     window.location = "/login";
    //   }

    //   throw new Error(data.message ?? "A causa di un errore non è possibile eseguire l'operazione richiesta.");
    // }

    return data;
  } catch (error) {
    throw error;
  }
}
