import { Game } from "@app/models";
import { useEffect, useState } from "react";
import GamesApi from "../api/games_api";
import Footer from "../components/Footer";
import GameTile from "../components/GameTile";
import { Header } from "../components/Header";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col grow">
      <Header />
      <MainContent>
        <Games />
      </MainContent>
      <Footer />
    </div>
  );
}

function Games() {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [searchBar, setSearchBar] = useState<string>("");

  useEffect(() => {
    console.log("Fetching games");
    GamesApi.getGames().then(setGamesList);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchBar.length > 0) {
        GamesApi.getGamesByName(searchBar).then(setGamesList);
      } else {
        GamesApi.getGames().then(setGamesList);
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchBar]);

  return (
    <div className="py-4">
      <div className="flex justify-center py-4">
        <input
          autoFocus
          type="text"
          className="w-1/2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-slate-700 text-white"
          placeholder="Search for a game"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-stretch">
        {gamesList.map((game) => (
          <GameTile key={game.id} game={game} />
        ))}
      </div>
      {/* TODO: Pagination */}
    </div>
  );
}
