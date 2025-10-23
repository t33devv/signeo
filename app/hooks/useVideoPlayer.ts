import { useVideoPlayer } from 'expo-video';
import { useMemo } from 'react';
import { createVideoSource } from '../utils/videoManager';

export const useFlashcardVideo = (videoPath?: string, title?: string) => {
  const videoSource = useMemo(() => {
    if (!videoPath) return null;
    return createVideoSource(videoPath, title);
  }, [videoPath, title]);

  const player = useVideoPlayer(videoSource, (player) => {
    if (videoSource) {
      player.loop = true;
      player.volume = 0.0;
      player.play();
    }
  });

  return {
    player,
    hasVideo: !!videoSource
  };
};