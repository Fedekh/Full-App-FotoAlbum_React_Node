import { Outlet } from "react-router-dom";
import Header from "../components/HeaderGuest";
import Footer from "../components/FooterGuest";
export default function DefaultLayout() {
    return (
        <div className="container mx-auto">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
