import Order from "@/components/Order";
import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { Status } from "@/utils/constants";
import { useAuth } from "@clerk/clerk-expo";
import { useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";

export default function History() {
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const segments = useSegments();
	const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["pendingOrders", segments],
		queryFn: async () => {
			const token = (await getToken()) ?? "";
			const apiService = new ApiService(token);
			const orders = await apiService.getOrders(business.id, [
				Status.Completed,
				Status.Completed,
				Status.ForPickup,
			]);
			console.log(orders);
			return orders;
		},
	});

	return (
		<View style={tw`mt-10`}>
			<View style={tw`px-2 flex gap-4`}>
				<WithLoading isLoading={isFetching} error={isError}>
					{data?.length === 0 && (
						<Text style={tw`text-center text-lg text-primary`}>
							No hay pedidos
						</Text>
					)}
					{data?.map((order) => (
						<Order
							key={order.id}
							clientName={order.user.clientName}
							orderId={order.id}
							orderTotal={order.total_price}
							orderDetail={order.details.map((detail) => ({
								product_id: detail.product_id,
								product: detail.product_name,
								quantity: detail.quantity,
							}))}
							hasUsedCode={order.hasUsedCode}
							type={order.code_type}
							status={order.status as Status}
							date={order.created_at}
							refetch={refetch}
						/>
					))}
				</WithLoading>
			</View>
		</View>
	);
}
