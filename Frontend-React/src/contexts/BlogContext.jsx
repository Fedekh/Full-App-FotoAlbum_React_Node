import React, { createContext, useContext, useState } from "react";
import fetchApi from "../utility/fetchApi";

// Crea il contesto
const BlogContext = createContext();

export function BlogProvider({ children }) {
    const [fotoList, setFotoList] = useState([]);
    const [foto, setFoto] = useState();

    async function fetchDataAll() {
        try {
            const data = await fetchApi();
            if (data && data.data) {
                setFotoList(data.data);
            } else {
                console.error("Invalid data received from fetchApi");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function fetchData(id) {
        try {
            const data = await fetchApi(id);
            if (data && data.data) {
                setFoto(data.data);
            } else {
                console.error("Invalid data received from fetchApi");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <BlogContext.Provider value={{ fotoList, foto, fetchData, fetchDataAll }}>
            {children}
        </BlogContext.Provider>
    );
}

// creazione di un custom hook per accedere al context
export function useBlog() {
    return useContext(BlogContext);
}
