"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 p-1">
        <div className="h-7 w-7" />
        <div className="h-7 w-7" />
        <div className="h-7 w-7" />
      </div>
    );
  }

  const themes = [
    { value: "light", icon: SunIcon, label: "Light mode" },
    { value: "dark", icon: MoonIcon, label: "Dark mode" },
    { value: "system", icon: MonitorIcon, label: "System preference" },
  ] as const;

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 p-1 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
            theme === value
              ? "bg-colordanger text-white shadow-lg shadow-colordanger/25"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          }`}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
