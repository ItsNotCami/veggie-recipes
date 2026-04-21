import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🌿</span>
          <span className="navbar__logo-text">Verde</span>
        </Link>
        <div className="navbar__links">
          <button className="navbar__cta" onClick={() => navigate('/')}>
            Browse Recipes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
