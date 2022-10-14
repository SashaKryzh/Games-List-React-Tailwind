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
    GamesApi.getGamesBySlug(`${id}`)
      .then((games) => games[0] ?? null)
      .then(setGame);
  }, [id]);

  const title = game?.name ?? "Loading...";
  const description = game?.summary ?? "Loading...";
  const company = game?.company ?? "Loading...";
  const genres: string[] = game?.genres ?? [];

  let image;
  if (game) {
    image =
      game?.coverUrl.replace("t_thumb", "t_1080p") ??
      "https://via.placeholder.com/300x400";
  } else {
    image = "";
  }

  return (
    <div className="flex flex-col grow">
      <Header />
      <div className="relative flex h-96">
        <img src={image} className="object-cover min-w-full" alt="" />
        <div className="absolute top-4 left-4 font-bold font-mono text-white">
          <Breadcrubms key={"breadcrumbs"} />
        </div>
      </div>
      <div className="p-4 grow m-auto w-2/3">
        <div className="h-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{title}</h1>
        <div className="h-2" />
        <span className="text-md text-gray-500 dark:text-gray-300">{company}</span>
        <div className="h-6" />
        <div className="flex space-x-4 items-start">
          <div className="w-2/3">
            <p className="text-md text-gray-700 dark:text-gray-200">{description}</p>
          </div>
          <div className="w-1/3">
            <div className="flex gap-2 flex-wrap items-start">
              {genres.map((genre) => (
                <GengeChip key={genre} genre={genre} />
              ))}
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
    <div className="bg-white dark:bg-slate-600 py-1 px-3 rounded-full border border-gray-300 text-gray-500 dark:text-gray-200 text-sm">
      {props.genre}
    </div>
  );
}
