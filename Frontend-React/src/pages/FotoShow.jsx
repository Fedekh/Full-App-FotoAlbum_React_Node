import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";
import { useEffect, useState } from "react";
import Foto from "../components/Foto";

export default function FotoShow() {
    const { id } = useParams();
    const navigation = useNavigate();
    const { foto,fetchData } = useBlog();
    const idNumerico = id ?? Number(id);
    
    useEffect(() => {
        fetchData(idNumerico);
    }, [fetchData, idNumerico]);
    
    

    return (
        <div>
            <div>{console.log(foto,idNumerico)}</div>
            <button onClick={() => navigation(-1)}>Indietro</button>
            <Foto {...foto} />
        </div>
    );
}
