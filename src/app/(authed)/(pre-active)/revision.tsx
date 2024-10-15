import Button from "@/components/Button";
import tw from "@/config/tw";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";

export default function Revision() {
  const { isSignedIn, isLoaded, signOut } = useAuth();

  return (
    <SafeAreaView style={tw`relative h-full flex justify-between`}>
     <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
  <View style={tw`bg-white rounded-3xl justify-center items-center w-5/6 py-3 tablet:py-8 mx-auto`}>
    <Text style={tw`text-gray-800 text-2xl tablet:text-4xl font-bold`}>
      ¡Felicitaciones!
    </Text>
    <Text style={tw`text-gray-500 text-base font-light text-center px-10 tablet:text-2xl my-2`}>
      Su cuenta ha sido creada con éxito, un administrador procederá a darle
      una revisión para permitirle su acceso y uso del sistema.
    </Text>
    <Text style={tw`text-gray-500 text-sm font-light text-center px-10 tablet:text-2xl mt-4`}>
      Le notificaremos tras su aprobación
    </Text>
  </View>
</View>
      <View style={tw` w-4/6 bottom-4 mx-auto justify-center items-center `}>
        <Button title="Cerrar Sesion" onPress={() => signOut()} />
      </View>
    </SafeAreaView>
  );
}
