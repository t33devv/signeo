// app/data/flashcards.repo.sqlite.ts
import { openDatabaseAsync } from 'expo-sqlite';
import { seedCards } from '../models/flashcards.seed';
import { Flashcard, FlashSetId } from '../models/flashcards.types';

const dbPromise = openDatabaseAsync('flashcards.db');

export async function initDb(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY NOT NULL,
      setId TEXT NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL
    );
  `);
}

export async function ensureSeed(): Promise<void> {
  const db = await dbPromise;
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM cards;'
  );
  const count = row?.count ?? 0;
  if (count > 0) return;

  for (const c of seedCards) {
    await db.runAsync(
      'INSERT INTO cards (id,setId,front,back) VALUES (?,?,?,?);',
      [c.id, c.setId, c.front, c.back]
    );
  }
}

export async function getSet(setId: FlashSetId): Promise<Flashcard[]> {
  const db = await dbPromise;
  const rows = await db.getAllAsync<Flashcard>(
    'SELECT * FROM cards WHERE setId = ? ORDER BY id;',
    [setId]
  );
  return rows;
}