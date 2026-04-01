import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    getRecipeById(id).then((data) => {
      setRecipe(data);

      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      const exists = stored.find((f) => f.idMeal === data.idMeal);
      setIsFav(!!exists);
    });
  }, [id]);

  if (!recipe) {
    return <p className="container mt-6">Loading...</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) {
      ingredients.push(`${measure || ""} ${ing}`);
    }
  }

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.find((f) => f.idMeal === recipe.idMeal);

    let updated;

    if (exists) {
      updated = stored.filter((f) => f.idMeal !== recipe.idMeal);
      setIsFav(false);
    } else {
      updated = [...stored, recipe];
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="container mt-6">

      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary"
      >
        ← Back
      </button>

      <img
        src={recipe.strMealThumb}
        className="w-full max-h-96 object-cover rounded-xl mt-4"
      />

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>

        <button
          onClick={toggleFavorite}
          className="text-xl"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <p className="text-gray-500 mt-1">{recipe.strCategory}</p>

      <h3 className="mt-6 font-semibold text-lg">Ingredients</h3>
      <ul className="mt-2">
        {ingredients.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold text-lg">Instructions</h3>
      <p className="mt-2 leading-relaxed">
        {recipe.strInstructions}
      </p>
    </div>
  );
}