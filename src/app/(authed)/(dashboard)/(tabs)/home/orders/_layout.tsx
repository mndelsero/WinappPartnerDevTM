import { MaterialTopTabs } from "@/components/TopTab";
import tw from "@/config/tw";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Dimensions, Text } from "react-native";


export default function _layout() {
	const [activeTab, setActiveTab] = useState("pending"); // Estado para el tab activo

	
	return (

		<>
		
		<MaterialTopTabs>
			<MaterialTopTabs.Screen
				name="pending"
				options={{
					title: "Pendientes",
					tabBarActiveTintColor: tw.color("primary"),
					tabBarInactiveTintColor: tw.color("gray-500"),
					tabBarLabelStyle: {
						fontSize: Dimensions.get("window").width >= 1024 ? 20 : 12,
					},
					lazy: true,
					tabBarIndicatorStyle: {
						backgroundColor: tw.color("primary"),
					},
				}}
			/>
			<MaterialTopTabs.Screen
				name="preparing"
				options={{
					title: "En preparación",
					lazy: true,
					tabBarLabelStyle: {
						fontSize: Dimensions.get("window").width >= 1024 ? 20 : 12,
					},
					tabBarIndicatorStyle: {
						backgroundColor: tw.color("primary"),
					},
				}}
			/>
				<MaterialTopTabs.Screen
				name="takeaway"
				options={{
					title: "Retirar",
					tabBarActiveTintColor: tw.color("primary"),
					tabBarInactiveTintColor: tw.color("gray-500"),
					tabBarLabelStyle: {
						fontSize: Dimensions.get("window").width >= 1024 ? 20 : 12,
					},
					lazy: true,
					tabBarIndicatorStyle: {
						backgroundColor: tw.color("primary"),
					},
				}}
			/>
		</MaterialTopTabs>
		</>
	);
}
