import Order from "@/components/Order";
import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { Status } from "@/utils/constants";
import { useAuth } from "@clerk/clerk-expo";
import { useSegments } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";

export default function takeaway() {
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const segments = useSegments();
	const { data: data, isFetching, isError, refetch } = useQuery({
		queryKey: "Takeaway",
		queryFn: async () => {
			const token = (await getToken()) ?? "";
			const apiService = new ApiService();


			let orders = await apiService.getOrdersByStatus("Done", token);
			const data = orders
			console.log(data)
			return data
		},
	});



	console.log(data);
	return (
		<ScrollView style={tw`px-2  mt-4 flex-1`}>
		<View style={tw`px-2 flex gap-4`}>
				<WithLoading isLoading={isFetching} error={isError}>
				<View style={tw`flex gap-4 mb-4`}>
					{data?.length === 0 && (
						<Text style={tw`text-center text-lg text-primary`}>
							No hay pedidos pendientes
						</Text>
					)}
					{data?.map((order:any) => (
							<Order
								key={order.id}
								clientName={order.subscriptionId}
								orderId={order.id}
								orderTotal={order.totalPrice}
								orderDetail={order.productOrders.map((detail:any) => ({
									product_id: detail.id,
									product: detail.name,
									quantity: detail.quantity,
									addons:detail.productOrderAddons.map((addon:any) => ({
										addon_id: addon.id,
										addon_name: addon.name,
										addon_description: addon.quantity,
										
									}))
								}))}
								// hasUsedCode={order.hasUsedCode}
								// type={order.code_type}
								status={order.status}
								date={order.created_at}
								refetch={refetch}
								discount={order.discount}
							/>
						))}
					</View>
				</WithLoading>
			</View>
		</ScrollView>
	);
}
