const toggleFavorite = (e) => {
  e.stopPropagation();

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
export default function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card relative" onClick={() => onClick(recipe.idMeal)}>
      <div className="heart">❤️</div>

      <img src={recipe.strMealThumb} className="recipe-img" />

      <div className="recipe-content">
        <p className="recipe-meta">{recipe.strCategory}</p>
        <h3 className="recipe-title">{recipe.strMeal}</h3>
      </div>
    </div>
  );
}