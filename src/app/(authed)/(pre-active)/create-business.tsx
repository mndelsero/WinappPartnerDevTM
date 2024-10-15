import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import Button from "@/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import * as ImagePicker from "expo-image-picker";
import ApiService from "@/services/ApiService";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SUPABASE_URL, SUPABASE_URL_IMAGE } from "@/utils/constants";
import GooglePlacesInput from "@/components/GoogleInput";
import BottomSheet from "@gorhom/bottom-sheet";
import useGlobalStore from "@/store/useGlobalStore";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useKeyboardOpen from "@/hooks/useKeyboardOpen";
import { SelectFileButton } from "@/components/SelectFileButton";
import { useQuery } from "react-query";

export default function CreateBusinessScreen() {
	const isKeyboardOpen = useKeyboardOpen();
	const [loading, setLoading] = React.useState(false);
	const { user } = useUser();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { setCategories } = useGlobalStore();
	const { getToken, userId } = useAuth();
	const [open, setOpen] = React.useState(false);
	const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
		null,
	);
	const [selected, setSelected] = React.useState([]);


	const {
		isFetching,
		data: categories,
		isError,
	} = useQuery({
		queryKey: "categories",
		queryFn: async () => {
			const token = await getToken({ template: "supabase" });

			if (!token) {
				return [];
			}
			const apiService = new ApiService(token);
			const categories = await apiService.getCategories();

			return categories.map((category) => ({
				key: category.id,
				value: category.name,
			}));
		},
	});

	const { handleSubmit, handleChange, errors, setFieldValue, values } =
		useFormik({
			validationSchema: Yup.object().shape({
				logo: Yup.string().required("El logo es requerido"),
				name: Yup.string().required("El nombre es requerido"),
				/* description: Yup.string().required("La descripcion es requerida"),
				address: Yup.string().required("La direccion es requerida"), */
			}),
			initialValues: {
				logo: "logo.jpg",
				name: "",
				/* description: "",
				address: "", */
			},
			onSubmit: async (values) => {
				setLoading(true);
				const token = await getToken({ template: "supabase" });
				const apiService = new ApiService(token ?? "");
				apiService
					.createBusiness(values, selected, userId ?? "")
					.then((value) => {
						toast.success("Negocio creado");
						router.push("/(authed)/(pre-active)/revision");

					})
					.catch((e) => {
						console.log(e);
						toast.error("Error al crear el negocio");
					})
					.finally(() => {
						setLoading(false);
					});
			},
		});

	useEffect(() => {
		if (isKeyboardOpen && open) {
			bottomSheetRef.current?.snapToPosition("90%");
		}

		if (!isKeyboardOpen && open) {
			bottomSheetRef.current?.snapToPosition("50%");
		}
	}, [isKeyboardOpen]);

	const handleLogo = async () => {
		if (loading) {
			return;
		}
		// TODO PICK IMAGE
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});
		if (result?.assets && result.assets.length > 0) {
			const image = result.assets[0];
			setImage(image);
			const token = await getToken({ template: "supabase" });
			const apiService = new ApiService(token ?? "");
			console.log(image.base64?.length);

			apiService
				.uploadImage(image.base64 ?? "")
				.then((value) => {
					const uri = SUPABASE_URL + SUPABASE_URL_IMAGE + value;
					setFieldValue("logo", uri);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	console.log("CREATE BUSINESS")

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<KeyboardAwareScrollView>
				<ScrollView automaticallyAdjustKeyboardInsets={true}>
					<View
						style={tw`bg-white mx-4 rounded-lg px-4 tablet:px-8 py-5 tablet:py-10 flex-col relative justify-center items-center`}
					>
						
					</View>
					<View style={tw`flex justify-center items-center my-5 tablet:mt-0`}>
						
						<TouchableOpacity
							onPress={handleLogo}
							style={tw`h-38 border-gray-300 rounded-2xl tablet:rounded-3xl w-3/6 tablet:h-56 tablet:w-2/6 border-2 tablet:border-4 tablet:mt-10 justify-center items-center`}
						>
							{image ? (
								<Image
									style={tw`w-full h-full rounded-xl tablet:rounded-2xl`}
									resizeMode="cover"
									source={{ uri: image.uri }}
								/>
							) : (
								<MaterialIcons
									name="add-business"
									size={Dimensions.get("window").width >= 1024 ? 100 : 50}
									color={tw.color("primary")}
								/>
							)}
						</TouchableOpacity>
						
					</View>
					<View style={tw`flex-1 bg-white mx-4 rounded-lg px-4 tablet:px-8 mt-2 flex mb-2`}>
					
					
					<View style={tw`w-6/6 flex`}>

					<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
							Seleccione Nombre del comercio
						</Text>
					<View style={tw`flex justify-center items-center py-5`}>
						<TextInput
							editable={!loading}
							onChangeText={handleChange("name")}
							value={values.name}
							style={tw`border-2 border-gray-100 py-3 px-4 rounded-2xl w-6/6 tablet:w-4/6 flex items-center justify-center`}
							placeholder="Nombre de la sucursal"
						/>
					</View>
						<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
							Seleccione categorías del comercio
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
									setSelected={(val) => setSelected(val)}
									data={categories || []}
									save="key"
									label="Categorias"
									searchPlaceholder="Buscar Categoria"
									notFoundText="No se encontraron categorias"
									badgeTextStyles={tw`text-xs tablet:text-lg`}
								/>
							)}
						</View>
						
						<Text style={tw`text-sm tablet:text-xl text-gray-900 my-4`}>
							Subir documentos para ser evaluados por el administrador
						</Text>
						<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
							Certificado Bancario(Persona física o moral)
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
							Acta constitutiva (Personal moral)
						</Text>
						<View style={tw`flex justify-center items-center py-2`}>
							<SelectFileButton />
						</View>

						<Text style={tw`text-sm tablet:text-xl text-gray-500 mt-2`}>
							Poder del representante legal (opcional)
						</Text>
						<View style={tw`flex justify-center items-center py-2`}>
							<SelectFileButton />
						</View>
					</View>
				</View>

					
					{/* <View style={tw`px-10 mt-4 tablet:mt-10`}>
						<TextInput
							editable={!loading}
							onChangeText={handleChange("description")}
							value={values.description}
							style={tw`border-2 tablet:border-4 border-primary py-5 rounded-2xl  tablet:py-8 tablet:text-2xl px-4 placeholder:text-black `}
							placeholder="Descripcion corta de la sucursal"
						/>
					</View> */}
					{/* <View style={tw`px-10 mt-4 tablet:mt-10`}>
						<TouchableOpacity
							onPress={() => {
								if (loading) {
									return;
								}
								setOpen(true);
								bottomSheetRef.current?.snapToPosition("50%");
							}}
						>
							<Text
								style={tw`border-2 tablet:border-4 border-primary py-5 rounded-2xl  tablet:py-8 tablet:text-2xl px-4 placeholder:text-black overflow-hidden h-15 tablet:h-25`}
							>
								{values.address === ""
									? "Direccion de la sucursal"
									: values.address}
							</Text>
						</TouchableOpacity>
					</View> */}

					<View
						style={tw`flex justify-center w-4/6 mx-auto items-center mt-5 tablet:mt-10 pb-10`}
					>
						<Button
							loading={loading}
							title="Registrarse"
							outline
							textColor={tw.color("primary")}

							onPress={() => {
								handleSubmit();
								if (Object.keys(errors).length > 0) {
									toast.error("Todos los campos son requeridos");
								}
							}}
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
			<BottomSheet
				enablePanDownToClose
				backgroundStyle={{
					backgroundColor: "#eee",
				}}
				index={-1}
				snapPoints={["50%", "90%"]}
				ref={bottomSheetRef}
				onClose={() => setOpen(false)}
			>
				<View
					style={tw.style("flex px-4", {
						"h-3/6":
							Platform.OS === "ios" ||
							(Platform.OS === "android" && !isKeyboardOpen),
						"h-5/6": Platform.OS === "android" && isKeyboardOpen,
					})}
				>
					<GooglePlacesInput
						setAddress={(value) => {
							setFieldValue("address", value);
						}}
					/>
					<View style={tw`justify-center items-center`}>
						<Button
							title="Seleccionar direccion"
							onPress={() => bottomSheetRef.current?.close()}
						/>
					</View>
				</View>
			</BottomSheet>
		</SafeAreaView>
	);
}
