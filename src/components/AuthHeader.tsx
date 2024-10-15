import { View, Image } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Text } from "react-native";

interface AuthHeaderProps {
	back?: boolean;
	signOut?: boolean;
	title?: string;
}
export default function AuthHeader({
	back = true,
	signOut = false,
	title = "",
}: AuthHeaderProps) {
	const router = useRouter();
	const { signOut: signOutFn } = useAuth();
	return (
		<SafeAreaView
			style={tw`bg-white  flex flex-row justify-between items-center px-3 relative `}
		>

<View
			style={tw``}
		>

			<View style={tw`flex-row items-center gap-3`}>
			{back && (

					<MaterialIcons
					onPress={() => {
						if (router.canGoBack()) {
							router.back();
						} else {
							router.push("/");
						}
					}}
					name="arrow-back"
					size={35}
					color={tw.color("primary")}
					style={tw`text-4xl tablet:text-5xl left-3 rounded-full`}
					/>
				
			)}

			{title && (
				<View style={tw`  `}>
					<Text
						style={[
							tw`text-black text-right ml-4  text-2xl tablet:text-6xl`,
						]}
					>
						{title}
					</Text>
				</View>
			)}

		</View>

			
			

			{signOut && (
				<AntDesign
					onPress={() => signOutFn()}
					name="logout"
					color="white"
					style={tw`text-4xl tablet:text-5xl absolute phone:top-18 top-2/4 right-3 rounded-full`}
				/>
			)}
		</View>
		</SafeAreaView>
	);
}
