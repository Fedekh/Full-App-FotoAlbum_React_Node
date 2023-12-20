import { useEffect, useState ,} from "react";
import { useNavigate, useParams } from "react-router-dom";  // Rimuovi useSearchParams perché non sembra essere utilizzato
import Foto from "../components/Foto";
import { useBlog } from "../contexts/BlogContext";

export default function FotoShow() {
    const { id } = useParams();
    console.log(id);
    const navigation = useNavigate();
    const { foto, fetchData } = useBlog();
    console.log(useBlog());


    const fetchDataOnMount = async () => {
            await fetchData(id);
    };

    useEffect(() => {
        fetchDataOnMount();
    }, []);

    return (
        <div>
            <button onClick={() => navigation(-1)}>Indietro</button>
            <button onClick={fetchDataOnMount}>Ricarica Dati</button>
            <Foto foto={foto} />
        </div>
    );
}
