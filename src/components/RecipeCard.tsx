import { useState, useEffect } from "react";

export default function RecipeCard({ recipe, onClick }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.find((f) => f.idMeal === recipe.idMeal);
    setIsFav(!!exists);
  }, [recipe.idMeal]);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    let stored = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = stored.find((f) => f.idMeal === recipe.idMeal);

    if (exists) {
      stored = stored.filter((f) => f.idMeal !== recipe.idMeal);
      setIsFav(false);
    } else {
      stored.push(recipe);
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(stored));

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="recipe-card relative" onClick={() => onClick(recipe.idMeal)}>

      <div className="recipe-img-container">
        <img src={recipe.strMealThumb} className="recipe-img" />
        
        <button
          className="heart-btn"
          onClick={toggleFavorite}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <p className="recipe-meta">{recipe.strCategory}</p>
      </div>

    </div>
  );
}