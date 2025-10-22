import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const simpleBtn = () => { router.push("/flashset/simple"); }
  const intermediateBtn = () => { router.push("/flashset/intermediate"); }
  const advancedBtn = () => { router.push("/flashset/advanced"); }

  return (
    <View className="flex-1 items-center mt-[40%]">
      <Text className="text-5xl text-primary align-middle mb-10">Start learning:</Text>

      <TouchableOpacity onPress={simpleBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Simple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={intermediateBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Intermediate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={advancedBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Advanced</Text>
      </TouchableOpacity>
    </View>
  );
}
