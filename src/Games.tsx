import React, { ReactElement, useEffect, useState } from "react";
import IGDBClient from "./igdb_client";

export default function Games() {
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

function Game(props: {
  game: { name: string; imageUrl?: string };
}): ReactElement {
  return (
    <div className="">
      <div className="aspect-[3/4] rounded-sm flex flex-col justify-end transition-all p-4 hover:bg-opacity-25 hover:bg-black">
        <span className="text-2xl font-medium">{props.game.name}</span>
      </div>
    </div>
  );
}
