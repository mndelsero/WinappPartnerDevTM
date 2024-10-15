import { StyleSheet, Image, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@clerk/clerk-expo";
import LoadingScreen from "@/components/LoadingScreen";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";

export default function IndexScreen() {
	const router = useRouter();
	const [loading, setLoading] = React.useState(true);
	const { isSignedIn, isLoaded, getToken, userId } = useAuth();
	const { setBusiness } = useGlobalStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			setLoading(true);
			if (!isLoaded) {
				return;
			}
			if (isSignedIn) {
				const token = await getToken();
				if (!token) {
					return;
				}
				const apiService = new ApiService();
				const bussiness = await apiService.getBussinessByUser(token);

				console.log("bussiness", bussiness);
				
				if (bussiness) {
					if (bussiness.active) {
						// TODO
						setBusiness(bussiness);
						router.replace("/(authed)/(dashboard)/(tabs)/home");
						return;
					}
					router.push("/(authed)/(pre-active)/revision");
					return;
				}
				router.push("/(authed)/(pre-active)/create-bussiness");
			} else {
				setLoading(false);
			}
		})();
	}, [isLoaded, isSignedIn]);

	return (
		<View style={tw` h-full flex  items-center justify-center bg-white`}>
			<Image
				style={{
					height: 100,
					width: 300,
				}}
				resizeMode="cover"
				source={require("../../../assets/images/logo-white.png")}
			/>
			<View>
				<ActivityIndicator size={40} color={tw.color("white")} />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	textLogo: {
		position: "absolute",
		bottom: 80,
		fontSize: 35,
		fontWeight: "bold",
	},
});
