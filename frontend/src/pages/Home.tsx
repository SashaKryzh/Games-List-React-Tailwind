import { ReactElement, useEffect, useState } from "react";
import Game from "../components/Game";
import MainContent from "../components/MainContent";
import GamesApi from "../api/games_api";

export default function Home() {
  return (
    <MainContent>
      <h1 className="text-2xl font-mono font-extrabold text-center">
        Hello world!
      </h1>
      <Games />
    </MainContent>
  );
}

function Games() {
  const [gamesList, setGamesList] = useState<ReactElement[]>([]);

  useEffect(() => {
    GamesApi.getGames().then((games) => {});
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 items-stretch">
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
      </div>
    </div>
  );
}
