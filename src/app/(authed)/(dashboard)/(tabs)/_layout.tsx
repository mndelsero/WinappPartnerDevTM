import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useSegments } from "expo-router";
import tw from "@/config/tw";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Dimensions, Platform, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DashboardHeader from "@/components/DashboardHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Calcula el tamaño del ícono en función de las dimensiones de la ventana
const iconSize = Math.min(windowWidth, windowHeight) * 0.08;
const tabBarHeight = windowHeight * 0.1; // El 0.1 es un factor de escala que puedes ajustar a tus necesidades
const tabBarWidth = windowWidth * 0.9; // El 0.9 es un factor de escala que puedes ajustar a tus necesidades
const iconPadding = Math.min(windowWidth, windowHeight) * 0.01; // El 0.01 es un factor de escala que puedes ajustar a tus necesidades
export default function TabLayout() {
	const segment = useSegments();

	console.log(segment[3]);
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: tw.color("primary"), // Color del ícono de la pestaña activa
						tabBarInactiveTintColor: tw.color("black"),
						// Color del ícono de la pestaña inactiva
						tabBarStyle: {
							backgroundColor: tw.color("white"),
							borderRadius: 30, // Bordes redondeados
							height: tabBarHeight, // Altura de la barra de pestañas
							width: tabBarWidth, // Ancho de la barra de pestañas
							marginHorizontal: 10, // Margen horizontal
							marginBottom: 10, // Margen inferior
						}, // Estilo del fondo de la barra de pestañas
						headerShown: false, // Oculta el encabezado
            /* tabBarItemStyle: {
              height: tabBarHeight
            }, */
					}}
				>
					<Tabs.Screen
						name="scan"
						options={{
							header: () => <DashboardHeader title="Escanear QR" notBack />,
							tabBarItemStyle: {
								marginHorizontal: 30,
								height: 55,

								marginTop:  Platform.OS ==='ios' ? 14: 11,
								borderCurve: "circular",
								borderRadius: 30,
								backgroundColor:
									segment[3] === "scan" ? tw.color("gray-200") : "white",
							},
							headerShown: true,
							tabBarShowLabel: false, // Oculta el título de la pestaña
							tabBarIcon: ({ color, focused }) => (
								<MaterialCommunityIcons
									name="line-scan"
									size={iconSize}
									color={color}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name="home"
						options={{
							tabBarItemStyle: {
								marginHorizontal: Platform.OS ==='ios' ? 30: 20,
								height: 55,

								marginTop:  Platform.OS ==='ios' ? 14: 11,
								borderCurve: "circular",
								borderRadius: 30,
								backgroundColor:
									segment[3] === "home" ? tw.color("gray-200") : "white",
							},
							tabBarShowLabel: false, // Oculta el título de la pestaña
							tabBarIcon: ({ color, focused }) => (
								<SimpleLineIcons name="home" size={iconSize} color={color} />

								// style={tw`bg-${
								// 	focused ? "gray-200" : "transparent"
								// } rounded-full p-3 border border-${
								// 	focused ? "gray-200" : "transparent"
								// }`}
							),
						}}
					/>

					<Tabs.Screen
						name="scanned"
						options={{
							tabBarItemStyle: {
								marginHorizontal: 30,
								height: 55,
								marginTop:  Platform.OS ==='ios' ? 14: 11,
								borderCurve: "circular",
								borderRadius: 30,
								backgroundColor:
									segment[3] === "scanned" ? tw.color("gray-200") : "white",
							},
							headerShown: true,
							header: () => <DashboardHeader title="Escaneados" notBack />,
							tabBarShowLabel: false, // Oculta el título de la pestaña
							tabBarIcon: ({ color, focused }) => (
								<Feather name="check-square" size={iconSize} color={color} />
							),
						}}
					/>
				</Tabs>
			</SafeAreaView>
		</View>
	);
}
