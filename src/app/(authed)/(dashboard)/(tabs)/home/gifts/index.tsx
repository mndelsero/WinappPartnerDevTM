import { View, Text, Touchable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import Discount from "@/components/Discount";
import { useQuery } from "react-query";
import ApiService from "@/services/ApiService";
import { useAuth } from "@clerk/clerk-expo";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import { Stack, useRouter, useSegments } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";
import Button from "@/components/Button";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const { getToken } = useAuth();
  const { business } = useGlobalStore();
  const segments = useSegments();
  const { isFetching, data, isError, refetch } = useQuery({
    queryKey: "awards",
    queryFn: async () => {
      const token = await getToken({ template: "supabase" });
      if (!token) {
        return [];
      }
      const apiService = new ApiService(token);
      const awards = await apiService.getGifts(business.id ?? -1, 2);
      return awards;
    },
  });

  useEffect(() => {
    if (segments.includes("gifts")) {
      refetch();
    }
  }, [segments]);
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <DashboardHeader
              title="Regalos" add href="/(authed)/(dashboard)/(tabs)/home/gifts/add-gifts"
             
            />
          ),
        }}
      />
      <ScrollView style={tw`px-2 bg-background h-full py-2`}>
        


        <WithLoading isLoading={isFetching} error={isError}>
          {data?.length === 0 && (
            <Text style={tw`text-center mt-10 text-primary tablet:text-2xl`}>
              No hay productos en esta categoría
            </Text>
          )}
          {data?.map((award) => (
            <Discount
              id={award.id}
              key={award.id}
              description={award.description ?? ""}
              title={award.name ?? ""}
              points={award.point_cost ?? undefined}
              refetch={refetch}
              type="gifts"
            />
          ))}
        </WithLoading>
      </ScrollView>
    </>
  );
}
