import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Foto from "../components/Foto";
import api from '../utility/getAll';

export default function FotoShow() {
    const { id } = useParams();
    const navigation = useNavigate();
    const [foto, setFoto] = useState();
    const idNumerico = id ?? Number(id);

    useEffect(() => {
        const fetchData = async function (){
            try {
                const data = await api(idNumerico);
                setFoto(data);
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            <button onClick={() => navigation(-1)}>Indietro</button>
            {foto && <Foto {...foto} />}
        </div>
    );
}
