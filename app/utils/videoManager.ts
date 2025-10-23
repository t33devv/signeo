import { VideoSource } from 'expo-video';

// Import all video assets
const videoAssets = {
  // Simple videos
  'bonjour': require('../../assets/asl-vids/simple/bonjour.mp4'),
  'bye': require('../../assets/asl-vids/simple/bye.mp4'),
  'big': require('../../assets/asl-vids/simple/big.mp4'),
  'small': require('../../assets/asl-vids/simple/small.mp4'),
  'yes': require('../../assets/asl-vids/simple/yes.mp4'),
  'no': require('../../assets/asl-vids/simple/no.mp4'),
  'thankyou': require('../../assets/asl-vids/simple/thankyou.mp4'),
  'welcome': require('../../assets/asl-vids/simple/welcome.mp4'),
  'go': require('../../assets/asl-vids/simple/go.mp4'),
  'stop': require('../../assets/asl-vids/simple/stop.mp4'),
  'finished': require('../../assets/asl-vids/simple/finished.mp4'),
  'pardon': require('../../assets/asl-vids/simple/pardon.mp4'),
  'howareyou': require('../../assets/asl-vids/simple/howareyou.mp4'),
  'howoldareyou': require('../../assets/asl-vids/simple/howoldareyou.mp4'),
  'mynameis': require('../../assets/asl-vids/simple/mynameis.mp4'),
  'nicetomeetyou': require('../../assets/asl-vids/simple/nicetomeetyou.mp4'),
  'imdeaf': require('../../assets/asl-vids/simple/imdeaf.mp4'),
  'iunderstand': require('../../assets/asl-vids/simple/iunderstand.mp4'),
  'gotoclass': require('../../assets/asl-vids/simple/gotoclass.mp4'),
  'boysandgirlstogether': require('../../assets/asl-vids/simple/boysandgirlstogether.mp4'),

  // Intermediate videos
  'beautiful': require('../../assets/asl-vids/intermediate/beautiful.mp4'),
  'funny': require('../../assets/asl-vids/intermediate/funny.mp4'),
  'happy': require('../../assets/asl-vids/intermediate/happy.mp4'),
  'sad': require('../../assets/asl-vids/intermediate/sad.mp4'),
  'hungry': require('../../assets/asl-vids/intermediate/hungry.mp4'),
  'thirsty': require('../../assets/asl-vids/intermediate/thirsty.mp4'),
  'tired': require('../../assets/asl-vids/intermediate/tired.mp4'),
  'abcd': require('../../assets/asl-vids/intermediate/abcd.mp4'),
  'efgh': require('../../assets/asl-vids/intermediate/efgh.mp4'),
  'ijk': require('../../assets/asl-vids/intermediate/ijk.mp4'),
  'lmno': require('../../assets/asl-vids/intermediate/lmno.mp4'),
  'pqrst': require('../../assets/asl-vids/intermediate/pqrst.mp4'),
  'uvwxyz': require('../../assets/asl-vids/intermediate/uvwxyz.mp4'),
  '12345': require('../../assets/asl-vids/intermediate/12345.mp4'),
  '678910': require('../../assets/asl-vids/intermediate/678910.mp4'),
  'montueswed': require('../../assets/asl-vids/intermediate/montueswed.mp4'),
  'thursfrisatsun': require('../../assets/asl-vids/intermediate/thursfrisatsun.mp4'),
  'mornaftev': require('../../assets/asl-vids/intermediate/mornaftev.mp4'),

  // Advanced videos
  'homeoflescajoutiers': require('../../assets/asl-vids/advanced/homeoflescajoutiers.mp4'),
  'ispeaksignlanguage': require('../../assets/asl-vids/advanced/ispeaksignlanguage.mp4'),
  'photovideo': require('../../assets/asl-vids/advanced/photovideo.mp4'),
  'wheresthebathroom': require('../../assets/asl-vids/advanced/wheresthebathroom.mp4'),
};

export const createVideoSource = (videoKey: string, title?: string): VideoSource => {
  const assetId = videoAssets[videoKey as keyof typeof videoAssets];
  if (!assetId) {
    throw new Error(`Video not found: ${videoKey}`);
  }
  
  return {
    assetId,
    metadata: {
      title: title || videoKey
    }
  };
};

export const getVideoKey = (front: string, setId: string): string => {
  // Convert front text to lowercase and replace spaces with nothing
  // This matches your video file naming convention
  return front.toLowerCase().replace(/\s+/g, '');
};

export const hasVideo = (videoKey: string): boolean => {
  return videoKey in videoAssets;
};