import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import CartIcon from "./CartIcon";
import useGlobalStore from "@/store/useGlobalStore";
import useCartStore from "@/store/useCartStore";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Fontisto  } from "@expo/vector-icons";

export default function HomeHeader() {
	const { business } = useGlobalStore();
	const { signOut } = useAuth();
	const { user } = useUser();
	return (
		<>
			<View
				style={tw`h-18 flex justify-start w-full flex-row  items-center justify-between px-4 tablet:px-8 py-4 mb-4`}
			>
				<View style={tw`flex-row`}>
					{/* <Image
						resizeMode="contain"
						style={tw`w-20 h-30 tablet:w-40 tablet:h-60`}
						source={require("../../assets/images/logo-icon.png")}
					/>
					<Image
						resizeMode="contain"
						style={tw`w-20 h-30 tablet:w-40 tablet:h-60`}
						source={require("../../assets/images/partners.webp")}
					/> */}
					<Text
				style={tw`text-primary font-bold text-3xl tablet:text-3lg text-center`}
			>
				{business.name} 
			</Text>
				</View>
				<View style={tw`flex-row items-center gap-4`}>
					<Text
						style={tw`text-primary font-bold text-base tablet:text-3xl text-center`}
					>
						{/* {user?.firstName?.charAt(0)}.{user?.lastName} */} 
					</Text>
					<TouchableOpacity onPress={() => signOut()}>
						<Fontisto
							name="power"
							color={tw.color("primary")}
							size={Dimensions.get("window").width >= 1024 ? 35 : 25}
						/>
					</TouchableOpacity>
				</View>
			</View>
			
		</>
	);
}
