import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../MovieCard/MovieCard';
import './Row.css';

const Row = ({ title, endpoint, type = 'movie' }) => {
    const { data, loading, error } = useFetch(endpoint);

    const items = data?.results || [];

    if (loading) return <div className="row-loading">Chargement {title}...</div>;
    if (error) return null;

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