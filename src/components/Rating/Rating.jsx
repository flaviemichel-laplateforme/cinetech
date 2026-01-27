import './Rating.css';

const Rating = ({ rating }) => {
    // L'API renvoie une note sur 10 (ex: 8.4), on la convertit sur 5 pour l'affichage
    const scoreOnFive = (rating / 2).toFixed(1);

    return (
        <div className="rating-container">
            <span className="star-icon">★</span>
            <span className="rating-score">{scoreOnFive}</span>
            <span style={{ color: '#888' }}>/ 5</span>
        </div>
    );
};

export default Rating;