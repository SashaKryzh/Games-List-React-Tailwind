import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import GameTile from "../components/GameTile";
import { Header } from "../components/Header";
import MainContent from "../components/MainContent";
import useGames from "../hooks/useGames";

export default function Home() {
  return (
    <div className="flex flex-col grow">
      <Header />
      <MainContent>
        <Games />
      </MainContent>
      <Footer />
    </div>
  );
}

function Games() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { games, loading, error, hasMore } = useGames(query, page);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(searchBar);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchBar]);

  const observer = useRef<any>();
  const lastGameElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchBar(e.target.value);
    setPage(1);
  }

  return (
    <div className="py-4">
      <div className="flex justify-center pb-4">
        <input
          type="text"
          className="w-2/3 px-4 py-2 rounded-md border-2 border-slate-200 dark:border-slate-500 focus:outline-none focus:border-slate-300 dark:focus:border-slate-400 bg-gray-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
          placeholder="Search for a game"
          value={searchBar}
          onChange={handleSearch}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-stretch">
        {games.map((game, index) => {
          if (index === games.length - 1) {
            return (
              <div ref={lastGameElementRef} key={game.id}>
                <GameTile game={game} />
              </div>
            );
          } else {
            return <GameTile key={game.id} game={game} />;
          }
        })}
      </div>
    </div>
  );
}
