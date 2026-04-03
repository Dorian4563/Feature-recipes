import type { Recipe } from "../types";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export const getRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(`${BASE}/search.php?s=`);
  const data = await res.json();
  return (data.meals as Recipe[]) || [];
};

export const searchRecipes = async (q: string): Promise<Recipe[]> => {
  const res = await fetch(`${BASE}/search.php?s=${q}`);
  const data = await res.json();
  return (data.meals as Recipe[]) || [];
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return (data.meals?.[0] as Recipe) || ({ } as Recipe);
};