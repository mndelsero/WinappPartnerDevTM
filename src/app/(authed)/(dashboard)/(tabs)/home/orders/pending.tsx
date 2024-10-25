import DashboardHeader from "@/components/DashboardHeader";
import Order from "@/components/Order";
import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { Status } from "@/utils/constants";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Stack, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";

export default function pending() {
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const segments = useSegments();
	const [ordersData, setOrdersData] = useState([])
	const { data: data, isFetching, isError, refetch } = useQuery({
		queryKey: "PendingOrders",
		queryFn: async () => {
			const token = (await getToken()) ?? "";
			const apiService = new ApiService();


			let orders = await apiService.getOrdersByStatus("Payment pending", token);
			const data = orders
			setOrdersData(data)
			// console.log(ordersData)
			return data
		},
	});

	useEffect(() => {

		refetch()
	}, [data]);

	useEffect(() => {

		refetch()
	}, []);
	//consulta de prueba con datos locales




	return (
		<>
			
			<ScrollView style={tw`px-2  mt-4 flex-1`}>
				<WithLoading isLoading={isFetching} error={isError}>
					<View style={tw`flex gap-4 mb-4`}>
						{data?.length === 0 && (
							<Text style={tw`text-center text-lg text-primary`}>
								No hay pedidos pendientes
							</Text>
						)}
						{ordersData?.map((order: any) => (
							<Order
								key={order.id}
								clientName={order.client.clientName}
								orderId={order.id}
								orderTotal={order.totalPrice}
								orderDetail={order.productOrders.map((detail: any) => ({
									product_id: detail.id,
									product: detail.name,
									quantity: detail.quantity,
									addons: detail.productOrderAddons.map((addon: any) => ({
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
			</ScrollView>
			<SafeAreaView
			style={tw`  absolute bottom-2 left-45% flex-row justify-center `}>
			<TouchableOpacity
				onPress={() => {
					refetch()
				}}
				style={tw`bg-blue-500 mb-3 z-1 rounded-2xl px-4 py-2 mt-4 self-center z-10 elevation-4 shadow-2xl tablet:px-6 tablet:py-3 tablet:rounded-3xl`}
			>
				<Text style={tw`text-white font-bold tablet:text-xl`}>
					Recargar
				</Text>
			</TouchableOpacity>
    </SafeAreaView>
			

		</>
	);
}
