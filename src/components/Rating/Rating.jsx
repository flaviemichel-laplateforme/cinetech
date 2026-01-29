import './Rating.css';

const Rating = ({ rating }) => {
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