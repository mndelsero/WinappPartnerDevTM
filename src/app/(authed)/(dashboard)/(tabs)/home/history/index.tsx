import DashboardHeader from "@/components/DashboardHeader";
import HistoryOrder from "@/components/HistoryOrder";
import Order from "@/components/Order";
import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { Status } from "@/utils/constants";
import { useAuth } from "@clerk/clerk-expo";
import { Stack, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";

export default function Index() {
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const segments = useSegments();


	//consulta de prueba con datos locales
	const localData = [
		{
		  "id": "#23423",
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
		  "code_type": "tipo1",
		  "status": 1,
		  "created_at": "2022-01-01T00:00:00Z"
		},
		{
		  "id": "#54545",
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
		  "hasUsedCode": true,
		  "code_type": "tipo2",
		  "status": 2,
		  "created_at": "2022-02-01T00:00:00Z"
		},
		{
			"id": "#66465",
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
			"code_type": "tipo3",
			"status": 3,
			"created_at": "2022-03-01T00:00:00Z"
		  },	
		  {
			"id": "#63423",
			"user": {
			  "clientName": "Cliente 4"
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
			"code_type": "tipo1",
			"status": 1,
			"created_at": "2022-01-01T00:00:00Z"
		  },
		  {
			"id": "#74545",
			"user": {
			  "clientName": "Cliente 5"
			},
			"total_price": 200.0,
			"details": [
			  {
				"product_id": "3",
				"product_name": "Producto 3",
				"quantity": 1
			  }
			],
			"hasUsedCode": true,
			"code_type": "tipo2",
			"status": 2,
			"created_at": "2022-02-01T00:00:00Z"
		  },
		  {

			"id": "#96465",
			"user": {
			  "clientName": "Cliente 6"
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
			"code_type": "tipo3",
			"status": 3,
			"created_at": "2022-03-01T00:00:00Z"

		  }
		  
		
	  ];
	  
	  const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["pendingOrders", segments],
		queryFn: async () => {
		  // Simula un retraso de red
		  await new Promise(resolve => setTimeout(resolve, 1000));
		  return localData;
		},
	  });

	  //consulta funcionando la base de datos en  
	/* const { data, isFetching, isError, refetch } = useQuery({
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
	}); */



	return (
        <>
         <Stack.Screen
        options={{
          headerShown: true,
          header: () => <DashboardHeader title="Historial" />,
        }}
      />

		<ScrollView style={tw`px-2   flex-1 `}>
				<WithLoading isLoading={isFetching} error={isError}>
			<View style={tw`flex gap-4  mb-4`}>
					{data?.length === 0 && (
						<Text style={tw`text-center text-lg text-primary`}>
							No hay pedidos
						</Text>
					)}
					{data?.map((order) => (
						<HistoryOrder
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
							date={order.created_at}
							refetch={refetch}
						/>
					))}
			</View>
				</WithLoading>
		</ScrollView>
        </>
	);
}
