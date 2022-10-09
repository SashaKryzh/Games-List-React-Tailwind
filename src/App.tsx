import React, { useEffect, useState } from "react";
import IGDBClient from "./api/igdb_client";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    IGDBClient.getAccessToken().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full min-h-screen py-4 bg-slate-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Loading() {
  return <p className="text-center italic">Loading...</p>;
}
