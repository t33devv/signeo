import React from 'react'
import { Text, View } from 'react-native'

import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';

const assetId = require('../../assets/asl-vids/simple/bonjour.mp4');

const videoSource: VideoSource = {
  assetId,
  metadata: {
    title: 'Bonjour/Hello'
  }
}



const settings = () => {
  const player1 = useVideoPlayer(videoSource, player => {
  player.loop = true;
  player.play();
});

player1.volume = 0.0;
player1.loop = true;

  return (
    <View>
      <Text>settings</Text>
      <VideoView player={player1} style={{ width: 300, height: 300 }} nativeControls={false}/>
    </View>
  )
}

export default settings