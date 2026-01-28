import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrl } from '../../utils/api';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import './Detail.css';
// 1. L'import est bien là
import BtnReturn from '../../components/BtnReturn/BtnReturn';

export const Detail = () => {
    const { id, type } = useParams();
    const mediaType = type || 'movie'; // Par défaut 'movie' pour la rétrocompatibilité
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Chargement des données
    useEffect(() => {
        const fetchData = async () => {
            // Info du film/série
            const resMovie = await fetch(getUrl(`/${mediaType}/${id}`));
            const dataMovie = await resMovie.json();
            setMovie(dataMovie);
            checkFavorite(dataMovie.id);

            // Suggestions
            const resRec = await fetch(getUrl(`/${mediaType}/${id}/recommendations`));
            const dataRec = await resRec.json();
            setRecommendations(dataRec.results ? dataRec.results.slice(0, 6) : []);

            // Vidéos (Trailer)
            const resVideo = await fetch(getUrl(`/${mediaType}/${id}/videos`));
            const dataVideo = await resVideo.json();

            const officialTrailer = dataVideo.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
            if (officialTrailer) {
                setTrailerKey(officialTrailer.key);
            } else {
                setTrailerKey(null);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id, mediaType]);

    // Gestion des favoris
    const checkFavorite = (movieId) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some(fav => fav.id === movieId));
    };

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

    if (!movie) return <div className="loading">Chargement...</div>;

    // Variables pour l'affichage
    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Séries TV utilisent 'first_air_date', films utilisent 'release_date'
    const year = (movie.release_date || movie.first_air_date)?.substring(0, 4);

    // Séries n'ont pas toujours 'runtime', on l'affiche seulement si disponible
    const duration = movie.runtime ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}` : null;
    const genre = movie.genres?.[0]?.name;

    // Titre : films ont 'title', séries ont 'name'
    const title = movie.title || movie.name;

    return (
        <div className="detail-page">

            {/* Fond d'écran */}
            <div className="detail-background" style={{ backgroundImage: `url(${bgImage})` }}></div>

            {/* 2. AJOUT DU BOUTON RETOUR ICI (C'est ce qui manquait) */}
            <BtnReturn />

            <div className="detail-container">

                <div className="detail-content">
                    <img className="detail-poster" alt={title} src={posterImage} />

                    <div className="detail-infos">
                        <h1 className="detail-title">{title.toUpperCase()}</h1>

                        <p className="detail-meta">
                            {year} • {genre}{duration ? ` • ${duration}` : ''}
                        </p>

                        <div className="detail-rating">⭐ {movie.vote_average.toFixed(1)}/10</div>

                        <div className="detail-actions">
                            {/* Bouton Lecture */}
                            <Button
                                type="primary"
                                onClick={() => alert("Désolé, le film n'est pas disponible en streaming gratuit !")}
                            >
                                ▶ Lecture
                            </Button>

                            {/* Bouton Bande-annonce (Ouvre la modale) */}
                            {trailerKey && (
                                <div className="btn-trailer-wrapper">
                                    <Button
                                        className="btn-trailer"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        📺 Bande-annonce
                                    </Button>
                                </div>
                            )}

                            {/* Bouton Favoris */}
                            <div onClick={toggleFavorite} className="btn-favorite-wrapper">
                                <FavoriteButton movie={movie} />
                            </div>
                        </div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>

                {/* Suggestions */}
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

            {/* Modal pour la bande-annonce */}
            {isModalOpen && trailerKey && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                            ✕
                        </button>
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