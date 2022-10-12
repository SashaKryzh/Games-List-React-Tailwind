import { useEffect } from "react";
import GamesApi from "../api/games_api";
import Footer from "../components/Footer";
import Game from "../components/Game";
import { Header } from "../components/Header";
import MainContent from "../components/MainContent";

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
  // const [gamesList, setGamesList] = useState<ReactElement[]>([]);

  useEffect(() => {
    GamesApi.getGames().then((games) => {console.log(games);
    });
  }, []);

  return (
    <div className="py-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-stretch">
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
        <Game game={{ name: "test" }} />
      </div>
      {/* TODO: Pagination */}
    </div>
  );
}
