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

export default function preparing() {
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const segments = useSegments();
	/* const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["preparingOrders", segments],
		queryFn: async () => {
			const token = (await getToken()) ?? "";
			const apiService = new ApiService(token);
			const orders = await apiService.getOrders(business.id, [
				Status.Preparing,
			]);
			return orders;
		},
	}); */


//consulta de prueba con datos locales
const localData = [
	{
	  "id": "1",
	  "user": {
		"clientName": "Cliente 1"
	  },
	  "total_price": 100.0,
	  "details": [
		{
		  "product_id": "1",
		  "product_name": "Producto 1",
		  "quantity": 2
		},
		{
		  "product_id": "2",
		  "product_name": "Producto 2",
		  "quantity": 1
		}
	  ],
	  "hasUsedCode": false,
	  "code_type": 54545,
	  "status": 2,
	  "created_at": "2022-01-01T00:00:00Z"
	},
	{
	  "id": "2",
	  "user": {
		"clientName": "Cliente 2"
	  },
	  "total_price": 200.0,
	  "details": [
		{
		  "product_id": "3",
		  "product_name": "Producto 3",
		  "quantity": 1
		}
	  ],
	  "discount": 10,
	  "hasUsedCode": true,
	  "code_type": 1,
	  "status": 2,
	  "created_at": "2022-02-01T00:00:00Z"
	},
	{
		"id": "3",
		"user": {
		  "clientName": "Cliente 3"
		},
		"total_price": 300.0,
		"details": [
		  {
			"product_id": "4",
			"product_name": "Producto 4",
			"quantity": 3
		  }
		],
		"hasUsedCode": false,
		"code_type": 55544,
		"status": 2,
		"created_at": "2022-03-01T00:00:00Z"
	  },		
	
  ];
  const { data, isFetching, isError, refetch } = useQuery({
	queryKey: ["pendingOrders", segments],
	queryFn: async () => {
	  // Simula un retraso de red
	  await new Promise(resolve => setTimeout(resolve, 1000));
	  return localData;
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
							discount={order.discount}
						/>
					))}
					</View>
				</WithLoading>
			</View>
		</ScrollView>
	);
}
