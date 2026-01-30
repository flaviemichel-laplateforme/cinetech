import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Favoris from './pages/Favoris/Favoris';
import Catalogue from './components/Catalogue/Catalogue';
import Search from './pages/Search/Search';
import MentionsLegales from './pages/MentionsLegales/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite/PolitiqueConfidentialite';
import CGU from './pages/CGU/CGU';

/**
 * Composant racine de l'application
 * Configure le routing et les notifications globales
 */
function App() {
    return (
        <BrowserRouter>
            {/* Notifications toast avec z-index élevé pour passer au-dessus des modals */}
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: { zIndex: 99999 }
                }}
            />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id/:type" element={<Detail />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/favoris" element={<Favoris />} />
                {/* Route dynamique : :type accepte 'movie' ou 'tv' */}
                <Route path="/films/:type" element={<Catalogue />} />
                <Route path='/search' element={<Search />} />

                {/* Pages légales */}
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/cgu" element={<CGU />} />

                {/* Route 404 (Optionnel mais conseillé) */}
                <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Page introuvable</div>} />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;