export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea?: string;
  strMealThumb: string;
  [key: string]: any;
}

export type SearchHandler = (query: string) => void;
