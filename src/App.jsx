import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; // Import du composant Header
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Favoris from './pages/Favoris/Favoris';


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

                {/*Ajouter /films et /series plus tard */}
                <Route path="/films" element={<Home />} />
                <Route path="/series" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;