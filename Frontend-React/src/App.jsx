import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from './utility/DefaultLayout'
import AdminLayout from './utility/AdminLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";
import FotoBlog from "./pages/FotoBlog";
import Contact from "./pages/Contacts";
import About from "./pages/About";
import FotoShow from "./pages/FotoShow";



/* 
creo context globale e lo esporto per poterlo usare in altri componenti
createContext restituisce un oggetto che contiene due componenti: Provider e Consumer.

- Provider accetta una prop denominata VALUE che può essere utilizzata per passare i dati che desideri condividere.

- Consumer consente di consumare il valore del contesto all'interno del componente.
Deve essere utilizzato all'interno del componente figlio del Provider.
Il Consumer può anche essere utilizzato con hook useContext
*/

export const GlobalContext = createContext();

export default function App() {
  const pippo = 3;

  return (
    <GlobalContext.Provider value={pippo}>
      <BrowserRouter>
        <Routes>
          {/* Rotte pubbliche */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<FotoBlog />} />
            <Route path="/blog/:id" element={<FotoShow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Rotte private */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Rotta "not found" */}
          <Route path="*" element={<DefaultLayout>{<NotFound />}</DefaultLayout>} />
       
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}