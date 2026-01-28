import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    // Sécurité : si pas de film, on n'affiche rien
    if (!movie) return null;

    const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    // Sécuriser le titre (Movies ont 'title', Series ont 'name')
    const title = movie.title || movie.name;

    // 🛡️ LOGIQUE SÉCURISÉE POUR LE TYPE
    // 1. Si l'API donne le type, on le prend.
    // 2. Sinon, si on a un titre, c'est un film. Sinon c'est une série.
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

    return (
        // 🔴 C'EST ICI LA CORRECTION : ID d'abord, TYPE ensuite
        // Avant : to={`/detail/${mediaType}/${movie.id}`}  <-- C'était ça ton erreur
        // Après : to={`/detail/${movie.id}/${mediaType}`}  <-- C'est l'ordre correct
        <Link to={`/detail/${movie.id}/${mediaType}`} className="card" title={title}>
            <img src={imgUrl} alt={title} className="card-image" loading="lazy" />
            <p className="card-title">{title}</p>
        </Link>
    );
};

export default MovieCard;