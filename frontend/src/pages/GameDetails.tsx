import { useState } from "react";
import Breadcrubms from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import Like from "../components/Like";

export default function GameDetails() {
  const image =
    "https://c.files.bbci.co.uk/E909/production/_112375695_crucible976.jpg";

  const [liked, setLiked] = useState<boolean | null>(null);

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
        <div className="h-4" />
        <h1 className="text-4xl font-bold text-white">Game name</h1>
        <div className="h-2" />
        <span className="text-md text-gray-300">Sudio name</span>
        <div className="h-6" />
        <div className="flex space-x-4 items-start">
          <div className=" w-2/3">
            <p className="text-md text-gray-200">
              Fortnite — компьютерная онлайн-игра, разработанная американской
              компанией Epic Games совместно с People Can Fly и выпущенная в
              ранний доступ в 2017 году[9]. Fortnite предлагает игрокам на выбор
              три раздельных режима: Fortnite: Save the World (англ.)рус.,
              кооперативный симулятор выживания с открытым миром, в котором
              игрокам предлагается сообща отбиваться от монстров, похожих на
              зомби, с помощью оружия и различных построек; Fortnite: Battle
              Royale — соревновательный режим в жанре королевской битвы, в
              котором 100 игроков должны сражаться друг с другом, пока в живых
              не останется только один; и добавленный в 2018 году режим
              Fortnite: Creative, режим-«песочница», в котором игроки могут
              самостоятельно создавать различные сооружения, наподобие
              Minecraft. Fortnite: Save the World был выпущен на платформах
              Windows, macOS, PlayStation 4 и Xbox One, а Fortnite: Battle
              Royale и Fortnite: Creative, помимо перечисленных платформ, также
              и на портативных устройствах — Nintendo Switch, iOS и Android.
              Игра распространяется преимущественно посредством цифровой
              дистрибуции по модели free-to-play; изданием версий игры на
              физических носителях занимается компания Gearbox Publishing.
            </p>
          </div>
          <div className="w-1/3">
            <div className="flex gap-2 flex-wrap items-start">
              <GengeChip />
              <GengeChip />
              <GengeChip />
              <GengeChip />
              <GengeChip />
              <GengeChip />
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

function GengeChip() {
  return (
    <div className="bg-slate-600 py-1 px-3 rounded-full outline-slate-500 border text-gray-200 text-sm">
      FPS
    </div>
  );
}
