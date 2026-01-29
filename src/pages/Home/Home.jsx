import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Button from '../../components/Button/Button';
import Row from '../../components/Row/Row';
import './Home.css';

function Home() {
    const { data: heroData, loading: heroLoading } = useFetch("/movie/671");

    if (heroLoading) return <div className="loading">Chargement...</div>;

    const heroMovie = heroData;
    if (!heroMovie) return null;

    const bgImage = `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`;

    return (
        <div className="home-container">
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
                            <Link to={`/detail/${heroMovie.id}/movie`}>
                                <Button type="primary">▶ Lecture</Button>
                            </Link>
                            <Link to={`/detail/${heroMovie.id}/movie`}>
                                <Button type="secondary">Plus d'infos</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hero-fade-bottom"></div>
            </div>

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