import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* Le header sera placé ici après */}
            <Routes>
                {/* Route Accueil */}
                <Route> path="/" element={<Home />}</Route>

                {/* Route de detail par id */}
                <Route> path="/detail/:id" element={<Detail />}</Route>

                {/* Route Favoris */}
                <Route> path="/favoris" element={<Favoris />}</Route>

                {/*Ajouter /films et /series plus tard */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;