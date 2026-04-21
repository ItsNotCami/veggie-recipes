import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getRecipeById } from '../services/api';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Could not load this recipe.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="detail-wrap"><Loader /></div>;
  if (error) return <div className="detail-wrap detail__error">{error}</div>;
  if (!recipe) return null;

  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <main className="detail-wrap">
      {/* Hero image */}
      <div className="detail__hero">
        <img
          className="detail__hero-img"
          src={recipe.image}
          alt={recipe.title}
        />
        <div className="detail__hero-overlay" />
        <div className="detail__hero-content container">
          <button className="detail__back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1 className="detail__title">{recipe.title}</h1>
          <div className="detail__meta">
            {recipe.readyInMinutes && (
              <span className="detail__meta-item">⏱ {recipe.readyInMinutes} min</span>
            )}
            {recipe.servings && (
              <span className="detail__meta-item">🍽 {recipe.servings} servings</span>
            )}
            {recipe.vegetarian && (
              <span className="detail__meta-item detail__meta-item--green">🌿 Vegetarian</span>
            )}
            {recipe.vegan && (
              <span className="detail__meta-item detail__meta-item--green">🌱 Vegan</span>
            )}
            {recipe.glutenFree && (
              <span className="detail__meta-item">🌾 Gluten Free</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="detail__body container">
        <div className="detail__grid">

          {/* Ingredients */}
          <section className="detail__card">
            <h2 className="detail__section-title">Ingredients</h2>
            <ul className="detail__ingredients">
              {recipe.extendedIngredients?.map((ing) => (
                <li key={ing.id} className="detail__ingredient">
                  <span className="detail__ingredient-amount">
                    {ing.measures?.metric?.amount > 0
                      ? `${Math.round(ing.measures.metric.amount * 10) / 10} ${ing.measures.metric.unitShort}`
                      : ''}
                  </span>
                  <span className="detail__ingredient-name">{ing.name}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className="detail__card">
            <h2 className="detail__section-title">Instructions</h2>
            {instructions.length > 0 ? (
              <ol className="detail__steps">
                {instructions.map((step) => (
                  <li key={step.number} className="detail__step">
                    <span className="detail__step-num">{step.number}</span>
                    <p>{step.step}</p>
                  </li>
                ))}
              </ol>
            ) : recipe.instructions ? (
              <div
                className="detail__instructions-raw"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p className="detail__no-instructions">
                No instructions available.{' '}
                {recipe.sourceUrl && (
                  <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                    View original recipe →
                  </a>
                )}
              </p>
            )}
          </section>

        </div>

        {/* Source link */}
        {recipe.sourceUrl && (
          <div className="detail__source">
            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer" className="detail__source-link">
              View original recipe on {recipe.sourceName || 'source'} ↗
            </a>
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipeDetailPage;
