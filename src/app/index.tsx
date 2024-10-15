import { StyleSheet, Image, View, Text } from "react-native";
import React, { useEffect } from "react";
import tw from "../config/tw";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@clerk/clerk-expo";
import LoadingScreen from "@/components/LoadingScreen";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";

export default function IndexScreen() {
	const router = useRouter();
	const [loading, setLoading] = React.useState(true);
	const { isSignedIn, isLoaded, getToken, userId, signOut } = useAuth();
	const { setBusiness } = useGlobalStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			console.log("ESTOY EN APP INDEX")
			setLoading(true);
			if (!isLoaded) {


				return;
			}
			if (isSignedIn) {
				const token = await getToken();
				if (!token) {
					console.log("no hay token")
					return;
				}
				
				const apiService = new ApiService();
				const businessData = await apiService.getBussinessByUser(token);

				if (businessData && businessData.status === "success") {
					
					router.push("/(authed)/(pre-active)/select-category");

				}
				
				// const apiService = new ApiService();
				// const businessData = await apiService.getBussinessByUser(token);
				setLoading(false);

			}
			else {
				setLoading(false)

			}


		})();
	}, [isLoaded, isSignedIn]);



	return (
		<View style={tw`bg-white h-full flex justify-between relative`}>
			{loading ? (
				<LoadingScreen />
			) : (
				<View style={tw.style("bg-white h-full flex justify-between")}>
					<View style={tw`flex justify-center items-center`}>
						<Image
							style={tw`w-4/6 tablet:h-96  relative mx-auto my-8`}
							resizeMode="contain"
							source={require("../../assets/images/logoInicio.webp")}
						/>
						{/* <Text style={styles.textLogo}>WINAPP</Text> */}
					</View>
					<View style={tw`mb-10 flex justify-center items-center gap-4`}>
						<Button
							onPress={() => router.push("/(auth)/sign-in")}
							title="Iniciar Sesión"
							outline
							color={tw.color("primary")}
							textColor={tw.color("primary")}
						/>
						<Button
							onPress={() => router.push("/(auth)/sign-up")}
							title="Registrarse"
							color={tw.color("primary")}
							textColor="#fff"
						/>
					</View>
				</View>
			)}
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
