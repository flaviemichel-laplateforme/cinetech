import { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import BtnReturn from '../../components/BtnReturn/BtnReturn';
import Comments from '../../components/Comments/Comments';
import { useMovieData } from '../../hooks/useMovieData';
// 1. Import de l'icône de commentaire
import { FaComment } from 'react-icons/fa';
import './Detail.css';

export const Detail = () => {
    const { id, type } = useParams();
    const { movie, recommendations, trailerKey, loading, apiReviews } = useMovieData(id, type || 'movie');

    // 2. ON RENOMME ET ON CRÉE DEUX ÉTATS DISTINCTS
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // Pour la vidéo
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false); // Pour les commentaires

    const [isFavorite, setIsFavorite] = useState(() => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        return favs.some(f => f.id === Number(id));
    });

    const toggleFavorite = () => {
        console.log("CLIC DÉTECTÉ ! User est :", localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            console.log("Pas de user -> Tentative de Toast Erreur"); // 👇 Mouchard
            toast.error("Connectez-vous pour ajouter aux favoris !", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            favorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            favorites.push(movie);
            toast.success("Retiré des favoris");
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (!movie) return <div className="error">Contenu introuvable</div>;

    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title || movie.name;
    const year = (movie.release_date || movie.first_air_date)?.substring(0, 4);
    const duration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}` : null;
    const genre = movie.genres?.[0]?.name;

    // On calcule le nombre total de commentaires pour l'afficher sur le bouton
    const totalComments = (apiReviews?.length || 0) + (JSON.parse(localStorage.getItem(`comments_${type || 'movie'}_${id}`))?.length || 0);

    return (
        <div className="detail-page">
            <div className="detail-background" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <BtnReturn />

            <div className="detail-container">
                <div className="detail-content">
                    <img className="detail-poster" alt={title} src={posterImage} />

                    <div className="detail-infos">
                        <h1 className="detail-title">{title.toUpperCase()}</h1>
                        <p className="detail-meta">{year} • {genre} {duration && `• ${duration}`}</p>
                        <div className="detail-rating">⭐ {movie.vote_average?.toFixed(1)}/10</div>

                        <div className="detail-actions">
                            {trailerKey && (
                                // 3. Mise à jour du onClick pour le trailer
                                <Button className="btn-trailer" onClick={() => setIsTrailerModalOpen(true)}>
                                    Bande-annonce
                                </Button>
                            )}

                            {/* 4. NOUVEAU BOUTON POUR LES COMMENTAIRES */}
                            <div
                                className="btn-icon-wrapper"
                                onClick={() => setIsCommentsModalOpen(true)}
                                title="Voir les commentaires"
                            >
                                <FaComment size={24} />
                                {/* Petit badge pour le nombre de commentaires */}
                                {totalComments > 0 && <span className="comment-count-badge">{totalComments}</span>}
                            </div>

                            <div onClick={toggleFavorite} className="btn-icon-wrapper">
                                <FavoriteButton movie={movie} />
                            </div>
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>

                {/* 🛑 J'AI RETIRÉ LE COMPOSANT <Comments /> D'ICI 🛑 */}

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

            {/* ================= MODALS ================= */}

            {/* Modal Trailer (Mis à jour avec le nouvel état) */}
            {isTrailerModalOpen && trailerKey && (
                <div className="modal-overlay" onClick={() => setIsTrailerModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsTrailerModalOpen(false)}>✕</button>
                        <div className="video-responsive">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
                                title="YouTube video player" frameBorder="0" allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. NOUVEAU : Modal Commentaires */}
            {isCommentsModalOpen && (
                <div className="modal-overlay" onClick={() => setIsCommentsModalOpen(false)}>
                    {/* On ajoute une classe spécifique 'comments-modal' pour le CSS */}
                    <div className="modal-content comments-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsCommentsModalOpen(false)}>✕</button>
                        <h2 className="modal-title" style={{ marginBottom: '20px' }}>Avis & Discussions</h2>

                        {/* LE COMPOSANT COMMENTS EST MAINTENANT ICI */}
                        <Comments
                            movieId={id}
                            type={type || 'movie'}
                            apiReviews={apiReviews || []}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;