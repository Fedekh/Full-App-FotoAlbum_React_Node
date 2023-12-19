import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Foto from "../components/Foto";
import api from '../utility/api'

export default function FotoShow() {
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams()
    const [foto, setFoto] = useState({})
    const navigation = useNavigate()

    console.log(id)

    async function fetchData() {
        const data = await api(id);
        setFoto(data.data);
    }

    useEffect(() => {
        fetchData()
        
    }, [])
    
    return (
        <div>
            <button onClick={() => navigation(-1)}>Indietro</button>
            <Foto foto={foto} />
        </div>
    )
}