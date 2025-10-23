import { VideoView } from 'expo-video';
import React from 'react';
import { Text, View } from 'react-native';
import { useFlashcardVideo } from '../hooks/useVideoPlayer';

const settings = () => {
  // Use your existing hook with the bonjour video
  const { player: videoPlayer, hasVideo } = useFlashcardVideo('bonjour', 'Bonjour/Hello');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bonjour Video</Text>
      {hasVideo && (
        <VideoView 
          player={videoPlayer} 
          style={{ width: 300, height: 300 }} 
          nativeControls={false}
        />
      )}
    </View>
  )
}

export default settings