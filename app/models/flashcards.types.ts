export type FlashSetId = 'simple' | 'intermediate' | 'advanced';

export interface Flashcard {
  id: string;
  setId: FlashSetId;
  front: string;
  back: string;
}