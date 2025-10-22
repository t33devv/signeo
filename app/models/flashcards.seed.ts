import { Flashcard } from './flashcards.types';

export const seedCards: Flashcard[] = [
  { id: '1', setId: 'simple', front: 'Hello', back: 'Hola' },
  { id: '2', setId: 'simple', front: 'Goodbye', back: 'Adiós' },
  { id: '3', setId: 'intermediate', front: 'Beautiful', back: 'Hermoso/Hermosa' },
  { id: '4', setId: 'intermediate', front: 'Difficult', back: 'Difícil' },
  { id: '5', setId: 'advanced', front: 'Nevertheless', back: 'Sin embargo' },
  { id: '6', setId: 'advanced', front: 'Consequently', back: 'Por consiguiente' },
];
