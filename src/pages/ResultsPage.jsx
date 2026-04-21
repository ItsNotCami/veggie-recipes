import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import Loader from '../components/Loader';
import { useRecipes } from '../context/RecipeContext';
import { searchRecipes } from '../services/api';
import './ResultsPage.css';

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { state, dispatch } = useRecipes();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (q) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await searchRecipes(q);
      dispatch({ type: 'SET_RECIPES', payload: data.results });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong. Please try again.' });
    }
  };

  const handleSearch = (newQuery) => {
    dispatch({ type: 'SET_QUERY', payload: newQuery });
    navigate(`/results?q=${encodeURIComponent(newQuery)}`);
  };

  return (
    <main className="results container">
      <div className="results__header">
        <button className="results__back" onClick={() => navigate('/')}>
          ← Back
        </button>
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>

      {state.loading && <Loader />}

      {!state.loading && !state.error && (
        <>
          <p className="results__count">
            {state.recipes.length > 0
              ? `${state.recipes.length} vegetarian recipes for "${query}"`
              : `No results for "${query}"`}
          </p>
          {state.recipes.length > 0
            ? <RecipeList recipes={state.recipes} />
            : (
              <div className="results__empty">
                <span>🥗</span>
                <p>Try a different search term — e.g. "pasta", "curry", "salad"</p>
              </div>
            )}
        </>
      )}

      {state.error && <p className="results__error">{state.error}</p>}
    </main>
  );
};

export default ResultsPage;
