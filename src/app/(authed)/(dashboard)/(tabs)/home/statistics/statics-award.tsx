import tw from "@/config/tw";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import Button from "../../../../../../components/Button";
import SelectDates from "@/components/SelectDates";

const users = [{ id: "1", recompensa: "2X1", code: "123" }];

for (let i = 2; i <= 20; i++) {
  users.push({
    id: i.toString(),
    recompensa: `${i}% de descuento`,
    code: (i * 123).toString(),
  });
}

export default function StaticsAward() {
  const [displayCount, setDisplayCount] = useState(5);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Estadísticas Recompensas" />,
        }}
      />
      <View style={tw`flex flex-1 w-full h-screen bg-background px-4`}>
        <View style={tw`w-full flex-row items-center px-4 `}>
          <View style={tw`w-1/2  `}>
            <SelectDates />
          </View>
          <View style={tw`w-1/2  flex items-end `}>
            <Text style={tw`text-sm md:text-xl lg:text-xl `}>
              3 de abril - 2 mayo
            </Text>
          </View>
        </View>
        <View
          style={tw`flex flex-col items-center mt-6 mb-4 md:mt-10 md:mb-10`}
        >
          <Text style={tw`text-2xl font-bold text-primary md:text-4xl`}>
            100
          </Text>
          <Text style={tw`text-base md:text-xl`}>Recompensas</Text>
        </View>

        <FlatList
          data={users.slice(0, displayCount)}
          style={tw`w-full mt-4  `}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tw`w-full flex flex-row justify-between mb-4 mx-4  border-b border-gray-200 `}>
              <Text style={tw`text-sm md:text-xl`}>
                <Text style={tw` text-gray-500`}>recompensa: </Text>
                {item.recompensa}
              </Text>
              <Text style={tw`text-sm md:text-xl text-gray-500 mr-10`}>
                {" "}
                <Text style={tw` text-primary`}># {item.code}</Text>
              </Text>
            </View>
          )}
          ListFooterComponent={() =>
            displayCount < users.length && (
              <TouchableOpacity onPress={() => setDisplayCount(users.length)}>
                <Text style={tw`text-primary text-center`}>Mostrar más</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </>
  );
}
