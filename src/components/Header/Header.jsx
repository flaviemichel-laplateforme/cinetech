import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "header-link active" : "header-link";
    };

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img src="/images/logo.png" alt="CineTech" className="logo-img" />
            </Link>

            <nav>
                <ul className="header-nav">
                    <li>
                        <Link to="/" className={isActive("/")}>Accueil</Link>
                    </li>
                    <li>
                        <Link to="/films" className={isActive("/films")}>Films</Link>
                    </li>
                    <li>
                        <Link to="/series" className={isActive("/series")}>Séries</Link>
                    </li>
                    <li>
                        <Link to="/favoris" className={isActive("/favoris")}>Favoris</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;