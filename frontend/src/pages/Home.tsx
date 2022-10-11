import { ReactElement, useState } from "react";
import Game from "../components/Game";
import MainContent from "../components/MainContent";
import IGDBClient from "../api/igdb_client";

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
  const [gameList, setGameList] = useState<ReactElement[]>([]);

  return (
    <div>
      <button
        className="bg-slate-300 p-2 rounded-md"
        onClick={async () => setGameList(await loadGames())}
      >
        Load game list
      </button>
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

async function loadGames(): Promise<ReactElement[]> {
  // make request
  let gameResponce = await IGDBClient.getGames();
  console.log(gameResponce);

  // let gameList = gameResponce.map((gameInfo) => Game(gameInfo));

  return [];
}
