import './Button.css';

// Props :
// - type : 'primary', 'secondary', ou 'circle'
// - icon : une petite icône (optionnel)
// - onClick : la fonction à lancer au clic
// - children : le texte du bouton
const Button = ({ type = 'primary', icon, onClick, children }) => {
    return (
        <button className={`btn btn-${type}`} onClick={onClick}>
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;