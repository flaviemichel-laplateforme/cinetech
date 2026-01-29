const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

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