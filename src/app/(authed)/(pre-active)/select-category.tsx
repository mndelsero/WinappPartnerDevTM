import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/config/tw";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AuthHeader from "@/components/AuthHeader";
import { useQueries, useQuery } from "react-query";
import ApiService from "@/services/ApiService";
import { toast } from "@backpackapp-io/react-native-toast";
import useGlobalStore from "@/store/useGlobalStore";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/Button";
import InputScrollView from "react-native-input-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectFileButton } from "@/components/SelectFileButton";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("El correo es invalido")
		.required("El correo es requerido"),
	password: yup
		.string()
		.min(8, "La contraseña debe tener almenos 8 caracteres")
		.required("La contraseña es requerida"),
});

interface SignInData {
	email: string;
	password: string;
}

export default function SelectCategory() {


	const router = useRouter();
	// const categories = [
	// 	{ key: '1', value: 'Electronics' },
	// 	{ key: '2', value: 'Clothing' },
	// 	{ key: '3', value: 'Books' },
	// 	// Agrega más opciones aquí
	// ];

	// useEffect(() => {
	// 	router.push("/(authed)/(pre-active)/create-business");
	// }, []);

	const { setBusiness } = useGlobalStore();
	const [loading, setLoading] = React.useState(false);
	const { user, isLoaded, isSignedIn } = useUser();
	const { signOut, getToken, userId } = useAuth();
	const [selected, setSelected] = React.useState([]);
	const { setCategories } = useGlobalStore();
	const {
		isFetching,
		data: categories,
		isError,
		error,
	} = useQuery(
		"categories",
		async () => {


			const token = await getToken();

			if (!token) {

				return [];
			}
			const service = new ApiService();
			const data = await service.getBusinessCategories(token);
			console.log("Datos de categorías obtenidos:", data);
			const categories: any = data.map((category: any) => ({
				key: category.id,
				value: category.name,
			}));



			return categories
		}, {
		onError: (err) => {
			console.log("Error al cargar categorías:", err);
		},
	}
	);
	if (isError) {
		console.log("Error en el componente:", error);
	}

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
				const businessData = await apiService.getBussinessByUser(token);
				console.log(businessData)
				console.log(businessData.status)

				if (businessData && businessData.status === "success") {
					const { business } = businessData.data;
					console.log("business", JSON.stringify(business));
					if (business) {
						if (business.status === "Acepted") {
							// TODO
							setBusiness(business);
							router.replace("/(authed)/(dashboard)/(tabs)/home");
							return;
						}
						router.push("/(authed)/(pre-active)/revision");
						return;
					}

				} else {
					setLoading(false);
				}
			}
			else {
				setLoading(false);

			}


		})();
	}, [isLoaded, isSignedIn]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {

			if (!isLoaded) {
				setLoading(false)
				console.log("Usuario no cargado");
				return;
			} else {
				setLoading(true)

			}

			if (isSignedIn) {
				console.log("Usuario está logueado");
				if (user.unsafeMetadata?.role !== "partner") {
					console.log("Rol del usuario no es 'partner', deslogueando...");
					signOut();
					return;
				}
			}
		})();
	}, [isLoaded]);





	return (

		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<SafeAreaView>

				<ScrollView keyboardShouldPersistTaps="always" style={[tw`bg-white `]}>
					<View style={tw`flex-1 bg-white mx-4 rounded-lg px-4 tablet:px-8 mt-2 flex mb-2`}>


						<View style={tw`w-6/6 flex`}>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Seleccione categoría de tu Comercio
							</Text>

							<View style={tw`py-5`}>
								{isFetching ? (
									<View
										style={tw`rounded-2xl h-15 items-center justify-center tablet:h-20`}
									>
										<ActivityIndicator />
									</View>
								) : (
									<MultipleSelectList
										boxStyles={tw`border-2 border-gray-100 py-3 rounded-2xl   tablet:py-8`}
										inputStyles={tw`tablet:text-xl `}
										placeholder="Selecciona tus categorias"
										dropdownTextStyles={tw`text-base tablet:text-2xl`}
										dropdownItemStyles={tw`text-xl tablet:text-2xl`}
										setSelected={(val: any) => {
											console.log("Categorías seleccionadas:", val);
											setSelected(val);
										}}
										data={categories||[]}
										save="key"
										label="Categorias"
										searchPlaceholder="Buscar Categoria"
										notFoundText="No se encontraron categorias"
										badgeTextStyles={tw`text-xs tablet:text-lg`}
									/>
								)}
							</View>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Subir logo de comercio
							</Text>
							<View style={tw`flex justify-center items-center py-5`}>
								<SelectFileButton />
							</View>
							<Text style={tw`text-sm tablet:text-xl text-gray-900 my-4`}>
								Subir documentos para ser evaluados por el administrador
							</Text>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Certificado Bancario
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton />
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								RFC
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton />
							</View>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Acta constitutiva
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton />
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Poder del representante legal
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton />
							</View>
							<View style={tw`mt-4 tablet:mt-8 flex  items-end`}>
								<TouchableOpacity
									activeOpacity={0.8}
									// disabled={!isValid}

									onPress={() => {
										if (selected.length === 0) {
											console.log("No se seleccionaron categorías");
											toast.error("Seleccione al menos una categoria");
										} else {
											console.log("Categorías enviadas:", selected);
											setCategories(selected);
										}


										// router.push("/(authed)/(pre-active)/create-business");
										// handleSubmit();
									}}
									style={tw`bg-primary rounded-full w-12 h-12 tablet:w-20 tablet:h-20 flex items-center justify-center`}
								>
									<Ionicons
										color={tw.color("white")}
										name="chevron-forward"
										style={tw`text-3xl tablet:text-5xl	`}
									/>

								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({});
