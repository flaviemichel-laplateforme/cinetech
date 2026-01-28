import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Search.css';

const Search = () => {
    // 1. On récupère le paramètre "q" dans l'URL
    const searchParams = new URLSearchParams(useLocation().search);
    const query = searchParams.get("q");

    // 2. On appelle l'API "multi" (Films + Séries)
    const { data, loading } = useFetch(`/search/multi?query=${query}`);

    // 3. On filtre pour ne garder que Films et Séries (pas les acteurs)
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