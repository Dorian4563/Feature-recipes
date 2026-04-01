const BASE = "https://www.themealdb.com/api/json/v1/1";

export const getRecipes = async () => {
  const res = await fetch(`${BASE}/search.php?s=`);
  const data = await res.json();
  return data.meals || [];
};

export const searchRecipes = async (q) => {
  const res = await fetch(`${BASE}/search.php?s=${q}`);
  const data = await res.json();
  return data.meals || [];
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals[0];
};