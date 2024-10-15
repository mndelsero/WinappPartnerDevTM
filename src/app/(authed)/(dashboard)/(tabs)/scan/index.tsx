import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { delay } from "@/utils/helpers";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth } from "@clerk/clerk-expo";
import { set } from "date-fns";
import { useRouter, Stack } from 'expo-router';
import React from "react";
import { useState } from "react";
import { Camera, CameraType } from  'expo-camera/legacy';
import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Index() {
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const { getToken, userId } = useAuth();
	const { business } = useGlobalStore();
	const router = useRouter();
	const [type, setType] = useState(CameraType.back);
	const [scanned, setScanned] = useState(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	const handleQRCodeScanned = async ({ type, data }: BarCodeScanningResult) => {
		if (scanned) {
			return;
		}
		setScanned(true);
		setLoading(true);
		const token = await getToken({ template: "supabase" });
		if (!token) {
			return;
		}
		const apiService = new ApiService(token ?? "");
		const exist = await apiService.getDiscountById(data, business.id);
		console.log("EXIST", exist);
		if (!exist) {
			setNotFound(true);
			setLoading(false);
			await delay(2000);
			setScanned(false);
			return;
		}

		apiService
			.ScanCode(data, business.id, userId ?? "")
			.catch((e) => {
				toast.error(e.message ?? "Error al escanear el codigo");
				setScanned(false);
				setLoading(false);
				return false;
			})
			.then((res) => {
				if (!res) {
					return;
				}
				setScanned(false);
				setLoading(false);
				toast.success("Codigo escaneado con exito");
				router.push("/(authed)/(dashboard)/(tabs)/home");
				return res;
			});
	};
	return (
    <>
      <Stack.Screen  options={{headerShown:false}} />
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				type={type}
				onBarCodeScanned={(data) => {
					handleQRCodeScanned(data);
				}}
			>
				<View
					style={tw`bg-transparent h-82 w-82 items-center border-2 border-white`}
				>
					{loading ? (
						<ActivityIndicator size="large" color="white" />
					) : (
						<Text style={tw`text-white`}>
							{notFound ? "No se encontro el codigo" : "Escanea el codigo"}
						</Text>
					)}
				</View>
				<View>
					<TouchableOpacity
						activeOpacity={0.8}
						style={tw`bg-white p-2 rounded-full mt-2`}
						onPress={() => {}}
					>
						<Text style={tw`text-primary`}>Ingresar codigo manualmente</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
    </>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		backgroundColor: "red",
		margin: 64,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
	},
});
