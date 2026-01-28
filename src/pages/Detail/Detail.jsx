import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrl } from '../../utils/api';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import './Detail.css';

export const Detail = () => { // On renomme DetailsDesktop en Detail pour rester cohérent
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]); // Pour les suggestions
    const [isFavorite, setIsFavorite] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    // 1. Chargement des données (Film + Suggestions)
    useEffect(() => {
        const fetchData = async () => {
            // Info du film
            const resMovie = await fetch(getUrl(`/movie/${id}`));
            const dataMovie = await resMovie.json();
            setMovie(dataMovie);
            checkFavorite(dataMovie.id);

            // Suggestions
            const resRec = await fetch(getUrl(`/movie/${id}/recommendations`));
            const dataRec = await resRec.json();
            setRecommendations(dataRec.results ? dataRec.results.slice(0, 6) : []); // On en garde 6 max

            const resVideo = await fetch(getUrl(`/movie/${id}/videos`));
            const dataVideo = await resVideo.json();

            // On cherche une vidéo qui est un "Trailer" et qui vient de "YouTube"
            const officialTrailer = dataVideo.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
            if(officialTrailer) {
                setTrailerKey(officialTrailer.key);
            } else {
                setTrailerKey(null);
            }
        };

        fetchData();
        window.scrollTo(0, 0); // Remonte en haut de page quand on change de film
    }, [id]);

    // Gestion des favoris (identique à avant)
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
    const year = movie.release_date?.substring(0, 4);
    const duration = `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}`;
    const genre = movie.genres?.[0]?.name;

    return (
        <div className="detail-page">

            {/* Fond d'écran (Remplace le "rectangle" de Figma) */}
            <div className="detail-background" style={{ backgroundImage: `url(${bgImage})` }}></div>

            <div className="detail-container">

                {/* --- PARTIE HAUTE (Similaire à ton frame-2 Figma) --- */}
                <div className="detail-content">
                    <img className="detail-poster" alt={movie.title} src={posterImage} />

                    <div className="detail-infos">
                        <h1 className="detail-title">{movie.title.toUpperCase()}</h1>

                        <p className="detail-meta">
                            {year} • {genre} • {duration}
                        </p>

                        <div className="detail-rating">⭐ {movie.vote_average.toFixed(1)}/10</div>

                        <div className="detail-actions">
    {/* 1. Bouton Lecture (Principal) */}
    {/* Comme on n'a pas le film, on met une petite alerte pour l'instant */}
    <Button 
        type="primary" 
        onClick={() => alert("Désolé, le film n'est pas disponible en streaming gratuit !")}
    >
        ▶ Lecture
    </Button>

    {/* 2. Bouton Bande-annonce (Secondaire) */}
    {/* J'ajoute une classe 'btn-trailer' pour changer sa couleur en gris */}
    <div className="btn-trailer-wrapper">
         <Button 
            className="btn-trailer"
            onClick={() => document.querySelector('.trailer-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
            📺 Bande-annonce
        </Button>
    </div>

    {/* 3. Bouton Favoris */}
    <div onClick={toggleFavorite} className="btn-favorite-wrapper">
        <FavoriteButton movie={movie} />
    </div>
</div>

                        <p className="detail-overview">{movie.overview}</p>
                    </div>
                </div>

            {trailerKey && (
                <div className="trailer-section">
                    <h3 className="section-title">Bande-annonce</h3>
                        <div className="video-responsive">
                         <iframe 
                src={`https://www.youtube.com/embed/${trailerKey}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                        ></iframe>
                    </div>
                </div>
                )}
                

                {/* --- PARTIE SUGGESTIONS (Ton frame-6 Figma) --- */}
                {recommendations.length > 0 && (
                    <div className="suggestions-section">
                        <h3 className="suggestions-title">Suggestions</h3>
                        <div className="suggestions-list">
                            {/* On remplace les <img movieCard> statiques par un map */}
                            {recommendations.map(rec => (
                                <MovieCard key={rec.id} movie={rec} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Detail;