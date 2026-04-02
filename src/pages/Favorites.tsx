import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const loadFavorites = () => {
   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favorites);
  };
  <button
  onClick={() => navigate("/favorites")}
  className="relative bg-white p-2 rounded-full shadow"
>
  ❤️
  {favorites.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
      {favorites.length}
    </span>
  )}
</button>

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
  };

  if (favorites.length === 0) {
    return <p className="container mt-6">No favorites yet ❤️</p>;
  }

  return (
    <div className="container mt-6">
      <h2 className="text-xl font-bold">Your Favorites</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card relative">

            <div
              className="heart"
              onClick={() => removeFavorite(recipe.idMeal)}
            >
              ❌
            </div>

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