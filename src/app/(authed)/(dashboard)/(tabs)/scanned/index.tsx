import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "react-query";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import { formatDate } from "@/utils/helpers";
import { Stack } from "expo-router";

export default function Index() {
	const { getToken, userId } = useAuth();
	const { business } = useGlobalStore();
	const { isFetching, data, isError } = useQuery({
		queryKey: ["scannedOrders"],
		queryFn: async () => {
			const token = (await getToken()) ?? "";
			const apiService = new ApiService(token);
			const scanned = await apiService.getScannedCodes(
				business.id,
				userId ?? "",
			);
			return scanned;
		},
	});

	console.log(data?.[0]);

	return (
		<>
		<Stack.Screen options={{headerShown : false}}/>
		<View>
			<WithLoading isLoading={isFetching} error={isError}>
				<View style={tw`px-2 mx-auto w-full gap-4`}>
					{data?.length === 0 && <Text>No hay codigos escaneados</Text>}
					{data?.map((code) => (
						<View
							key={code.id}
							style={tw`bg-primary rounded-2xl px-4 flex flex-col py-4 `}
						>
							<Text style={tw` text-lg text-white tablet:text-xl`}>
								Has escaneado:
							</Text>
							<Text style={tw`text-white text-xl font-bold tablet:text-2xl`}>
								{code.GeneratedCodes.DiscountCodes.name}
							</Text>
							<Text style={tw`text-base text-white mt-2 tablet:text-lg`}>
								De {code.user.firstName} {code.user.lastName} el{" "}
								<Text style={tw`font-bold`}>{formatDate(code.created_at)}</Text>
							</Text>
						</View>
					))}
				</View>
			</WithLoading>
		</View>
		</>
	);
}

const styles = StyleSheet.create({});
