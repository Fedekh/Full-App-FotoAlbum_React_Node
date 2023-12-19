import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utility/api";

// Crea il contesto
const BlogContext = createContext();

export function BlogProvider({ children }) {
    const [fotoList, setFotoList] = useState([]);

    async function fetchData() {
        const data = await api('/foto');
        setFotoList(data.data);
    }

    return (
        <BlogContext.Provider value={{ fotoList,fetchData }}>{children}</BlogContext.Provider>
    );
}

// creazione di un custom hook per accedere al context
export function useBlog() {
    return useContext(BlogContext);
}
