import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import Discount from "@/components/Discount";
import { useQuery } from "react-query";
import ApiService from "@/services/ApiService";
import { useAuth } from "@clerk/clerk-expo";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import { Stack, useSegments } from "expo-router";
import DashboardHeader from "@/components/DashboardHeader";

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
			const awards = await apiService.getAwards(business.id ?? -1, 2);
			return awards;
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// @ts-ignore
		if (segments.includes("awards")) {
			refetch();
		}
	}, [segments]);

	return (
        <>
        <Stack.Screen  options={{ headerShown: true, header: () => <DashboardHeader title="Recompensas"  add href="/(authed)/(dashboard)/(tabs)/home/awards/add-awards" />, }} />
		<ScrollView style={tw`px-2 bg-background h-full py-2`}>
			<WithLoading isLoading={isFetching} error={isError}>
				{data?.length === 0 && (
					<Text style={tw`text-center mt-10 text-primary tablet:text-2xl`}>
						No hay productos en esta categoría
					</Text>
				)}
				{data?.map((award) => (
					<Discount
						key={award.id}
						description={award.description ?? ""}
						title={award.name ?? ""}
						points={award.point_cost ?? undefined}
						refetch={refetch}
						type="awards"
						id={award.id}
					/>
				))}
			</WithLoading>
		</ScrollView>
        </>
	);
}
