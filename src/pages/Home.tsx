import { useEffect, useState } from "react";
import { getRecipes, searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = async (q) => {
    if (!q) return getRecipes().then(setRecipes);
    const data = await searchRecipes(q);
    setRecipes(data);
  };

  const filtered =
    category === "All"
      ? recipes
      : recipes.filter((r) => r.strCategory === category);

  return (
    <div className="container">

      <h1 className="hero-title mt-6">
        What are we <span className="hero-highlight">crafting</span> today?
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="flex gap-2 mt-6 flex-wrap">
        {["All", "Seafood", "Dessert", "Chicken"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`category-btn ${
              category === c ? "category-active" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <h2 className="mt-6 font-semibold">Trending Recipes</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filtered.map((r) => (
            <RecipeCard
              key={r.idMeal}
              recipe={r}
              onClick={(id) => navigate(`/recipe/${id}`)}
            />
          ))}
        </div>
      )}

      <div className="newsletter">
        <div>
          <h3 className="text-xl font-bold">
            Join our culinary inner circle.
          </h3>
          <p className="text-sm text-gray-600">
            Get recipes and chef tips weekly.
          </p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <input placeholder="email@address.com" />
          <button>Sign Me Up</button>
        </div>
      </div>
    </div>
  );
}