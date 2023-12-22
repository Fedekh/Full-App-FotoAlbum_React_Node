import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from './utility/DefaultLayout'
import AdminLayout from './utility/AdminLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";
import FotoBlog from "./pages/FotoBlog";
import Contact from "./pages/Contacts";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FotoShow from "./pages/FotoShow";
import 'flowbite'
import { BlogProvider } from "./contexts/BlogContext";
import GuestRoutes from "./middlewares/GuestRoutes";
import { AuthProvider } from "./contexts/AuthContext";


/* 
creo context globale e lo esporto per poterlo usare in altri componenti
createContext restituisce un oggetto che contiene due componenti: Provider e Consumer.

- Provider: componente che consente a tutti i figli di accedere a cio che è dentro VALUE.

- Consumer : componenti figli che vogliono accedere ai valori di VALUE

*/

export const GlobalContext = createContext();  //crea l'oggettone

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading }}> {/*contenitore + valori*/}
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            {/* Rotte pubbliche */}
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogProvider><FotoBlog /></BlogProvider>} />
              <Route path="/blog/:id" element={<BlogProvider><FotoShow /></BlogProvider>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<GuestRoutes><Login /></GuestRoutes>}></Route>
              <Route path="/register" element={<GuestRoutes><Register /></GuestRoutes>}></Route>

              <Route path="/about" element={<About />} />
            </Route>

            {/* Rotte private */}
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Rotta "not found" */}
            <Route path="*" element={<DefaultLayout>{<NotFound />}</DefaultLayout>} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}