import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './Header.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function Header() {
    const location = useLocation();

    // 1. États pour la recherche
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    // 2. Gestion de la saisie
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // 3. Appel API quand le terme change
    useEffect(() => {
        if (searchTerm.length > 0) { // On attend au moins 1 lettre
            const fetchMovies = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=fr-FR`);
                    const data = await response.json();
                    setResults(data.results || []); // On s'assure que c'est un tableau
                } catch (error) {
                    console.error("Erreur :", error);
                }
            };
            fetchMovies();
        } else {
            setResults([]); // On vide si le champ est vide
        }
    }, [searchTerm]);

    // Fonction pour gérer la classe active du menu
    const isActive = (path) => {
        return location.pathname === path ? "header-link active" : "header-link";
    };

    // Fonction pour fermer la liste quand on clique sur un lien
    const closeSearch = () => {
        setSearchTerm("");
        setResults([]);
    };

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img src="/images/logo.png" alt="CineTech" className="logo-img" />
            </Link>

            <nav>
                <ul className="header-nav">
                    <li><Link to="/" className={isActive("/")}>Accueil</Link></li>
                    <li><Link to="/films" className={isActive("/films")}>Films</Link></li>
                    <li><Link to="/series" className={isActive("/series")}>Séries</Link></li>
                    <li><Link to="/favoris" className={isActive("/favoris")}>Favoris</Link></li>
                </ul>
            </nav>

            {/* --- BARRE DE RECHERCHE --- */}
            <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />

                {/* Liste des résultats (Autocomplete) */}
                {results.length > 0 && (
                    <div className="search-results">
                        {results.slice(0, 5).map((movie) => (
                            <Link
                                key={movie.id}
                                to={`/detail/${movie.id}`}
                                className="search-item"
                                onClick={closeSearch} // Ferme la liste au clic
                            >
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{ width: '30px', marginRight: '10px' }}
                                    />
                                )}
                                <span>{movie.title}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;