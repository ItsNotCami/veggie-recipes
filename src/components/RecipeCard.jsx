import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/recipe/${recipe.id}`);

  return (
    <article className="recipe-card" onClick={handleClick}>
      <div className="recipe-card__img-wrap">
        <img
          className="recipe-card__img"
          src={recipe.image || 'https://via.placeholder.com/312x231?text=No+Image'}
          alt={recipe.title}
          loading="lazy"
        />
        <span className="recipe-card__badge">🌿 Vegetarian</span>
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <span className="recipe-card__cta">View Recipe →</span>
      </div>
    </article>
  );
};

export default RecipeCard;
