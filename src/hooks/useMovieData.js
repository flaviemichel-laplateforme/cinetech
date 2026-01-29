import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

/**
 * Hook pour charger toutes les données d'un film/série
 * Effectue 4 appels API en parallèle pour optimiser les performances
 * @param {string|number} id - ID du média dans TMDB
 * @param {string} type - Type de média ('movie' ou 'tv')
 * @returns {Object} { movie, recommendations, trailerKey, loading, error, apiReviews }
 */
export function useMovieData(id, type = 'movie') {
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [apiReviews, setApiReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Appels API parallèles pour réduire le temps de chargement
                const [resMovie, resRecs, resVideos, resReviews] = await Promise.all([
                    fetch(getUrl(`/${type}/${id}`)),
                    fetch(getUrl(`/${type}/${id}/recommendations`)),
                    fetch(getUrl(`/${type}/${id}/videos`)),
                    fetch(getUrl(`/${type}/${id}/reviews`))
                ]);

                if (!resMovie.ok) throw new Error("Erreur chargement média");

                const dataMovie = await resMovie.json();
                const dataRecs = await resRecs.json();
                const dataVideos = await resVideos.json();
                const dataReviews = await resReviews.json();

                setMovie(dataMovie);
                setRecommendations(dataRecs.results ? dataRecs.results.slice(0, 6) : []);

                setApiReviews(dataReviews.results || []);

                // Recherche de la bande-annonce officielle YouTube
                const officialTrailer = dataVideos.results?.find(
                    vid => vid.type === "Trailer" && vid.site === "YouTube"
                );
                setTrailerKey(officialTrailer ? officialTrailer.key : null);

            } catch (err) {
                console.error("Erreur hook detail :", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAllData();
            window.scrollTo(0, 0);
        }
    }, [id, type]);

    return { movie, recommendations, trailerKey, loading, error, apiReviews };
}