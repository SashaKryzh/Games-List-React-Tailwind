import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Game(props: {
  game: { name: string; imageUrl?: string };
}): ReactElement {
  return (
    <Link to="69">
      <div className="">
        <div className="aspect-[3/4] rounded-sm flex flex-col justify-end transition-all p-4 hover:bg-opacity-25 hover:bg-black">
          <span className="text-2xl font-medium">{props.game.name}</span>
        </div>
      </div>
    </Link>
  );
}
