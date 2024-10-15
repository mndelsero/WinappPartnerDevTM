import tw from "@/config/tw";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import Button from "../../../../../../components/Button";
import SelectDates from "@/components/SelectDates";

const users = [
  {
    id: "1",
    image: "../../assets/images/user.jpg",
    email: "correo1@example.com",
    date: "12/12/2021",
  },
];

for (let i = 2; i <= 20; i++) {
  users.push({
    id: i.toString(),
    image: "../../assets/images/user.jpg",
    email: `correo${i}@example.com`,
    date: "12/12/2021",
  });
}

export default function StaticsUsuario() {
  const [displayCount, setDisplayCount] = useState(5);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Estadísticas Usuarios" />,
        }}
      />
      <View style={tw`w-full flex flex-1 h-screen bg-background px-4`}>
      <View style={tw`w-full flex-row items-center px-4`}>
          <View style={tw`w-1/2 `}>
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
            5620
          </Text>
          <Text style={tw`text-base md:text-xl`}>Usuarios Nuevos</Text>
        </View>


        <FlatList
          data={users.slice(0, displayCount)}
          style={tw`w-full mt-4 `}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tw`w-full flex flex-row  mb-4 mx-4  border-b border-gray-200`}>
              <Image
                source={require("../../../../../../../assets/images/user.jpg")}
                style={tw`w-10 h-10 rounded-full mr-4`}
              />
              <View>
                <Text style={tw`text-sm md:text-xl `}>
                  <Text style={tw`text-sm md:text-xl text-gray-500`}>Email: </Text>
                  {item.email}
                </Text>
                <Text style={tw`text-sm md:text-xl text-gray-500`}>
                  fecha:{" "}
                  <Text style={tw`text-sm md:text-xl  text-gray-500`}> {item.date}</Text>
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={() =>
            displayCount < users.length && (
              <TouchableOpacity
                onPress={() => setDisplayCount(users.length)}
              >
                <Text style={tw`text-primary text-center text-sm md:text-xl`}>Mostrar más</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </>
  );
}
