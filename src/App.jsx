import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Favoris from "./pages/Favoris/Favoris";

function App() {
    return (
        <BrowserRouter>
            {/* Le header sera placé ici après */}
            <Routes>
                {/* Route Accueil */}
                <Route path="/" element={<Home />} />

                {/* Route de detail par id */}
                <Route path="/detail/:id" element={<Detail />} />

                {/* Route Favoris */}
                <Route path="/favoris" element={<Favoris />} />

                {/*Ajouter /films et /series plus tard */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;