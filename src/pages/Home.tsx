import { useEffect, useState } from "react";
import { getRecipes, searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import IngredientSearchBar from "../components/IngredientSearchBar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });

    // Listen for global search from navbar
    const handleGlobalSearch = (e) => {
      const query = e.detail;
      if (query.trim()) {
        searchRecipes(query).then(setRecipes);
      } else {
        getRecipes().then(setRecipes);
      }
    };

    window.addEventListener("globalSearch", handleGlobalSearch);
    return () => window.removeEventListener("globalSearch", handleGlobalSearch);
  }, []);

  const handleIngredientSearch = async (q) => {
    if (!q) {
      // Reset to show all recipes when search is empty
      const allRecipes = await getRecipes();
      const filtered = category === "All"
        ? allRecipes
        : allRecipes.filter((r) => r.strCategory === category);
      setRecipes(filtered);
      return;
    }

    // Search for ingredients and chef names
    const allRecipes = await getRecipes();
    const filtered = allRecipes.filter((recipe) => {
      const searchTerm = q.toLowerCase();

      // Search in ingredients (strIngredient1, strIngredient2, etc.)
      let hasIngredient = false;
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient && ingredient.toLowerCase().includes(searchTerm)) {
          hasIngredient = true;
          break;
        }
      }

      // Search in chef/area (using strArea as chef/cuisine indicator)
      const hasChef = recipe.strArea?.toLowerCase().includes(searchTerm);

      return hasIngredient || hasChef;
    });

    setRecipes(filtered);
  };

  const filtered =
    category === "All"
      ? recipes
      : recipes.filter((r) => r.strCategory === category);

  return (
    <div className="container">
      <div className="mt-12">
        <h1 className="hero-title text-left">
          What are we <span className="hero-highlight">crafting</span> today?
        </h1>

        <div className="mt-6">
          <IngredientSearchBar onSearch={handleIngredientSearch} />
          
          <button className="categories-btn mt-4">
            Categories
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-6 flex-wrap">
        {["All", "Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"].map((c) => (
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