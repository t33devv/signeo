export type FlashSetId = 'simple' | 'intermediate' | 'advanced';

import { VideoSource } from 'expo-video';

export interface Flashcard {
  id: string;
  setId: FlashSetId;
  front: string;
  back: string;
  videoPath?: string; // Path to the video file
  videoTitle?: string; // Title for the video metadata
}

// Video mapping type for easy lookup
export type VideoMap = Record<string, {
  assetId: any;
  videoSource: VideoSource;
}>;