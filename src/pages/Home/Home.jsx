import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../utils/api';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.css';

function Home() {
    // On ajoute un state pour le film "Hero" spécifique
    const [heroMovie, setHeroMovie] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);

                // 1. On récupère HARRY POTTER (ID 671) pour l'affiche principale
                const resHero = await fetch(getUrl("/movie/671"));
                const dataHero = await resHero.json();
                setHeroMovie(dataHero);

                // 2. Films Populaires (pour la liste du bas)
                const resMovies = await fetch(getUrl("/movie/popular"));
                const dataMovies = await resMovies.json();
                setPopularMovies(dataMovies.results || []);

                // 3. Séries Populaires
                const resSeries = await fetch(getUrl("/tv/popular"));
                const dataSeries = await resSeries.json();
                setPopularSeries(dataSeries.results || []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    if (loading) return <div style={{ padding: '20px' }}>Chargement...</div>;
    if (error) return <div style={{ color: 'red' }}>Erreur: {error}</div>;

    // Image de fond pour le Hero
    const heroImage = heroMovie ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}` : '';

    return (
        <div className="home-container">

            {/* --- HERO SECTION (Harry Potter) --- */}
            {heroMovie && (
                <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                    <div className="hero-overlay">
                        <div className="hero-content">
                            {/* Titre en Majuscules */}
                            <h1 className="hero-title">{heroMovie.title.toUpperCase()}</h1>

                            {/* Infos techniques (Année - Genre) */}
                            <p className="hero-infos">
                                {heroMovie.release_date?.substring(0, 4)} • Fantastique • {heroMovie.vote_average}/10
                            </p>

                            {/* Synopsis centré */}
                            <p className="hero-overview">{heroMovie.overview}</p>

                            {/* Boutons centrés */}
                            <div className="hero-buttons">
                                <Link to={`/detail/${heroMovie.id}`} className="btn btn-red">
                                    ▶ Lecture
                                </Link>
                                <Link to={`/detail/${heroMovie.id}`} className="btn btn-grey">
                                    Plus d'infos...
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LISTE FILMS --- */}
            <section className="category-section">
                <h2 className="category-title">Films Populaires</h2>
                <div className="horizontal-scroll">
                    {popularMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            {/* --- LISTE SÉRIES --- */}
            <section className="category-section">
                <h2 className="category-title">Séries du moment</h2>
                <div className="horizontal-scroll">
                    {popularSeries.map((serie) => (
                        <MovieCard key={serie.id} movie={serie} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;