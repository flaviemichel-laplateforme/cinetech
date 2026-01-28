import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Favoris from './pages/Favoris/Favoris';
// Attention au chemin d'import selon où tu as rangé ton Catalogue
import Catalogue from './components/Catalogue/Catalogue';
import Search from './pages/Search/Search';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Route Accueil */}
                <Route path="/" element={<Home />} />

                {/* Routes Détails (On garde les deux pour la sécurité) */}
                <Route path="/detail/:id/:type" element={<Detail />} />
                <Route path="/detail/:id" element={<Detail />} />

                {/* Route Favoris */}
                <Route path="/favoris" element={<Favoris />} />

                {/* 🔴 CORRECTION ICI : Une seule route pour gérer Films ET Séries */}
                {/* Le ":type" va prendre la valeur "movie" ou "tv" */}
                <Route path="/films/:type" element={<Catalogue />} />

                {/* Page de résultat de recherche */}
                <Route path='/search' element={<Search />} />

                {/* Route 404 (Optionnel mais conseillé) */}
                <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Page introuvable</div>} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;