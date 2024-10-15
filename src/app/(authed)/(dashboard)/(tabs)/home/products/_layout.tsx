import React from "react";

import { Stack } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

export default function ProductsLayout() {

    return (
        <Stack>

            <Stack.Screen
                name="[id]/edit"
                options={{
                  headerShown: false,
                  header: () => <DashboardHeader title="Editar Productoss" notBack />,
                }}
              /> 
              <Stack.Screen
            name="add-product"
            options={{
              headerShown: true,
              header: () => <DashboardHeader title="Agregar Productos" />,
            }}
          />
        </Stack>
    )
}