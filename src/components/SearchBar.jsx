import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__inner">
        <span className="search-bar__icon">🔍</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search vegetarian recipes… pasta, salad, soup"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button className="search-bar__btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
