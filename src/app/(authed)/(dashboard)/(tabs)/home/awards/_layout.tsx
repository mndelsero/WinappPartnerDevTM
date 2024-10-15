import React from "react";

import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

export default function giftsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add-awards"
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Agregar Recompensa " />
          
        }}
      />
    </Stack>
  );
}
