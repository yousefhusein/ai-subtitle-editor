"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Button } from "@nextui-org/react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <IconSun className="h-5 w-5 text-foreground" />
      ) : (
        <IconMoon className="h-5 w-5 text-foreground" />
      )}
    </Button>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export { ThemeToggle }; 