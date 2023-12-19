import { Link } from "react-router-dom";

export default function NotFound() {
console.log('Rendering NotFound');
  return (
    <main className="min-h-[50vh]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <h1>404 - Mi sa che ti sei perso</h1>
            <Link to='/'>Trona in home</Link>
          </div>
        </div>
      </div>
    </main>
  )
};