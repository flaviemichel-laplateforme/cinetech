import { HeroHome } from "./HeroHome";
import header from "./header.png";
import image from "./image.svg";
import movieCard2 from "./movie-card-2.svg";
import movieCard3 from "./movie-card-3.svg";
import movieCard4 from "./movie-card-4.svg";
import movieCard5 from "./movie-card-5.svg";
import movieCard6 from "./movie-card-6.svg";
import movieCard7 from "./movie-card-7.svg";
import movieCard8 from "./movie-card-8.svg";
import movieCard9 from "./movie-card-9.svg";
import movieCard10 from "./movie-card-10.svg";
import movieCard11 from "./movie-card-11.svg";
import movieCard from "./movie-card.svg";
import "./style.css";

export const HomeDesktop = () => {
    return (
        <div className="home-desktop">
            <img className="header" alt="Header" src={header} />

            <HeroHome className="hero-home-instance" />
            <div className="div">
                <div className="text-wrapper">Films Populaires</div>

                <div className="frame-2">
                    <img className="movie-card" alt="Movie card" src={movieCard6} />

                    <img className="movie-card-2" alt="Movie card" src={movieCard7} />

                    <img className="movie-card-2" alt="Movie card" src={movieCard8} />

                    <img className="movie-card-2" alt="Movie card" src={movieCard9} />

                    <img className="movie-card-2" alt="Movie card" src={movieCard10} />

                    <img className="movie-card-3" alt="Movie card" src={movieCard11} />
                </div>
            </div>

            <div className="div">
                <div className="text-wrapper">Séries populaires</div>

                <div className="frame-2">
                    <img className="movie-card" alt="Movie card" src={movieCard} />

                    <img className="movie-card-2" alt="Movie card" src={image} />

                    <img className="movie-card-4" alt="Movie card" src={movieCard2} />

                    <img className="movie-card-4" alt="Movie card" src={movieCard3} />

                    <img className="movie-card-2" alt="Movie card" src={movieCard4} />

                    <img className="movie-card-3" alt="Movie card" src={movieCard5} />
                </div>
            </div>
        </div>
    );
};
