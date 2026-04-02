import { useState, useEffect } from "react";

export default function IngredientSearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Search ingredients or chef names..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="search-btn">Explore</button>
    </div>
  );
}