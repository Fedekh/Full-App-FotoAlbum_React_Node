import { Outlet } from "react-router-dom";
import Header from "../components/HeaderGuest";
import Footer from "../components/FooterGuest";
export default function DefaultLayout({ children = '' }) {
    return (
        <div className="container mx-auto">
            <Header />

            <main className="w-4/5 mx-auto">
                <Outlet />
                {children}
            </main>
            
            <Footer />
        </div>
    );
}
