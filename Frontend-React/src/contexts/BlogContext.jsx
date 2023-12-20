import React, { createContext, useContext, useState } from "react";
import getAll from "../utility/getAll";

// Crea il contesto
const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [fotoList, setFotoList] = useState([]);
  const [foto, setFoto] = useState({});

  async function fetchDataAll() {
    try {
      const data = await getAll(); // Chiamata diretta alla funzione
      setFotoList(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchData(id) {
    try {
      const data = await getAll(id); // Chiamata diretta alla funzione
      setFoto(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <BlogContext.Provider value={{ fetchData, fetchDataAll, fotoList, foto }}>
      {children}
    </BlogContext.Provider>
  );
}

// creazione di un custom hook per accedere al context
export function useBlog() {
  return useContext(BlogContext);
}
