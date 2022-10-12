import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineDislike,
  AiTwotoneDislike,
} from "react-icons/ai";

type LikeProps = {
  like?: boolean;
  active?: boolean;
  onClick?: (clicked: boolean) => void;
};

export default function Like({
  like = true,
  active = false,
  onClick,
}: LikeProps) {
  const icon = like ? (
    active ? (
      <AiTwotoneLike />
    ) : (
      <AiOutlineLike />
    )
  ) : active ? (
    <AiTwotoneDislike />
  ) : (
    <AiOutlineDislike />
  );

  return (
    <div
      className={`aspect-[1/1] rounded-full m-1 bg-slate-600 hover:bg-slate-500 flex justify-center items-center cursor-pointer text-gray-200 text-xl p-3 border ${
        active ? "" : "border-transparent"
      }`}
      onClick={() => onClick && onClick(like)}
    >
      {icon}
    </div>
  );
}
