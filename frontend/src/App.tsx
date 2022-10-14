import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";
import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  const isDark = useDarkMode();

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className="h-32 min-h-screen flex flex-col bg-white dark:bg-slate-700
    overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200 dark:scrollbar-track-slate-600 scrollbar-thumb:!rounded"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<GameDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
