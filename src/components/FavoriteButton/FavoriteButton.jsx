import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './FavoriteButton.css';

const FavoriteButton = ({ movie }) => {
    const [isFav, setIsFav] = useState(false);

    // 1. Au chargement, on vérifie si ce film est DÉJÀ dans les favoris
    useEffect(() => {
        if (!movie) return;
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        // On regarde si un film avec le même ID existe
        const found = favorites.some(fav => fav.id === movie.id);
        setIsFav(found);
    }, [movie]);

    // 2. Fonction qui s'active au clic
    const handleToggle = (e) => {
        // Empêche le clic de se propager (ex: si le bouton est dans une carte cliquable)
        e.preventDefault();
        e.stopPropagation();

        // Vérification de la connexion utilisateur
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Connectez-vous pour ajouter aux favoris !", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFav) {
            // SI FAVORI -> ON RETIRE
            favorites = favorites.filter(fav => fav.id !== movie.id);
            toast.success("Retiré des favoris", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            // SI PAS FAVORI -> ON AJOUTE
            favorites.push(movie);
            toast.success("Ajouté aux favoris", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        // Sauvegarde et mise à jour de l'état visuel
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFav(!isFav);
    };

    if (!movie) return null;

    return (
        <button
            className={`fav-btn ${isFav ? 'active' : ''}`}
            onClick={handleToggle}
            title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <span className="fav-icon">
                {isFav ? '❤️' : '🤍'}
                {/* Tu peux remplacer ces émojis par des <img src={heartIcon} /> plus tard */}
            </span>
        </button>
    );
};

export default FavoriteButton;