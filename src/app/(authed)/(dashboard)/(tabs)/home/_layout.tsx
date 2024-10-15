import React from "react";

import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="products"
        options={{
          headerShown: false,
          title: "Productos",
        }}
      />

      <Stack.Screen
        name="gifts"
        options={{
          headerShown: false,
          title: "Regalos",
        }}
      />

      <Stack.Screen
        name="awards"
        options={{
          headerShown: false,
          title: "Recompensas",
        }}
      />

      <Stack.Screen
        name="statistics"
        options={{
          headerShown: false,
          title: "Estadísticas",
        }}
      />

      <Stack.Screen
        name="users"
        options={{
          headerShown: false,
          title: "Usuarios",
        }}
      />

    <Stack.Screen
        name="orders"
        options={{
          headerShown: true,
          title: "Orders",
          header: () => <DashboardHeader title="Ordenes" add2="Ver Historial" href2="/(authed)/(dashboard)/(tabs)/home/history" />,
        }}
      />

        
    <Stack.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
        }}
      />



    </Stack>
  );
}
