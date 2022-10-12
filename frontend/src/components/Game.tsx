import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Game(props: {
  game: { name: string; imageUrl?: string };
}): ReactElement {
  const url =
    "https://c.files.bbci.co.uk/E909/production/_112375695_crucible976.jpg";

  return (
    <Link to="69">
      <div className="relative aspect-[3/4] rounded-sm flex">
        <img src={url} className="object-cover min-h-full" alt=""/>
        <div className="absolute top-0 left-0 min-h-full min-w-full hover:bg-black hover:bg-opacity-25 transition-all bg-gradient-to-t from-black opacity-80" />
        <div className="absolute bottom-4 left-4 ">
          <span className="text-2xl text-white">{props.game.name}</span>
        </div>
      </div>
    </Link>
  );
}
