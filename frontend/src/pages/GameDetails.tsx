import { Game } from "@app/models";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamesApi from "../api/games_api";
import Breadcrubms from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import Like from "../components/Like";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    GamesApi.getGamesBySlug(`${id}`).then(games => games[0] ?? null).then(setGame);
  }, []);

  console.log(game);

  const image = game?.coverUrl ?? "https://via.placeholder.com/300x400";
  const title = game?.name ?? "Loading...";
  const description = game?.summary ?? "Loading...";
  const company = game?.company ?? "Loading...";
  const genres: string[] = game?.genres ?? [];

  return (
    <div className="flex flex-col grow">
      <Header />
      <div className="relative flex h-96">
        <img src={image} className="object-cover min-w-full" alt="" />
        <div className="absolute top-4 left-4 font-bold font-mono text-white">
          <Breadcrubms />
        </div>
      </div>
      <div className="p-4 grow m-auto w-2/3">
        <div className="h-4" />
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <div className="h-2" />
        <span className="text-md text-gray-300">{company}</span>
        <div className="h-6" />
        <div className="flex space-x-4 items-start">
          <div className="w-2/3">
            <p className="text-md text-gray-200">{description}</p>
          </div>
          <div className="w-1/3">
            <div className="flex gap-2 flex-wrap items-start">
              {genres.map(genre => (<GengeChip key={genre} genre={genre} />))}
            </div>
            <div className="h-4" />
            <div className="flex">
              <Like
                like={false}
                active={liked === false}
                onClick={onLikeChange}
              />
              <Like active={liked === true} onClick={onLikeChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-8" />
      <Footer />
    </div>
  );

  function onLikeChange(clicked: boolean) {
    setLiked(liked === clicked ? null : clicked);
  }
}

function GengeChip(props: { genre: string }): ReactElement {
  return (
    <div className="bg-slate-600 py-1 px-3 rounded-full outline-slate-500 border text-gray-200 text-sm">
      {props.genre}
    </div>
  );
}
