import React from 'react';
import { View } from 'react-native';
import { useFlashcardVideo } from '../hooks/useVideoPlayer';

const settings = () => {
  // Use your existing hook with the bonjour video
  const { player: videoPlayer, hasVideo } = useFlashcardVideo('bonjour', 'Bonjour/Hello');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  )
}

export default settings