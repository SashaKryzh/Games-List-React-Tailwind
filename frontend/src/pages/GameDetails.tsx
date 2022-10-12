import Breadcrubms from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

export default function GameDetails() {
  return (
    <div className="flex flex-col grow">
      <Header />
      <Breadcrubms />
      <div className="grow">Content</div>
      <Footer />
    </div>
  );
}
