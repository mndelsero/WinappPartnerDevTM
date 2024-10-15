import React, { useEffect } from "react";
import { Redirect, Stack, useRouter } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import DashboardHeader from "@/components/DashboardHeader";

export default function AuthedLayout() {
  return (
    <>
      <SignedIn>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         
       
       {/*    <Stack.Screen
            name="awards"
            options={{
              headerShown: true,
              header: () => (
                <DashboardHeader
                  title="Recompensas"
                  add
                  href="/(authed)/(dashboard)/add-awards"
                />
              ),
            }}
          />
     
          <Stack.Screen
            name="add-awards"
            options={{
              headerShown: true,
              header: () => <DashboardHeader title="Agregar Recompensa" />,
            }}
          /> */}
         {/*  <Stack.Screen
            name="(orders)"
            options={{
              headerShown: true,
              header: () => <DashboardHeader title="Ordenes" />,
            }}
          /> */}
          {/* <Stack.Screen
            name="history"
            options={{
              headerShown: true,
              header: () => <DashboardHeader title="Historial" />,
            }}
          /> */}
        </Stack>
      </SignedIn>
      <SignedOut>
        <Redirect href="/(auth)/sign-in" />
      </SignedOut>
    </>
  );
}
