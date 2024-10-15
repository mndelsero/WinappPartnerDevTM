import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import CartIcon from "./CartIcon";
import useGlobalStore from "@/store/useGlobalStore";
import useCartStore from "@/store/useCartStore";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function DashboardHeader({
	title,
	add = false,
	add2 ,
	href,
	href2,
	icon2,
	icon,
	notBack =false,
}: { title: string; add?: boolean; href?: string; icon?: string, notBack?: boolean, add2?: string, href2?: string, icon2?: string}) {
	const router = useRouter();
	return (
		<SafeAreaView edges={["top","left","right"]} >

		<View
			style={tw`h-24 flex justify-start w-full flex-row   items-center justify-between px-4 tablet:px-8 bg-background relative`}
		>
			<View style={tw`flex-row items-center gap-3`}>
				<TouchableOpacity onPress={() => notBack ? router.push('/(authed)/(dashboard)/(tabs)/home') : router.back() }>
					<MaterialIcons
						name="arrow-back"
						size={35}
						color={tw.color("primary")}
					/>
				</TouchableOpacity>
				<Text style={tw`text-primary font-light text-lg tablet:text-3xl `}>
					{title}
				</Text>
			</View>
			<View style={tw`flex  flex-row gap-4`}>

			{add2 && (
				<TouchableOpacity
					onPress={() => {
						if (href2) {
							// @ts-ignore
							router.push(href2);
						}
					}}
				>
					<Text style={tw`text-primary underline font-light text-sm tablet:text-3xl`}>
						{add2}
					</Text>
				</TouchableOpacity>
			)}
			{add && (
				<TouchableOpacity
					onPress={() => {
						if (href) {
							// @ts-ignore
							router.push(href);
						}
					}}
				>
					<FontAwesome5 
						// @ts-ignore
						name={icon ?? "plus"}
						size={Dimensions.get("window").width >= 1024 ? 40 : 25}
						color={tw.color("primary")}
					/>
				</TouchableOpacity>
			)}
			</View>

			
		</View>
		</SafeAreaView>
	);
}
