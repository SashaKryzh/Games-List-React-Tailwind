import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

export default function GameTile(props: {
  game: { name: string; slug: string; coverUrl?: string };
}): ReactElement {
  let url =
    "https://via.placeholder.com/150/000000/FFFFFF/?text=No+Cover+Found";

  if (props.game.coverUrl) {
    url = props.game.coverUrl.replace("t_thumb", "t_cover_big");
  }

  const { ref, inView } = useInView({});

  return (
    <Link ref={ref} to={props.game.slug}
      className={`hover:scale-105 dark:duration-400 duration-300 ${inView ? "opacity-1" : "opacity-10 blur-sm"}`}>
      <div className="relative aspect-[3/4] flex">
        <img src={url} className="object-cover min-h-full rounded-lg" alt="" />
        <div className="absolute top-0 left-0 min-h-full min-w-full hover:opacity-50 transition-all bg-gradient-to-t from-black opacity-80 rounded-lg" />
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl text-white">{props.game.name}</span>
        </div>
      </div>
    </Link>
  );
}
