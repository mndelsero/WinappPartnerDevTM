import { MaterialTopTabs } from "@/components/TopTab";
import tw from "@/config/tw";
import React from "react";
import { Dimensions } from "react-native";

export default function _layout() {
	return (
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
		</MaterialTopTabs>
	);
}
