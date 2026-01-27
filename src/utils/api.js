const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


// Petite fonction pour construire les URL facilement
// Exemple d'utilisation : getUrl("/movie/popular")
const getUrl = (endpoint) => {
    return `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR`;
};

export { getUrl };