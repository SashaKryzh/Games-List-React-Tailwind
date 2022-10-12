import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function GameTile(props: {
  game: { name: string; slug: string, coverUrl?: string };
}): ReactElement {
  const url = "https://via.placeholder.com/150/000000/FFFFFF/?text=No+Cover+Found";

  return (
    <Link to={props.game.slug}>
      <div className="relative aspect-[3/4] rounded-sm flex">
        <img src={props.game.coverUrl ?? url} className="object-cover min-h-full" alt="" />
        <div className="absolute top-0 left-0 min-h-full min-w-full hover:bg-black hover:bg-opacity-25 transition-all bg-gradient-to-t from-black opacity-80" />
        <div className="absolute bottom-4 left-4 ">
          <span className="text-2xl text-white">{props.game.name}</span>
        </div>
      </div>
    </Link>
  );
}
