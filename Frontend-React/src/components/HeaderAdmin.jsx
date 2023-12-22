import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function HeaderAdmin() {
  const { handleLogout, isLogged } = useAuth();

    return (
        <header>
            <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <a href="" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    </a>
                    <ul className="flex gap-4 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <Link to='/'>Home</Link>
                    </ul>
                    <div className="flex items-center lg:order-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2focus:outline-none dark:focus:ring-gray-800">
                      <Link onClick={handleLogout} to='/login'>Logout</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}