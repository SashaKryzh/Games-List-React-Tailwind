import {
	Dispatch,
	SetStateAction, useEffect,
	useState
} from "react";
import { singletonHook } from "react-singleton-hook";

let globalSetMode: Dispatch<SetStateAction<boolean>>;

export const useDarkMode = singletonHook(false, () => {
  const [darkMode, setDarkMode] = useState(false);

  globalSetMode = setDarkMode;

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return darkMode;
});

export const setDarkMode = (mode: boolean) => globalSetMode(mode);
