import { Stack } from "expo-router";
import { useEffect } from "react";
import { ensureSeed, initDb } from "./data/flashcards.repo.sqlite";
import './globals.css';

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      await initDb();
      await ensureSeed();
    })();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}