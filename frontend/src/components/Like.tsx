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
      className={`aspect-[1/1] rounded-full m-1 flex justify-center items-center cursor-pointer hover:bg-white dark:hover:bg-slate-500 hover:border-gray-600 dark:hover:border-slate-300 hover:text-gray-700 dark:text-gray-200 text-xl p-3 border ${
        active
          ? "text-gray-700 dark:bg-slate-600 bg-white border-gray-600 dark:border-slate-300"
          : "text-gray-400 bg-gray-50 border-gray-300 dark:border-transparent dark:bg-slate-600"
      }`}
      onClick={() => onClick && onClick(like)}
    >
      {icon}
    </div>
  );
}
