import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchRecipes } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchQuery.trim()) {
        // Navigate to home and trigger search
        if (location.pathname !== "/") {
          navigate("/");
        }
        // Dispatch custom event to trigger search on home page
        window.dispatchEvent(new CustomEvent("globalSearch", { detail: searchQuery }));
      }
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery, navigate, location.pathname]);

  return (
    <header className="w-full bg-[#f7f5f2] sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">

        <div className="flex items-center gap-6">

          <h1
            onClick={() => navigate("/")}
            className="text-xl md:text-2xl font-bold cursor-pointer"
          >
            Saffron & Sage
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-full transition ${
                location.pathname === "/"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate("/favorites")}
              className={`px-4 py-2 rounded-full transition ${
                location.pathname === "/favorites"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              Favorites
            </button>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm">
            <span className="text-gray-400 mr-2">🔍</span>
            
            <input
              type="text"
              placeholder="Search recipes..."
              className="outline-none text-sm bg-transparent w-28 md:w-40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => navigate("/favorites")}
            className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
          >
            ❤️
          </button>

          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold cursor-pointer">
            <span className="text-gray-600">
              M
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}