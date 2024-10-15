import React from "react";

import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

export default function giftsLayout() {
  return (
    <Stack>
       <Stack.Screen
            name="add-gifts"
            options={{
              headerShown: true,
              header: () => <DashboardHeader title="Agregar Regalos" />,
            }}
          />
    </Stack>
  )
}