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
import SelectFileButton from "@/components/SelectFileButton";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { DocumentPickerResult } from "expo-document-picker";




interface FileState {
	uri: string;
	name: string;
	mimeType: string;
}

interface SelectedFiles {
	logo: FileState | null;
	banner: FileState | null;
	bancary: FileState | null;
	rfc: FileState | null;
	act: FileState | null;
	power: FileState | null;
}

export default function SelectCategory() {


	const router = useRouter();
	const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({
		logo: null,
		banner: null,
		bancary: null,
		rfc: null,
		act: null,
		power: null,
	});


	const [selectedAttourneyPower, setselectedAttourneyPower] = React.useState(null);
	const [selectedConstitutiveAct, setselectedConstitutiveAct] = React.useState(null);
	const [selectedRFC, setselectedRFC] = React.useState(null);
	const [selectedBancaryCertificate, setselectedBancaryCertificate] = React.useState(null);
	const [selectedLogo, setselectedLogo] = React.useState(null);
	const [selectedBanner, setselectedBanner] = React.useState(null);
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

			const categories: any = data.map((category: any) => ({
				key: category.id,
				value: category.name,
			}));



			return categories
		}, {
		onError: (err) => {

		},
	}
	);
	if (isError) {

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
				return;
			} else {
				setLoading(true)

			}

			if (isSignedIn) {
				if (user.unsafeMetadata?.role !== "partner") {
					signOut();
					return;
				}
			}
		})();
	}, [isLoaded]);


	const { handleBlur, handleChange, handleSubmit, errors, values, isValid } =
		useFormik({
			initialValues: {
				name: "",
				description: "",
				address: "",
				longitude: "",
				latitude: "",
				categoryId: "",
				phone: "",
				workingTime: "",
			},

			onSubmit: async (values) => {
				await handleCreate(values);
			},
		});

	const handleFileSelect = (file: FileState, type: keyof SelectedFiles) => {
		setSelectedFiles((prevFiles) => ({
			...prevFiles,
			[type]: file,
		}));
	};



	const handleCreate = async (values: any) => {

		const token = await getToken();

		if (!token) {

			return [];
		}
		const formDataBusiness = new FormData();
		formDataBusiness.append("name", values.name);
		formDataBusiness.append("description", values.description);
		formDataBusiness.append("address", values.address);
		formDataBusiness.append("longitude", "-100.33215841881625");
		formDataBusiness.append("latitude", "25.667754251662767");
		formDataBusiness.append("categoryId", selected[0]);
		formDataBusiness.append("phone", values.phone);
		formDataBusiness.append("workingTime", values.workingTime);

		if (selectedFiles.logo) {
			formDataBusiness.append("businessLogo", {
				uri: selectedFiles.logo.uri,
				name: selectedFiles.logo.name,
				type: selectedFiles.logo.mimeType,
			} as any);
		}

		if (selectedFiles.banner) {
			formDataBusiness.append("businessBanner", {
				uri: selectedFiles.banner.uri,
				name: selectedFiles.banner.name,
				type: selectedFiles.banner.mimeType,
			} as any);
		}


		try {
			const service = new ApiService();
			const data = await service.createBusiness(formDataBusiness, token);
			return data
		} catch (e) {
			console.log(e);

			setLoading(false);
		}


		const formDataDocs = new FormData();
		if (selectedFiles.bancary) {
			formDataDocs.append("bankingCertified", {
				uri: selectedFiles.bancary.uri,
				name: selectedFiles.bancary.name,
				type: selectedFiles.bancary.mimeType,
			} as any);
		}
		if (selectedFiles.rfc) {
			formDataDocs.append("dni", {
				uri: selectedFiles.rfc.uri,
				name: selectedFiles.rfc.name,
				type: selectedFiles.rfc.mimeType,
			} as any);
		}
		if (selectedFiles.act) {
			formDataDocs.append("constitutiveAct", {
				uri: selectedFiles.act.uri,
				name: selectedFiles.act.name,
				type: selectedFiles.act.mimeType,
			} as any);
		}
		if (selectedFiles.power) {
			formDataDocs.append("attorneyPower", {
				uri: selectedFiles.power.uri,
				name: selectedFiles.power.name,
				type: selectedFiles.power.mimeType,
			} as any);
		}



		const service = new ApiService();
		const data = await service.uploadDocuments(formDataDocs, token);

		setLoading(false)



	}

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

											setSelected(val);

										}}
										data={categories || []}
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
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'logo')}

								/>
							</View>
							<View style={tw`flex justify-center items-center py-5`}>

								<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
									Elige el nombre de tu Comercio
								</Text>
								<Input
									placeholder="Nombre"
									onFocus={handleBlur("code")}
									onChangeText={handleChange("name")}
									value={values.name}
									error={!!errors.name}
									errorMessage={errors.name}

								/>
							</View>

							<View style={tw`flex justify-center items-center py-5`}>

								<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
									Escribe una descripcion de tu comercio
								</Text>
								<Input
									placeholder="Descripcion"
									onFocus={handleBlur("code")}
									onChangeText={handleChange("description")}
									value={values.description}
									error={!!errors.description}
									errorMessage={errors.description}

								/>
							</View>



							<View style={tw`flex justify-center items-center py-5`}>

								<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
									Escribe la direccion fisica de tu Comercio
								</Text>
								<Input
									placeholder="Direccion"
									onFocus={handleBlur("code")}
									onChangeText={handleChange("address")}
									value={values.address}
									error={!!errors.address}
									errorMessage={errors.address}

								/>
							</View>

							<View style={tw`flex justify-center items-center py-5`}>

								<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
									Escribe el telefono del Comercio
								</Text>
								<Input
									placeholder="Telefono"
									onFocus={handleBlur("code")}
									onChangeText={handleChange("phone")}
									value={values.phone}
									error={!!errors.phone}
									errorMessage={errors.phone}

								/>
							</View>


							<View style={tw`flex justify-center items-center py-5`}>

								<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
									Escribe el horario del comercio
								</Text>
								<Input
									placeholder="Horario"
									onFocus={handleBlur("code")}
									onChangeText={handleChange("workingTime")}
									value={values.workingTime}
									error={!!errors.workingTime}
									errorMessage={errors.workingTime}

								/>
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Subir Banner de tu Comercio
							</Text>


							<View style={tw`flex justify-center items-center py-5`}>
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'banner')}


								/>
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-900 my-4`}>
								Subir documentos para ser evaluados por el administrador
							</Text>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Certificado Bancario
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'bancary')}

								/>
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								RFC
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'rfc')}

								/>
							</View>
							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Acta constitutiva
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'act')}

								/>
							</View>

							<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
								Poder del representante legal
							</Text>
							<View style={tw`flex justify-center items-center py-2`}>
								<SelectFileButton
									label="Seleccionar Logo" onFileSelect={(file) => handleFileSelect(file, 'power')}

								/>
							</View>
							<View style={tw`mt-4 tablet:mt-8 flex  items-end`}>
								<TouchableOpacity
									activeOpacity={0.8}
									// disabled={!isValid}

									onPress={() => {
										if (selected.length === 0) {
											toast.error("Seleccione al menos una categoria");
										} else {
											console.log("Categorías enviadas:", selected);

											handleSubmit()

										}



									}}
									style={tw`flex flex-row bg-primary rounded-full px-1rem h-12 tablet:w-20 tablet:h-20 flex items-center justify-center`}
								>


									<Text
										style={tw`text-1.5rem text-white`}
									>
										Registarse
									</Text>
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
