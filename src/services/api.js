import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipes = async (query, number = 12) => {
  const response = await api.get('/complexSearch', {
    params: {
      query,
      diet: 'vegetarian',
      number,
      addRecipeInformation: false,
    },
  });
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await api.get(`/${id}/information`, {
    params: {
      includeNutrition: false,
    },
  });
  return response.data;
};

export const getRandomRecipes = async (number = 12) => {
  const response = await api.get('/random', {
    params: {
      'include-tags': 'vegetarian',
      number,
    },
  });
  return response.data;
};
