import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../utils/api';
import './Catalogue.css';

function Catalogue({ category }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    // 1. NOUVEAU : État de chargement (vrai par défaut au début)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCatalogue = async () => {
            // 2. NOUVEAU : On dit qu'on commence à charger (utile quand on change de page)
            setIsLoading(true);

            try {
                const response = await fetch(getUrl(`/discover/${category}`, { page }));
                const data = await response.json();

                setItems(data.results);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Erreur catalogue :", error);
            } finally {
                // 3. NOUVEAU : Quoi qu'il arrive (réussite ou erreur), on arrête le chargement
                setIsLoading(false);
            }
        };

        fetchCatalogue();
    }, [category, page]);

    const handleNext = () => setPage(page + 1);
    const handlePrev = () => setPage(page > 1 ? page - 1 : 1);

    return (
        <div className="catalogue-page">
            <h1 className="catalogue-title">
                {category === "movie" ? "Tous les Films" : "Toutes les Séries"} - Page {page}
            </h1>

            {/* 4. NOUVEAU : Affichage conditionnel */}
            {isLoading ? (
                // Si ça charge, on montre la roue
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                // Sinon, on montre la grille et la pagination normalement
                <>
                    <div className="catalogue-grid">
                        {items.map((item) => (
                            <Link to={`/detail/${item.id}`} key={item.id} className="card-link">
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