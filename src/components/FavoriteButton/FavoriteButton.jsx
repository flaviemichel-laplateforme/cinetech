import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './FavoriteButton.css';

const FavoriteButton = ({ movie }) => {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!movie) return;
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const found = favorites.some(fav => fav.id === movie.id);
        setIsFav(found);
    }, [movie]);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

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
            favorites = favorites.filter(fav => fav.id !== movie.id);
            toast.success("Retiré des favoris", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            favorites.push(movie);
            toast.success("Ajouté aux favoris", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }

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