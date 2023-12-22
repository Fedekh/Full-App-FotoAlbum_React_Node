import { Outlet } from "react-router-dom";
import Header from "../components/HeaderAdmin";
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
