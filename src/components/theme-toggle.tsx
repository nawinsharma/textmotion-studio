"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-3 py-1 text-xs rounded bg-white/20 hover:bg-white/30 transition-colors"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
} 