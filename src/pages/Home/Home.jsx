import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '../../utils/api';
// On importe tes composants "Pro"
import MovieCard from '../../components/MovieCard/MovieCard';
import Button from '../../components/Button/Button';
import './Home.css';

function Home() {
    const [heroMovie, setHeroMovie] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);

                // 1. On fixe HARRY POTTER (ID 671) pour le Hero
                const resHero = await fetch(getUrl("/movie/671"));
                const dataHero = await resHero.json();
                setHeroMovie(dataHero);

                // 2. Les listes
                const resMovies = await fetch(getUrl("/movie/popular"));
                const dataMovies = await resMovies.json();
                setPopularMovies(dataMovies.results || []);

                const resSeries = await fetch(getUrl("/tv/popular"));
                const dataSeries = await resSeries.json();
                setPopularSeries(dataSeries.results || []);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    if (loading) return <div style={{ padding: '20px' }}>Chargement...</div>;

    // Image de fond
    const heroImage = heroMovie ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}` : '';

    return (
        <div className="home-container">

            {/* --- HERO SECTION (Directement dans la page) --- */}
            {heroMovie && (
                <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1 className="hero-title">{heroMovie.title.toUpperCase()}</h1>

                            <p className="hero-infos">
                                {heroMovie.release_date?.substring(0, 4)} • Fantastique • {heroMovie.vote_average.toFixed(1)}/10
                            </p>

                            <p className="hero-overview">{heroMovie.overview}</p>

                            <div className="hero-buttons">
                                {/* On utilise ton composant Button ici ! */}
                                <Link to={`/detail/${heroMovie.id}`}>
                                    <Button type="primary">▶ Lecture</Button>
                                </Link>
                                <Link to={`/detail/${heroMovie.id}`}>
                                    <Button type="secondary">Plus d'infos</Button>
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
                        // On utilise ton composant MovieCard ici !
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