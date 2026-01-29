const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Construit une URL complète pour l'API TMDB avec les paramètres nécessaires
 * @param {string} endpoint - Chemin de l'endpoint (ex: '/movie/popular')
 * @param {Object} params - Paramètres supplémentaires (ex: { page: 2 })
 * @returns {string} URL complète avec clé API et langue française
 */
const getUrl = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'fr-FR');

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    return url.toString();
};

export { API_KEY, getUrl };