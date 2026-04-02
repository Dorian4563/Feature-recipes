import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <p className="container mt-6">Loading...</p>;

  // Ingredients
  const ingredients = [];
  for (let i = 1; i <= 10; i++) {
    const ing = recipe[`strIngredient${i}`];
    if (ing) ingredients.push(ing);
  }

  return (
    <div>

      {/* HERO IMAGE */}
      <img
        src={recipe.strMealThumb}
        className="detail-hero"
      />

      {/* FLOATING CARD */}
      <div className="container">
        <div className="detail-card">

          {/* TAGS */}
          <div className="detail-tags">
            <span className="tag tag-green">Healthy Choice</span>
            <span className="tag tag-yellow">25 mins</span>
            <span className="tag tag-gray">Easy</span>
          </div>

          {/* TITLE */}
          <h2 className="detail-title">{recipe.strMeal}</h2>

          <p className="detail-desc">
            A delicious meal made with fresh ingredients and simple steps.
          </p>

          {/* STATS */}
          <div className="detail-stats">
            <span>420 kcal</span>
            <span>34g protein</span>
            <span>12g carbs</span>
          </div>

          {/* GRID */}
          <div className="detail-grid">

            {/* INGREDIENTS */}
            <div className="ingredients">
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul>
                {ingredients.map((i, idx) => (
                  <li key={idx}>• {i}</li>
                ))}
              </ul>
            </div>

            {/* STEPS */}
            <div className="steps">

              <h3 className="font-semibold mb-4">Preparation Steps</h3>

              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="step flex gap-3">
                  <div className="step-number">{step}</div>
                  <p className="text-sm text-gray-600">
                    Follow step {step} to prepare this delicious recipe.
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* CTA */}
          <div className="cta-box">
            <div>
              <h4 className="font-semibold">Ready to start?</h4>
              <p className="text-sm">Switch to cooking mode</p>
            </div>
            <button className="cta-btn">Start Cooking</button>
          </div>

        </div>
      </div>
    </div>
  );
}