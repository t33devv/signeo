// app/data/flashcards.repo.sqlite.ts
import { openDatabaseAsync } from 'expo-sqlite';
import { seedCards } from '../models/flashcards.seed';
import { Flashcard, FlashSetId } from '../models/flashcards.types';

const dbPromise = openDatabaseAsync('flashcards.db');

export async function initDb(): Promise<void> {
  const db = await dbPromise;
  
  // Create the table with all fields including video fields
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY NOT NULL,
      setId TEXT NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      videoPath TEXT,
      videoTitle TEXT
    );
  `);
  
  // Add video columns if they don't exist (for existing databases)
  try {
    await db.execAsync('ALTER TABLE cards ADD COLUMN videoPath TEXT;');
  } catch (e) {
    // Column already exists, ignore error
  }
  
  try {
    await db.execAsync('ALTER TABLE cards ADD COLUMN videoTitle TEXT;');
  } catch (e) {
    // Column already exists, ignore error
  }
}

export async function ensureSeed(): Promise<void> {
  const db = await dbPromise;
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM cards;'
  );
  const count = row?.count ?? 0;
  
  if (count > 0) {
    // Database has data, but we need to update it with new video fields
    await updateExistingData();
    return;
  }

  // Insert all new data with video fields
  for (const c of seedCards) {
    await db.runAsync(
      'INSERT INTO cards (id,setId,front,back,videoPath,videoTitle) VALUES (?,?,?,?,?,?);',
      [c.id, c.setId, c.front, c.back, c.videoPath || null, c.videoTitle || null]
    );
  }
}

async function updateExistingData(): Promise<void> {
  const db = await dbPromise;
  
  // Clear existing data and insert new data
  await db.execAsync('DELETE FROM cards;');
  
  for (const c of seedCards) {
    await db.runAsync(
      'INSERT INTO cards (id,setId,front,back,videoPath,videoTitle) VALUES (?,?,?,?,?,?);',
      [c.id, c.setId, c.front, c.back, c.videoPath || null, c.videoTitle || null]
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

// Add a function to force refresh the database (useful for development)
export async function forceRefreshDb(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync('DROP TABLE IF EXISTS cards;');
  await initDb();
  await ensureSeed();
}