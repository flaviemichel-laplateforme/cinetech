import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Catalogue.css'; // On créera ce fichier juste après

const API_KEY = import.meta.env.VITE_API_KEY;

function Catalogue({ category }) {
    // category sera soit "movie" (pour films), soit "tv" (pour séries)

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchCatalogue = async () => {
            try {
                // On utilise l'endpoint "discover" qui est parfait pour les catalogues
                // On injecte la categorie et le numero de page
                const response = await fetch(`https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`);
                const data = await response.json();

                setItems(data.results);

                // Petit bonus : on remonte en haut de la page à chaque changement
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Erreur catalogue :", error);
            }
        };

        fetchCatalogue();
    }, [category, page]); // On recharge si la catégorie ou la page change

    // Fonctions pour la pagination
    const handleNext = () => setPage(page + 1);
    const handlePrev = () => setPage(page > 1 ? page - 1 : 1);

    return (
        <div className="catalogue-page">
            <h1 className="catalogue-title">
                {category === "movie" ? "Tous les Films" : "Toutes les Séries"} - Page {page}
            </h1>

            {/* LA GRILLE DES FILMS/SERIES */}
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

            {/* LA PAGINATION */}
            <div className="pagination">
                <button onClick={handlePrev} disabled={page === 1}>
                    ← Précédent
                </button>
                <span className="page-number">{page}</span>
                <button onClick={handleNext}>
                    Suivant →
                </button>
            </div>
        </div>
    );
}

export default Catalogue;