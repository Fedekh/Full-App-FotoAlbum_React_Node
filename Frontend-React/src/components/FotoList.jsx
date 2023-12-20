import { useBlog } from "../contexts/BlogContext";
import Foto from "./Foto";
import { useEffect } from "react";

export default function FotoList() {
  const { fotoList, fetchDataAll } = useBlog();

  useEffect(() => {
    fetchDataAll();
  }, []);
  

  return (
    <div>
      <div className="bg-gray-800 rounded">
        <div className="container mx-auto w-full py-11">
          <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
          <div className="flex flex-wrap gap-5 justify-center">
            {fotoList.map((foto) => (
              <Foto key={foto.id} {...foto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
