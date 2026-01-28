import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

export function useMovieData(id, type = 'movie') {
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    // 1. NOUVEAU : On stocke les avis de l'API
    const [apiReviews, setApiReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // 2. On ajoute l'appel aux reviews
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

                // 3. On sauvegarde les avis API
                setApiReviews(dataReviews.results || []);

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

    // 4. On retourne apiReviews pour l'utiliser dans la page Detail
    return { movie, recommendations, trailerKey, loading, error, apiReviews };
}