import { CgDarkMode } from "react-icons/cg";
import { setDarkMode, useDarkMode } from "../hooks/useDarkMode";

export function ThemeModeSwitcher() {
  const isDark = useDarkMode();

  return (
    <div
      className="flex justify-center items-center p-3 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-md text-gray-700 dark:text-gray-50"
      onClick={() => setDarkMode(!isDark)}
    >
      <CgDarkMode size={24} />
    </div>
  );
}
