import { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. On importe le Hook
import { useFetch } from '../../hooks/useFetch';
import './Catalogue.css';

function Catalogue({ category }) {
    const [page, setPage] = useState(1);


    // Le hook gère le chargement, les erreurs et le fetch tout seul.
    // On passe { page } en deuxième argument pour la pagination.
    const { data, loading, error } = useFetch(`/discover/${category}`, { page });

    // 3. On récupère les films/séries depuis 'data' (avec une sécurité si c'est vide)
    const items = data?.results || [];

    const handleNext = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        setPage(page > 1 ? page - 1 : 1);
        window.scrollTo(0, 0);
    };

    // Gestion d'erreur simple
    if (error) return <div className="error">Une erreur est survenue : {error}</div>;

    return (
        <div className="catalogue-page">
            <h1 className="catalogue-title">
                {category === "movie" ? "Tous les Films" : "Toutes les Séries"} - Page {page}
            </h1>

            {/* 4. On utilise la variable 'loading' qui vient directement du hook */}
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="catalogue-grid">
                        {items.map((item) => (
                            // Note : Je garde ton format de lien avec category
                            <Link to={`/detail/${category}/${item.id}`} key={item.id} className="card-link">
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
                        <button onClick={handlePrev} disabled={page === 1}>
                            ← Précédent
                        </button>
                        <span className="page-number">{page}</span>
                        <button onClick={handleNext}>
                            Suivant →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Catalogue;