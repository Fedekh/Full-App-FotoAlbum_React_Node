import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Foto from "../components/Foto";
import api from '../utility/fetchApi';

export default function FotoShow() {
    const { id } = useParams();
    const apiBack = 'http://localhost:3000/foto/';

    const [searchParams, setSearchParams] = useSearchParams();
    const [foto, setFoto] = useState({});
    const navigation = useNavigate();

    console.log(id);

    async function fetchData() {
        axios.get(apiBack + id)
            .then((resp => {
                console.log(resp);
                // setProva(resp.data.data);
            }));
        // setFoto(data.data);
    }


    return (
        <div>
            <button onClick={() => navigation(-1)}>Indietro</button>
            <button onClick={fetchData}>sasadds</button>
            <Foto foto={foto} />
        </div>
    );
}