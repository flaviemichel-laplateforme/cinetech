import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../MovieCard/MovieCard';
import './Row.css';

// Ce composant reçoit :
// - title : Le titre de la section (ex: "Films Populaires")
// - endpoint : L'adresse API (ex: "/movie/popular")
// - type : "movie" ou "tv" (pour construire le lien vers la page détail)
const Row = ({ title, endpoint, type = 'movie' }) => {

    // Le Hook fait tout le travail de récupération !
    const { data, loading, error } = useFetch(endpoint);

    // Sécurité si data est null
    const items = data?.results || [];

    if (loading) return <div className="row-loading">Chargement {title}...</div>;
    if (error) return null; // Si erreur, on cache la rangée discrètement

    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>

            <div className="row-posters">
                {items.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                ))}
            </div>
        </div>
    );
};

export default Row;