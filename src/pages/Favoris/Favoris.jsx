import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
// Tu pourras créer un Favorites.css plus tard pour la mise en page

function Favorites() {
    const [favorites, setFavorites] = useState([]); // On commence avec une liste vide

    useEffect(() => {

        // 1. Récupère le texte stocké dans localStorage sous la clé "favorites"
        const favoriteText = localStorage.getItem("favorites");
        // 2. Si ce texte existe, transforme-le en objet/tableau (parse)
        if (favoriteText) {
            const parseMovies = JSON.parse(favoriteText);

            setFavorites(parseMovies);

        }
        // 3. Mets à jour l'état "favorites" avec ces données

    }, []);

    return (
        <div className="favorites-container">
            <h2>Mes Films Favoris ❤️</h2>
            <div className="favorites-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {favorites.length > 0 ? (
                    favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>Aucun favori pour le moment...</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;