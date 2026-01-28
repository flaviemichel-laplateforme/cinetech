import { Link } from 'react-router-dom';
// 1. On importe nos hooks et composants
import { useFetch } from '../../hooks/useFetch';
import Button from '../../components/Button/Button';
import Row from '../../components/Row/Row'; // <--- Notre nouveau composant
import './Home.css';

function Home() {
    // 2. On récupère le film Hero (Harry Potter id: 671) via le Hook
    const { data: heroData, loading: heroLoading } = useFetch("/movie/671");

    // Si ça charge, on affiche un petit message
    if (heroLoading) return <div className="loading">Chargement...</div>;

    // On sécurise l'objet hero
    const heroMovie = heroData;
    if (!heroMovie) return null;

    // Image de fond
    const bgImage = `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`;

    return (
        <div className="home-container">

            {/* --- HERO SECTION --- */}
            <div className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">{heroMovie.title.toUpperCase()}</h1>

                        <p className="hero-infos">
                            {heroMovie.release_date?.substring(0, 4)} • Note : {heroMovie.vote_average?.toFixed(1)}/10
                        </p>

                        <p className="hero-overview">
                            {heroMovie.overview ? heroMovie.overview.substring(0, 200) + "..." : "Description non disponible."}
                        </p>

                        <div className="hero-buttons">
                            {/* Lien vers le détail (type="movie" car c'est un film) */}
                            <Link to={`/detail/${heroMovie.id}/movie`}>
                                <Button type="primary">▶ Lecture</Button>
                            </Link>
                            <Link to={`/detail/${heroMovie.id}/movie`}>
                                <Button type="secondary">Plus d'infos</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Dégradé vers le bas pour fondre avec les listes */}
                <div className="hero-fade-bottom"></div>
            </div>

            {/* --- LES RANGÉES (ROWS) --- */}
            {/* Regarde comme c'est facile d'ajouter des catégories maintenant ! */}

            <div className="rows-container">
                <Row title="Films Populaires" endpoint="/movie/popular" type="movie" />
                <Row title="Séries du moment" endpoint="/tv/popular" type="tv" />

                <Row title="Les Mieux Notés" endpoint="/movie/top_rated" type="movie" />
                <Row title="Films d'Action" endpoint="/discover/movie?with_genres=28" type="movie" />
                <Row title="Comédies" endpoint="/discover/movie?with_genres=35" type="movie" />
            </div>

        </div>
    );
}

export default Home;