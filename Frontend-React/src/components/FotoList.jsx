import { Link } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";
import Foto from "./Foto";
import { useEffect } from "react";

export default function FotoList() {
    let initiated = false;

    const { fotoList, fetchData } = useBlog
    useEffect(() => {
        console.log(fotoList)
        if (initiated) {
            return;
        }

        fetchData();

        initiated = true;
    }, []);
    
    return (
        <div>
            <div className="bg-green-500 rounded lg:min-h-screen">
                <div className="container mx-auto w-full py-11">
                    <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
                    <div className="flex flex-wrap justify-center">
                        {/* <Foto  {...foto}></Foto> */}
                    </div>
                </div>
            </div>
        </div>
    )
}