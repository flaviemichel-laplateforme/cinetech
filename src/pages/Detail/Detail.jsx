import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import BtnReturn from '../../components/BtnReturn/BtnReturn';
import Comments from '../../components/Comments/Comments';
import { useMovieData } from '../../hooks/useMovieData';
import { FaComment } from 'react-icons/fa';
import './Detail.css';

export const Detail = () => {
    const { id, type } = useParams();
    const { movie, recommendations, trailerKey, loading, apiReviews } = useMovieData(id, type || 'movie');

    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

    if (loading) return <div className="loading">Chargement...</div>;
    if (!movie) return <div className="error">Contenu introuvable</div>;

    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title || movie.name;
    const year = (movie.release_date || movie.first_air_date)?.substring(0, 4);
    const duration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}` : null;
    const genre = movie.genres?.[0]?.name;

    const localComments = JSON.parse(localStorage.getItem(`comments_${type || 'movie'}_${id}`)) || [];
    const totalComments = (apiReviews?.length || 0) + localComments.length;

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
                                <Button className="btn-trailer" onClick={() => setIsTrailerModalOpen(true)}>
                                    Bande-annonce
                                </Button>
                            )}

                            <div
                                className="btn-icon-wrapper"
                                onClick={() => setIsCommentsModalOpen(true)}
                                title="Voir les commentaires"
                            >
                                <FaComment size={24} />
                                {totalComments > 0 && <span className="comment-count-badge">{totalComments}</span>}
                            </div>

                            <FavoriteButton movie={movie} />
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>

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

            {isCommentsModalOpen && (
                <div className="modal-overlay" onClick={() => setIsCommentsModalOpen(false)}>
                    <div className="modal-content comments-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsCommentsModalOpen(false)}>✕</button>
                        <h2 className="modal-title" style={{ marginBottom: '20px' }}>Avis & Discussions</h2>
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