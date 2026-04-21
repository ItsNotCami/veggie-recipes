import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  if (!recipes.length) return null;

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
