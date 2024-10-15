import tw from "@/config/tw";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import Button from "../../../../../../components/Button";
import SelectDates from "@/components/SelectDates";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Estadísticas" />,
        }}
      />
      <ScrollView style={tw` flex flex-1 w-full h-screen bg-background px-4`}>
      <View style={tw`w-full flex-row items-center px-4`}>
  <View style={tw`w-1/2 `}>
    <SelectDates />

  </View>
  <View style={tw`w-1/2  flex items-end `}>
    <Text style={tw`text-sm md:text-xl lg:text-xl`}>3 de abril - 2 mayo</Text>
  </View>

</View>

<View style={tw`w-full flex-col mt-8 px-4` }>
  <TouchableOpacity onPress={()=> router.push("/(authed)/(dashboard)/(tabs)/home/statistics/statics-sales")} 
  style={tw`flex flex-row justify-between items-center mb-8 `}>
    <Text style={tw`text-sm md:text-lg lg:text-xl`}>Ventas alcanzadas</Text>
    <View style={tw`flex flex-row items-center`}>
      <View style={tw`pr-1`}>
        <Text style={tw`text-sm font-bold md:text-lg lg:text-xl`}>10 mil</Text>
        <Text style={tw`text-xs text-primary md:text-sm lg:text-lg`}>+ 10%</Text>
      </View>
      <Icon name="chevron-forward" size={24} color="#000" />
    </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>  router.push("/(authed)/(dashboard)/(tabs)/home/statistics/statics-award")} 
    style={tw`flex flex-row justify-between items-center mb-8`}>
    <Text style={tw`text-sm md:text-lg lg:text-xl`}>Recompensas Realizadas</Text>
    <View style={tw`flex flex-row items-center`}>
    <View style={tw`pr-1`}>
        <Text style={tw`text-sm font-bold md:text-lg lg:text-xl`}>1 mil</Text>
        <Text style={tw`text-xs text-primary md:text-sm lg:text-lg`}>+ 30%</Text>
      </View>
      <Icon name="chevron-forward" size={24} color="#000" />
    </View>
  </TouchableOpacity>

  <TouchableOpacity 
  onPress={()=>  router.push("/(authed)/(dashboard)/(tabs)/home/statistics/statics-usuario")} 
   style={tw`flex flex-row justify-between items-center mb-8`}>
    <Text style={tw`text-sm md:text-lg lg:text-xl`}>Usuarios</Text>
    <View style={tw`flex flex-row items-center`}>
    <View style={tw`pr-1`}>
        <Text style={tw`text-sm font-bold md:text-lg lg:text-xl`}>5 mil</Text>
        <Text style={tw`text-xs text-primary md:text-sm lg:text-lg`}>+ 10%</Text>
      </View>
      <Icon name="chevron-forward" size={24} color="#000" />
    </View>
  </TouchableOpacity>
</View>
      </ScrollView>
    </>
  );
}
