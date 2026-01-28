import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    // Sécuriser le titre (Movies ont 'title', Series ont 'name')
    const title = movie.title || movie.name;
    const mediaType = movie.title ? 'movie' : 'tv';

    return (
        <Link to={`/detail/${mediaType}/${movie.id}`} className="card" title={title}>
            <img src={imgUrl} alt={title} className="card-image" loading="lazy" />
            <p className="card-title">{title}</p>
        </Link>
    );
};

export default MovieCard;