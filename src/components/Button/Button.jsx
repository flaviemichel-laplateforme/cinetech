import './Button.css';

const Button = ({ type = 'primary', icon, onClick, children }) => {
    return (
        <button className={`btn btn-${type}`} onClick={onClick}>
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;