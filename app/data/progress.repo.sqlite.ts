import { openDatabaseAsync } from 'expo-sqlite';
import { FlashSetId } from '../models/flashcards.types';

const dbPromise = openDatabaseAsync('flashcards.db');

export async function initProgress(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS progress_last (
      setId TEXT PRIMARY KEY NOT NULL,
      lastIndex INTEGER NOT NULL DEFAULT 0,
      updatedAt INTEGER NOT NULL
    );
  `);
}

export async function getLastIndex(setId: FlashSetId): Promise<number> {
  const db = await dbPromise;
  const row = await db.getFirstAsync<{ lastIndex: number }>(
    'SELECT lastIndex FROM progress_last WHERE setId = ?',
    [setId]
  );
  return row?.lastIndex ?? 0;
}

export async function setLastIndex(setId: FlashSetId, lastIndex: number): Promise<void> {
  const db = await dbPromise;
  const now = Date.now();
  await db.runAsync(
    `INSERT INTO progress_last (setId, lastIndex, updatedAt)
     VALUES (?, ?, ?)
     ON CONFLICT(setId) DO UPDATE SET
       lastIndex = excluded.lastIndex,
       updatedAt = excluded.updatedAt`,
    [setId, lastIndex, now]
  );
}

export async function clearLastIndex(setId: FlashSetId): Promise<void> {
  const db = await dbPromise;
  await db.runAsync('DELETE FROM progress_last WHERE setId = ?', [setId]);
}