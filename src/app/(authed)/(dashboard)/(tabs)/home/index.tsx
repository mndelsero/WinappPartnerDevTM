import { View, Text, Image, Dimensions, FlatList } from "react-native";
import React from "react";
import tw from "@/config/tw";
import useGlobalStore from "@/store/useGlobalStore";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import HomeHeader from "@/components/HomeHeader";
import ButtonHome from "@/components/ButtonHome";
import { Feather } from "@expo/vector-icons";
import {  Stack, useRouter } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    id: 1,
    name: "Productos",
    icon: "package",
    href: "(authed)/(dashboard)/(tabs)/home/products",
  },
  {
    id: 2,
    name: "Pedidos",
    icon: "shopping-cart",
    href: "(authed)/(dashboard)/(tabs)/home/orders/pending",
  },
  {
    id: 3,
    name: "Historial",
    icon: "clock",
    href: "(authed)/(dashboard)/(tabs)/home/history",
  },
  {
    id: 4,
    name: "Usuarios",
    icon: "users",
    href: "(authed)/(dashboard)/(tabs)/home/users",
  },
  {
    id: 5,
    name: "Regalos",
    icon: "gift",
    href: "(authed)/(dashboard)/(tabs)/home/gifts",
  },
  {
    id: 6,
    name: "Recompensas",
    icon: "award",
    href: "(authed)/(dashboard)/(tabs)/home/awards",
  },
  {
    id: 7,
    name: "Estadísticas",
    icon: "bar-chart-2",
    href: "(authed)/(dashboard)/(tabs)/home/statistics",
  },
  /* {
    id: 7,
    name: "Escanear",
    href: "(authed)/(dashboard)/scan",
    image: () => (
      <Image
        resizeMode="contain"
        source={require("../../../../assets/images/escanear.png")}
        style={tw`w-20 h-20 tablet:w-40 tablet:h-40`}
      />
    ),
  },
  {
    id: 8,
    name: "Escaneados",
    href: "(authed)/(dashboard)/scanned",
    image: () => (
      <Image
        source={require("../../../../assets/images/escaneados.png")}
        style={tw`w-20 h-20 tablet:w-40 tablet:h-40`}
      />
    ),
  }, */
];

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView >

    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
   <View style={tw`h-full bg-background px-4`}>
  <View style={tw`flex  `}>
    <FlatList
      style={tw`w-full mx-auto h-full `}
      ListHeaderComponent={<HomeHeader />}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={Dimensions.get("window").width >= 1024 ? 3 : 1}
      renderItem={({ item, index }) => {
        const width = Dimensions.get("window").width;
        const column = "width" in item ? item.width : "w-full";
        const marginTop = index != 4 ? "mt-0" : "mt-16";
        const borderRadius = (index === 0 || index === 4) ? "rounded-t-2xl" : (index === 3 || index === 6) ? "rounded-b-lg" : "";
        const iconSize = width >= 1024 ? 35 : (width >= 768 ? 30 : 20); // Tamaño del icono basado en el ancho de la pantalla
        const padding = width >= 1024 ? "py-10" : (width >= 768 ? "py-10" : "py-3"); // Padding basado en el ancho de la pantalla
        return (
          <View
            style={tw`$flex flex-column mt-3rem  bg-white justify-start items-start mx-auto p-0`}
          >
            {item.icon ? (
              <ButtonHome
                text={item.name}
                icon={() => {
                  return (
                    <Feather name={item.icon} size={iconSize} style={tw`text-primary ml-3 mr-3`} />
                  );
                }}
                onPress={() => {
                  if (item.href) {
                    router.push(item.href);
                  }
                }}
              />
            ) : (
              <ButtonHome
                isImage
                text={item.name}
                icon={item.image}
                onPress={() => {
                  if (item.href) {
                    router.push(item.href);
                  }
                }}
              />
            )}
          </View>
        );
      }}
    />
  </View>
</View>
    </SafeAreaView>
  );
}
