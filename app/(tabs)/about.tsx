import React from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'

const about = () => {
  return (
    <View className="flex-1 items-center mt-[40%]">
      <Text className="text-5xl text-primary align-middle mb-10">About Signéo</Text>

      <Text className="mx-[10%]">
        Signéo is a simple flashcard based language learning app designed to help users master sign language whilst learning the English/French translation to the word. {'\n\n'}

        We focus on reliability, simplicity and user experience to provide the best possible learning environment. We aren't here to bombard you with unnecesssary features or ads. {'\n\n'}

        Originally, the app was designed to help students in the Les Cajoutiers school in Mbour, Senegal learn English and Sign Language. However, we have found out that people all over the world can benefit from learning sign language. {'\n\n'}

        Check out the Les Cajoutiers Instagram here:
      </Text>
      <TouchableOpacity className="items-start" onPress={() => Linking.openURL('https://www.instagram.com/lescajoutiers/')}>
        <Text className="text-blue-500 underline">https://www.instagram.com/lescajoutiers/</Text>
      </TouchableOpacity>
    </View>
  )
}

export default about