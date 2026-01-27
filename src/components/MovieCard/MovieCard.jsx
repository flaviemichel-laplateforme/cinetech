import React from "react";
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const imgBaseUrl = "https://image.tmdb.org/t/p/w300";
    const title = movie.title || movie.name;

    return (
        // On met le nom de la classe entre guillemets string classique
        <div className="card">
            <Link to={`/detail/${movie.id}`}>
                <img
                    src={movie.poster_path ? `${imgBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
                    alt={title}
                    className="card-image"
                />
                <p className="card-title">{title}</p>
            </Link>
        </div>
    );
};

export default MovieCard;