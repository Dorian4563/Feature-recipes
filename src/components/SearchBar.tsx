import { useState, useEffect, type ChangeEvent } from "react";
import type { SearchHandler } from "../types";

export default function SearchBar({ onSearch }: { onSearch: SearchHandler }) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const t = window.setTimeout(() => onSearch(value), 400);
    return () => window.clearTimeout(t);
  }, [value, onSearch]);

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Find ingredients, cuisines..."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <button className="search-btn">Explore</button>
    </div>
  );
}