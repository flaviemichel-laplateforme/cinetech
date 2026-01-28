import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
// 1. Nouveaux imports pour les icônes utilisateur
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // 2. État Utilisateur (Récupéré depuis le navigateur)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    // États Recherche
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    // --- GESTION CONNEXION ---
    const handleLogin = () => {
        const pseudo = prompt("Entrez votre pseudo pour vous connecter :");
        if (pseudo && pseudo.trim()) {
            const newUser = { name: pseudo, id: Date.now() };
            // On sauvegarde dans le navigateur
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            // On recharge la page pour que les boutons Favoris/Commentaires se mettent à jour
            window.location.reload();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };
    // -------------------------

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
            <Link to="/" className="header-logo">
                <img src="/images/logo.png" alt="CineTech" className="logo-img" />
            </Link>

            <nav>
                <ul className="header-nav">
                    <li><Link to="/" className={isActive("/")}>Accueil</Link></li>
                    <li><Link to="/films/movie" className={isActive("/films/movie")}>Films</Link></li>
                    <li><Link to="/films/tv" className={isActive("/films/tv")}>Séries</Link></li>
                    <li><Link to="/favoris" className={isActive("/favoris")}>Favoris</Link></li>
                </ul>
            </nav>

            {/* 3. Zone Droite : Recherche + Utilisateur */}
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Barre de Recherche */}
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
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
                                    <Link
                                        key={item.id}
                                        to={`/detail/${item.id}/${mediaType}`}
                                        className="search-item"
                                        onClick={closeSearch}
                                    >
                                        {item.poster_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title} style={{ width: '30px', marginRight: '10px' }} />
                                        ) : (
                                            <div style={{ width: '30px', height: '45px', background: '#333', marginRight: '10px' }}></div>
                                        )}
                                        <span>{item.title || item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Boutons Connexion / Déconnexion */}
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                        <span style={{ fontSize: '0.9rem' }}>{user.name}</span>
                        <button
                            onClick={handleLogout}
                            title="Se déconnecter"
                            style={{ background: 'none', border: 'none', color: '#E50914', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        style={{
                            background: '#E50914',
                            color: 'white',
                            border: 'none',
                            padding: '8px 15px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <FaUser size={12} /> Connexion
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;