import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

export function useMovieData(id, type = 'movie') {
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // On utilise le 'type' dynamique (movie ou tv) dans les URLs
                const [resMovie, resRecs, resVideos] = await Promise.all([
                    fetch(getUrl(`/${type}/${id}`)),
                    fetch(getUrl(`/${type}/${id}/recommendations`)),
                    fetch(getUrl(`/${type}/${id}/videos`))
                ]);

                if (!resMovie.ok) throw new Error("Erreur chargement média");

                const dataMovie = await resMovie.json();
                const dataRecs = await resRecs.json();
                const dataVideos = await resVideos.json();

                setMovie(dataMovie);
                // On garde 6 suggestions
                setRecommendations(dataRecs.results ? dataRecs.results.slice(0, 6) : []);

                // Recherche du trailer Youtube
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
    }, [id, type]); // On recharge si l'ID ou le TYPE change

    return { movie, recommendations, trailerKey, loading, error };
}