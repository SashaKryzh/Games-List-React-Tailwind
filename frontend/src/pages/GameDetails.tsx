import Breadcrubms from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

export default function GameDetails() {
  const image =
    "https://c.files.bbci.co.uk/E909/production/_112375695_crucible976.jpg";

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
        <span className="text-white">Content</span>
      </div>
      <Footer />
    </div>
  );
}
