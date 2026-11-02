'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
    >
      {/* Sun — hide on dark */}
      <Sun
        size={17}
        className={`absolute transition-all duration-300 ${
          isDark
            ? 'translate-y-6 rotate-90 opacity-0'
            : 'group-hover:-rotate-12'
        }`}
      />
      {/* Moon — show on dark */}
      <Moon
        size={17}
        className={`absolute transition-all duration-300 ${
          isDark
            ? 'group-hover:rotate-12'
            : '-translate-y-6 -rotate-90 opacity-0'
        }`}
      />
    </button>
  );
}
