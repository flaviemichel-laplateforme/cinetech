import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; // Import du composant Header
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Favoris from './pages/Favoris/Favoris';
import Catalogue from './components/Catalogue/Catalogue';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Route Accueil */}
                <Route path="/" element={<Home />} />

                {/* Route de detail par id */}
                <Route path="/detail/:id" element={<Detail />} />

                {/* Route Favoris */}
                <Route path="/favoris" element={<Favoris />} />

                {/* Quand on va sur /films, on appelle Catalogue en mode "movie" */}
                <Route path="/films" element={<Catalogue category="movie" />} />

                {/* Quand on va sur /series, on appelle Catalogue en mode "tv" */}
                <Route path="/series" element={<Catalogue category="tv" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;