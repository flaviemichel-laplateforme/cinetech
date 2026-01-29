import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Ajout de useParams
import { useFetch } from '../../hooks/useFetch';
import './Catalogue.css';

function Catalogue() {
    // 1. On récupère le paramètre "type" directement depuis l'URL (ex: /films/movie -> type = "movie")
    const { type } = useParams();

    // Sécurité : si jamais le type est vide, on met 'movie' par défaut
    const category = type || 'movie';

    const [page, setPage] = useState(1);

    // 2. On utilise 'category' pour l'appel API
    const { data, loading, error } = useFetch(`/discover/${category}`, { page });

    const items = data?.results || [];

    const handleNext = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        setPage(page > 1 ? page - 1 : 1);
        window.scrollTo(0, 0);
    };

    if (error) return <div className="error">Une erreur est survenue.</div>;

    return (
        <div className="catalogue-page">
            <h1 className="catalogue-title">
                {category === "movie" ? "Tous les Films" : "Toutes les Séries"}
            </h1>

            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="catalogue-grid">
                        {items.map((item) => (
                            // 3. On construit le lien vers le détail avec la bonne catégorie
                            <Link to={`/detail/${item.id}/${category}`} key={item.id} className="card-link">
                                <div className="card">
                                    {item.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt={item.title || item.name}
                                        />
                                    ) : (
                                        <div className="no-image">Pas d'image</div>
                                    )}
                                    <h3>{item.title || item.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="pagination">
                        <button onClick={handlePrev} disabled={page === 1}>← Précédent</button>
                        <span className="page-number">{page}</span>
                        <button onClick={handleNext}>Suivant →</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Catalogue;