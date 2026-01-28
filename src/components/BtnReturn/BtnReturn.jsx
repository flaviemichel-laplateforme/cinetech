import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './BtnReturn.css';

const BtnReturn = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <button className="btn-return" onClick={handleReturn}>
            <IoArrowBack className="btn-return-icon" />
            <span className="btn-return-text">Retour</span>
        </button>
    );
};

export default BtnReturn;
