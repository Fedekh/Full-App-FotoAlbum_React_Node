import { Link } from "react-router-dom";

export default function Foto({ name, description, image, id, categories }) {
    const apiBack = 'http://localhost:3000/foto/';

    function getImgUrl() {
        if (!image) return "/pizza_placeholder.webp";

        if (image.startsWith("http") || image.startsWith("data:")) {
            return image; // Se l'URL dell'immagine è già completo, utilizzalo direttamente
        } else {
            // Altrimenti, aggiungi il percorso del backend all'URL parziale dell'immagine
            return `${apiBack}${image}`;
        }
    }

    return (
        <div className="max-w-sm rounded border-slate-900 overflow-hidden shadow-lg">
            <img className="w-full" src={getImgUrl()} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Nome : {name}</div>
                <p className=" text-base">Descrizione: {description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p>
                    Categorie:
                </p>
                {categories ? categories?.map((categoria) => (
                    <span
                        key={categoria.id}
                        className="inline-block bg-gray-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                        {categoria.name}
                    </span>
                )) : <p>Spiacenti, categorie assenti</p>}
            </div>

            <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/blog/${id}`}
            >Info
            </Link>
        </div>
    );
};