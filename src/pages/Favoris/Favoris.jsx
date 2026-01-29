import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Favoris.css';

const Favoris = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(saved);
    }, []);

    const clearFavorites = () => {
        if (window.confirm("Voulez-vous vraiment supprimer tous vos favoris ?")) {
            localStorage.removeItem("favorites");
            setFavorites([]);
        }
    };

    return (
        <div className="favoris-page">
            <div className="favoris-header">
                <h1>Ma Liste ({favorites.length})</h1>
                {favorites.length > 0 && (
                    <button onClick={clearFavorites} className="btn-clear">
                        Tout supprimer
                    </button>
                )}
            </div>

            {favorites.length > 0 ? (
                <div className="favoris-grid">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="fav-card-wrapper">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <span className="empty-icon">📂</span>
                    <h2>Votre liste est vide</h2>
                    <p>Vous n'avez pas encore ajouté de films ou de séries.</p>
                    <Link to="/" className="btn-explore">Explorer le catalogue</Link>
                </div>
            )}
        </div>
    );
};

export default Favoris;