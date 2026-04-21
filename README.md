# 🌿 Verde – Vegetarian Recipe App

A React app to search and explore vegetarian recipes using the Spoonacular API.

## Stack
- React 18
- React Router v6
- Axios
- Context API + useReducer
- Spoonacular API

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/veggie-recipes.git
cd veggie-recipes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API key
Create a `.env` file in the root:
```
REACT_APP_SPOONACULAR_API_KEY=your_key_here
```
Get a free key at https://spoonacular.com/food-api/console

### 4. Start the app
```bash
npm start
```

## Features
- 🔍 Search vegetarian recipes (Spoonacular `complexSearch` with `diet=vegetarian`)
- 🏠 Homepage with random vegetarian picks
- 📋 Results page with recipe grid
- 📖 Detail page: ingredients, step-by-step instructions, metadata
- 📱 Fully responsive design

## Project Structure
```
src/
├── components/     # Navbar, SearchBar, RecipeCard, RecipeList, Loader
├── context/        # RecipeContext (Context API + useReducer)
├── pages/          # HomePage, ResultsPage, RecipeDetailPage
├── services/       # api.js (Axios + Spoonacular)
└── styles/         # global.css
```

## Deploy to Netlify
1. Push to GitHub
2. Connect repo on Netlify
3. Add `REACT_APP_SPOONACULAR_API_KEY` in Netlify > Site settings > Environment variables
4. Build command: `npm run build` | Publish dir: `build`
