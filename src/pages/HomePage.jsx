import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import Loader from '../components/Loader';
import { useRecipes } from '../context/RecipeContext';
import { getRandomRecipes } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = useRecipes();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.recipes.length === 0) {
      loadRandom();
    }
  }, []);

  const loadRandom = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await getRandomRecipes(12);
      dispatch({ type: 'SET_RECIPES', payload: data.recipes });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load recipes. Check your API key.' });
    }
  };

  const handleSearch = (query) => {
    dispatch({ type: 'SET_QUERY', payload: query });
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg" aria-hidden="true">
          <span>🥦</span><span>🍅</span><span>🌽</span>
          <span>🥕</span><span>🫑</span><span>🥑</span>
        </div>
        <div className="container home__hero-content">
          <p className="home__eyebrow">100% Vegetarian</p>
          <h1 className="home__title">
            Discover <em>beautiful</em><br />plant-based recipes
          </h1>
          <p className="home__subtitle">
            Thousands of vegetarian dishes — from quick weeknight dinners to weekend feasts.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Random recipes */}
      <section className="home__featured container">
        <div className="home__section-header">
          <h2 className="home__section-title">Today's Picks</h2>
          <button className="home__refresh" onClick={loadRandom}>
            ↻ Refresh
          </button>
        </div>

        {state.loading && <Loader />}
        {state.error && <p className="home__error">{state.error}</p>}
        {!state.loading && !state.error && <RecipeList recipes={state.recipes} />}
      </section>
    </main>
  );
};

export default HomePage;
