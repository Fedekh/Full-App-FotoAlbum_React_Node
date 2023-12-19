import { Link } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";
import Foto from "./Foto";
import { useEffect } from "react";

export default function FotoList() {
    let initiated = false;
    const { fotoList, fetchData } = useBlog()

    useEffect(() => {
        if (initiated) return;

        fetchData();
        initiated = true;
    }, []);

    return (
        <div>
            <div className="bg-gray-800 rounded">
                <div className="container mx-auto w-full py-11">
                    <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
                    <div className="flex flex-wrap justify-center">
                        {fotoList.map((foto, i) => <Foto key={i} {...foto}></Foto>)}
                    </div>
                </div>
            </div>

        </div>
    )
}