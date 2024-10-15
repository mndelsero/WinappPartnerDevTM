import React from "react";

import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

export default function HomeLayout() {
  return (
    <Stack>
        <Stack.Screen
            name="statics-usuario"
            options={{
              headerShown: false,
              header: () => <DashboardHeader title="Estasdasd" />,
            }}
          /> 

          <Stack.Screen
        name="statics-award"
        options={{
          headerShown: false,
          header: () => <DashboardHeader title="Estadísticas Recompensas"  />,
        }}
      />

      <Stack.Screen
        name="statics-sales"
        options={{
          headerShown: false,
        }}
      />
     
    </Stack>
)
}