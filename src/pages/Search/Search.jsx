import { useLocation, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Search.css';

const Search = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const query = searchParams.get("q");

    const { data, loading } = useFetch(`/search/multi?query=${query}`);

    const items = data?.results?.filter(item => item.media_type === 'movie' || item.media_type === 'tv') || [];

    return (
        <div className="search-page">
            <h1 className="search-title">Résultats pour : "{query}"</h1>

            {loading ? (
                <div className="loading">Chargement...</div>
            ) : items.length > 0 ? (
                <div className="search-grid">
                    {items.map(item => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </div>
            ) : (
                <div className="no-results">Aucun résultat trouvé 😕</div>
            )}
        </div>
    );
};

export default Search;