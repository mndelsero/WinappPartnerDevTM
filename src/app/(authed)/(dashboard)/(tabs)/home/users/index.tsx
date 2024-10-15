import tw from "@/config/tw";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import { AntDesign } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

const users = [
  {
    id: "1",
    image: "../../assets/images/user.jpg",
    email: "correo1@example.com",
    date: "12/12/2021",
    name: "Nombre 1",
    puntos: 100,
    phone: "+5834567890",
  },
];

for (let i = 2; i <= 20; i++) {
  users.push({
    id: i.toString(),
    image: "../../assets/images/user.jpg",
    email: `correo${i}@example.com`,
    date: "12/12/2021",
    name: `Nombre ${i}`,
    puntos: 100,
    phone: "+5834567890",
  });
}

export default function Index() {
  const [displayCount, setDisplayCount] = useState(5);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showDialog = (user) => {
    setSelectedUser(user);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Listado de usuarios" />,
        }}
      />
      <View style={tw`flex-1 flex w-full h-screen bg-background px-4`}>
        <FlatList
          data={users.slice(0, displayCount)}
          style={tw`w-full mt-2  `}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDialog(item)}>
              <View
                style={tw`w-full flex flex-row items-center justify-between gap-2  `}
              >
                <View
                  style={tw`flex-grow flex flex-col justify-between bg-white p-2 my-2 border border-gray-200 rounded-lg`}
                >
                  <Text style={tw`text-sm md:text-xl text-gray-500`}>
                    <Text style={tw`  text-primary`}>Nombre: </Text>
                    {item.name}
                  </Text>
                  <Text style={tw`text-sm md:text-xl text-primary mr-10`}>
                    Mail: <Text style={tw` text-gray-500`}>{item.email}</Text>
                  </Text>
                </View>

                <View
                  style={tw`bg-white  p-4 my-2 flex items-center rounded-lg`}
                >
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={tw.color("primary")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={() =>
            displayCount < users.length && (
              <TouchableOpacity onPress={() => setDisplayCount(users.length)}>
                <Text style={tw`text-primary text-center mt-2`}>
                  Mostrar más
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>

      {selectedUser && (

        <Dialog.Container visible={visible}  contentStyle={tw`dark:bg-white bg-white`} blurStyle={
          {backgroundColor:"#fff"}
        } >
          <TouchableOpacity
            style={tw`absolute top-2 right-2`}
            onPress={hideDialog}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Dialog.Description>
            <View style={tw`flex flex-col gap-2`}>
              <Text style={tw`text-sm text-primary`}>
                Nombre:{" "}
                <Text style={tw`text-sm text-gray-500`}>
                  {selectedUser.name}
                </Text>{" "}
              </Text>
              <Text style={tw`text-sm text-primary`}>
                Correo:{" "}
                <Text style={tw`text-sm text-gray-500`}>
                  {selectedUser.email}
                </Text>
              </Text>
              <View style={tw`flex-row flex-wrap items-start`}>
                <Text
                  style={tw`text-sm text-gray-900    `}
                >
                  Puntos: {selectedUser.puntos}
                </Text>
              </View>
              <View style={tw`flex-row items-center mt-2`}>
                <Text style={tw`text-sm text-primary mr-2`}>
                  Asignar puntos:
                </Text>
                <TextInput
                  style={tw`w-20 border  border-gray-300 px-2 rounded-lg `}
                  placeholder="cantidad"
                />
              </View>
              <Text style={tw`text-sm text-primary`}>
                Teléfono:{" "}
                <Text style={tw`text-gray-500 underline`}>
                  {selectedUser.phone}
                </Text>
              </Text>
            </View>
          </Dialog.Description>
              <TouchableOpacity
                style={tw`bg-red-500 p-2 rounded-lg flex justify-center items-center mt-2 shadow-lg`}
                onPress={() => {}}
              >
                <Text style={tw`text-white text-center`}>Eliminar usuarios</Text>
              </TouchableOpacity>
        </Dialog.Container>
      )}
    </>
  );
}
