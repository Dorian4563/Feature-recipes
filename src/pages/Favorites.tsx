import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites on page load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // Remove from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.idMeal !== id);

    // Update storage
    localStorage.setItem("favorites", JSON.stringify(updated));

    // Update UI instantly
    setFavorites(updated);
  };

  if (favorites.length === 0) {
    return (
      <div className="container mt-6">
        <h2 className="text-xl font-bold">Favorites</h2>
        <p className="mt-4 text-gray-500">No favorites yet ❤️</p>
      </div>
    );
  }

  return (
    <div className="container mt-6">
      <h2 className="text-xl font-bold">Your Favorites</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card relative">

            {/* ❌ Remove */}
            <button
              className="heart"
              onClick={() => removeFavorite(recipe.idMeal)}
            >
              ❌
            </button>

            {/* Image → go to detail */}
            <img
              src={recipe.strMealThumb}
              className="recipe-img"
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            />

            <div className="recipe-content">
              <p className="recipe-meta">{recipe.strCategory}</p>
              <h3 className="recipe-title">{recipe.strMeal}</h3>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}