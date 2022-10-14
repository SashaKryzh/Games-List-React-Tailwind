import { ThemeModeSwitcher } from "./ThemeModeSwitcher";

export function Header() {
  return (
    <header className="flex px-20 items-center border-b dark:border-b-0 bg-gray-50 dark:bg-slate-800 py-4">
      <a
        className="text-3xl grow font-extrabold text-center text-purple-400 font-sans"
        href="/"
      >
        GAMES LIST
      </a>
      <ThemeModeSwitcher />
    </header>
  );
}
