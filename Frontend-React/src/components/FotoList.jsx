import { useBlog } from "../contexts/BlogContext";
import Foto from "./Foto";
import { useEffect } from "react";

export default function FotoList() {
    const { fotoList, fetchData } = useBlog();

    useEffect(() => {
        const fetchDataOnMount = async () => {
            await fetchData();
        };

        fetchDataOnMount();
    }, []);

    return (
        <div>
            <div className="bg-gray-800 rounded">
                <div className="container mx-auto w-full py-11">
                    <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
                    <div className="flex flex-wrap gap-5 justify-center">
                        {fotoList.map((foto, i) => (
                            <Foto key={i} {...foto}></Foto>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
