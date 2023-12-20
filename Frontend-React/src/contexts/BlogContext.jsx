import React, { createContext, useContext, useState } from "react";
import fetchApi from "../utility/fetchApi";

// Crea il contesto
const BlogContext = createContext();

export function BlogProvider({ children }) {
    const [fotoList, setFotoList] = useState([]);

    async function fetchData() {
        const data = await fetchApi();
        setFotoList(data.data);
    }

    return (
        <BlogContext.Provider value={{ fotoList, fetchData }}>{children}</BlogContext.Provider>
    );
}

// creazione di un custom hook per accedere al context
export function useBlog() {
    return useContext(BlogContext);
}
