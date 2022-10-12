import { Route, Routes } from "react-router-dom";
import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="h-full min-h-screen flex flex-col bg-slate-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
