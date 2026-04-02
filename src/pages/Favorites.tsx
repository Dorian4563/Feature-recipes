import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favorites);
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.idMeal !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (favorites.length === 0) {
    return (
      <div className="container mt-8">
        <p className="text-center text-lg text-[#666]">No favorites yet ❤️</p>
      </div>
    );
  }

  return (
    <div className="container mt-6 pb-12">
      <h2 className="section-title mb-6">Your Favorite Recipes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe-card relative group"
          >
            {/* Image Container */}
            <div className="recipe-img-container">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-img cursor-pointer"
                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              />
              <div className="absolute top-3 left-3">
                <span className="recipe-label">{recipe.strCategory}</span>
              </div>
              <button
                onClick={() => removeFavorite(recipe.idMeal)}
                className="heart-btn"
              >
                ❌
              </button>
            </div>

            {/* Content */}
            <div className="recipe-content">
              <h3 className="recipe-title">{recipe.strMeal}</h3>
              <p className="recipe-meta">{recipe.strCategory}</p>
              <button
                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                className="mt-2 w-full px-4 py-2 rounded-full text-sm font-semibold text-white transition duration-300"
                style={{
                  backgroundColor: "var(--primary)",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--primary-dark)")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--primary)")}
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}