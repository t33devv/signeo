import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";

import { TextInput } from "react-native";

export default function Index() {
  const simpleBtn = () => { router.push("/aslset/simple"); }
  const intermediateBtn = () => { router.push("/aslset/intermediate"); }
  const advancedBtn = () => { router.push("/aslset/advanced"); }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  }

  return (
    


    <View className="flex-1 items-center mt-[40%]">

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 w-3/4"
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Text
        className="mt-[10%]"
      >
        Your starred sets:
      </Text>


      <TouchableOpacity onPress={simpleBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Simple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={intermediateBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Intermediate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={advancedBtn} className="bg-secondary my-6 py-10 w-1/2 rounded-lg items-center shadow shadow-black-500">
        <Text className="text-2xl text-primary">Advanced</Text>
      </TouchableOpacity>

      <Text
        className="mt-[10%]"
      >
        Browse all ASL sets:
      </Text>
    </View>
  );
}
