"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const useDarkTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleDarkTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkTheme(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkTheme(false);
    }
  }, []);

  return {
    daktThemeSelector: (
      <div>
        {" "}
        <button className="icon p-2" onClick={handleDarkTheme}>
          {!isDarkTheme ? (
            <MoonIcon className="h-6 w-6 text" aria-hidden="true" />
          ) : (
            <SunIcon className="h-6 w-6 text" aria-hidden="true" />
          )}
        </button>
      </div>
    ),
    isDarkTheme: isDarkTheme,
  };
};

export default useDarkTheme;
