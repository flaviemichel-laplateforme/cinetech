import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Pour le futur hamburger si besoin

    const handleLogin = () => {
        const pseudo = prompt("Entrez votre pseudo :");
        if (pseudo && pseudo.trim()) {
            const newUser = { name: pseudo, id: Date.now() };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            window.location.reload();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim().length > 0) {
            navigate(`/search?q=${searchTerm}`);
            closeSearch();
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length > 0) {
                const fetchData = async () => {
                    try {
                        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}&language=fr-FR`);
                        const data = await response.json();
                        const filtered = (data.results || []).filter(item => item.media_type === 'movie' || item.media_type === 'tv');
                        setResults(filtered);
                    } catch (error) { console.error(error); }
                };
                fetchData();
            } else { setResults([]); }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const isActive = (path) => location.pathname === path ? "header-link active" : "header-link";
    const closeSearch = () => { setSearchTerm(""); setResults([]); };

    return (
        <header className="header">
            <div className="header-top-row">
                <Link to="/" className="header-logo">
                    <img src="/images/logo.png" alt="CineTech" className="logo-img" />
                </Link>

                {/* Sur mobile, on affiche le profil à côté du logo */}
                <div className="mobile-auth">
                    {user ? (
                        <button onClick={handleLogout} className="btn-icon"><FaSignOutAlt /></button>
                    ) : (
                        <button onClick={handleLogin} className="btn-icon"><FaUser /></button>
                    )}
                </div>
            </div>

            <nav className="nav-container">
                <ul className="header-nav">
                    <li><Link to="/" className={isActive("/")}>Accueil</Link></li>
                    <li><Link to="/films/movie" className={isActive("/films/movie")}>Films</Link></li>
                    <li><Link to="/films/tv" className={isActive("/films/tv")}>Séries</Link></li>
                    <li><Link to="/favoris" className={isActive("/favoris")}>Favoris</Link></li>
                </ul>
            </nav>

            <div className="header-right">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Titres, personnes, genres"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                    />

                    {results.length > 0 && (
                        <div className="search-results">
                            {results.slice(0, 5).map((item) => {
                                const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
                                return (
                                    <Link key={item.id} to={`/detail/${item.id}/${mediaType}`} className="search-item" onClick={closeSearch}>
                                        {item.poster_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title} />
                                        ) : <div className="no-img"></div>}
                                        <span>{item.title || item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Version Desktop du profil */}
                <div className="desktop-auth">
                    {user ? (
                        <div className="user-info">
                            <span>{user.name}</span>
                            <button onClick={handleLogout} title="Déconnexion"><FaSignOutAlt /></button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="btn-login"><FaUser /> Connexion</button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;