import { Game } from "@app/models";
import { useEffect, useState } from "react";
import GamesApi from "../api/games_api";

interface UseGamesResult {
  games: Game[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
}

export default function useGames(query: string, page: number): UseGamesResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setGames([]);
    setLastPage(1);
  }, [query]);

  useEffect(() => {
    if (page < lastPage) {
      setGames([]);
      setLastPage(page);
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    console.log(`New page ${page} for query ${query}`);

    const promise =
      query === ""
        ? GamesApi.getGames(page)
        : GamesApi.getGamesByName(query, page);

    promise
      .then((games) => {
        setGames((prevGames) => {
          return [...new Set([...prevGames, ...games])];
        });
        setHasMore(games.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [query, page]);

  return { games, loading, error, hasMore };
}
