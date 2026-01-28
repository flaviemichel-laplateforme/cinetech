import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import BtnReturn from '../../components/BtnReturn/BtnReturn';
// 1. On importe le Hook
import { useMovieData } from '../../hooks/useMovieData';
import './Detail.css';

export const Detail = () => {
    const { id, type } = useParams();

    // 2. On utilise le Hook en lui passant l'ID et le TYPE (movie ou tv)
    // Le hook fait tout le travail sale (fetch, tri, chargement...)
    const { movie, recommendations, trailerKey, loading } = useMovieData(id, type || 'movie');

    // États locaux (juste pour l'UI : Modal et Favoris)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initialisation lazy du favori (pour éviter de lire le localStorage à chaque rendu)
    const [isFavorite, setIsFavorite] = useState(() => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        return favs.some(f => f.id === Number(id));
    });

    // --- Gestion des Favoris ---
    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            favorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            favorites.push(movie);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    // --- Gestion du chargement et erreurs ---
    if (loading) return <div className="loading">Chargement...</div>;
    if (!movie) return <div className="error">Contenu introuvable</div>;

    // --- Préparation des données d'affichage ---
    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Gestion intelligente Films vs Séries
    const title = movie.title || movie.name;
    const year = (movie.release_date || movie.first_air_date)?.substring(0, 4);
    const duration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}` : null;
    const genre = movie.genres?.[0]?.name;

    return (
        <div className="detail-page">
            <div className="detail-background" style={{ backgroundImage: `url(${bgImage})` }}></div>

            <BtnReturn />

            <div className="detail-container">
                <div className="detail-content">
                    <img className="detail-poster" alt={title} src={posterImage} />

                    <div className="detail-infos">
                        <h1 className="detail-title">{title.toUpperCase()}</h1>

                        <p className="detail-meta">
                            {year} • {genre} {duration && `• ${duration}`}
                        </p>

                        <div className="detail-rating">⭐ {movie.vote_average?.toFixed(1)}/10</div>

                        <div className="detail-actions">
                            <Button
                                type="primary"
                                onClick={() => alert("Désolé, le contenu n'est pas disponible en streaming gratuit !")}
                            >
                                ▶ Lecture
                            </Button>

                            {trailerKey && (
                                <div className="btn-trailer-wrapper">
                                    <Button className="btn-trailer" onClick={() => setIsModalOpen(true)}>
                                        📺 Bande-annonce
                                    </Button>
                                </div>
                            )}

                            <div onClick={toggleFavorite} className="btn-favorite-wrapper">
                                <FavoriteButton movie={movie} />
                            </div>
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>

                {/* Section Suggestions */}
                {recommendations.length > 0 && (
                    <div className="suggestions-section">
                        <h3 className="suggestions-title">Suggestions</h3>
                        <div className="suggestions-list">
                            {recommendations.map(rec => (
                                <MovieCard key={rec.id} movie={rec} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Trailer */}
            {isModalOpen && trailerKey && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
                        <h2 className="modal-title">Bande-annonce</h2>
                        <div className="video-responsive">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;