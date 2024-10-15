import { View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import React from "react";
import tw from "@/config/tw";
import FormInput from "@/components/FormInputs";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectCategoryInput from "@/components/SelectCategory";
import Button from "@/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import { SUPABASE_URL, SUPABASE_URL_IMAGE } from "@/utils/constants";
import useGlobalStore from "@/store/useGlobalStore";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddProduct() {
	const [loading, setLoading] = React.useState(false);
	const { getToken } = useAuth();
	const { business } = useGlobalStore();
	const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
		null,
	);
	const router = useRouter();
	const {
		resetForm,
		handleBlur,
		handleChange,
		handleSubmit,
		errors,
		values,
		setFieldValue,
	} = useFormik({
		initialValues: {
			name: "",
			description: "",
			unitPrice: "",
			stock: "",
			image: "",
			categoryId : "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es requerido"),
			description: Yup.string().required("La descripción es requerida"),
			unitPrice: Yup.number()
				.required("El precio es requerido")
				.min(0, "El precio debe ser mayor a 0"),
			stock: Yup.number()
				.required("El stock es requerido")
				.min(1, "El stock debe ser mayor a 0"),
			image: Yup.string().required("La imagen es requerida"),
			categoryId: Yup.string().required('La categoría es requerida'),

				
		}),
		onSubmit: async (values) => {
			setLoading(true);
			const token = await getToken();
			const apiService = new ApiService(token ?? "");
			apiService
				.createProduct(
					{
						categoryId: values.categoryId,
						description: values.description,
						image: values.image,
						name: values.name,
						unitPrice: parseFloat(values.unitPrice),
						stock: parseInt(values.stock),
					},
					business.id,
				)
				.then((value) => {
					setLoading(false);
					toast.success("Producto creado con exito");
					resetForm();
					router.back();
				})
				.catch((e) => {
					console.log(e);
					setLoading(false);
				});
		},
	});

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
			const token = await getToken();
			const apiService = new ApiService(token ?? "");

			apiService
				.uploadImage(image.base64 ?? "")
				.then((value) => {
					const uri = SUPABASE_URL + SUPABASE_URL_IMAGE + value;
					setFieldValue("image", uri);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<KeyboardAwareScrollView style={tw`h-full bg-background`}>
			<ScrollView
				automaticallyAdjustKeyboardInsets={true}
				style={tw`h-full bg-background px-4`}
			>
				<View>
					<View style={tw`flex justify-center items-center tablet:mt-0`}>
						<TouchableOpacity
							onPress={handleLogo}
							style={tw`h-36 border-primary rounded-2xl tablet:rounded-3xl w-3/6 tablet:h-56 tablet:w-2/6 border-2 tablet:border-4 tablet:mt-10 justify-center items-center ${
								errors.image ? "border-red-500" : ""
							}`}
						>
							{image ? (
								<Image
									style={tw`w-full h-full rounded-xl tablet:rounded-2xl`}
									resizeMode="cover"
									source={{ uri: image.uri }}
								/>
							) : (
								<MaterialIcons
									name="image"
									size={Dimensions.get("window").width >= 1024 ? 100 : 50}
									color={tw.color("primary")}
								/>
							)}
						</TouchableOpacity>
					</View>
					<FormInput
						onChangeText={handleChange("name")}
						value={values.name}
						loading={loading}
						isValid={!errors.name}
						placeholder="Nombre del producto"
						focus={false}
						onBlur={handleBlur("name")}
						secureTextEntry={false}
						errorMessage=""
					/>
					<FormInput
						onChangeText={handleChange("description")}
						value={values.description}
						loading={loading}
						isValid={!errors.description}
						placeholder="Descripción del producto"
						focus={false}
						onBlur={handleBlur("description")}
						secureTextEntry={false}
						errorMessage=""
						multiple
					/>
					<FormInput
						onChangeText={handleChange("unitPrice")}
						value={values.unitPrice}
						loading={loading}
						isValid={!errors.unitPrice}
						placeholder="Defina el precio"
						focus={false}
						onBlur={handleBlur("unitPrice")}
						secureTextEntry={false}
						errorMessage=""
					/>
					<FormInput
						onChangeText={handleChange("stock")}
						value={values.stock}
						loading={loading}
						isValid={!errors.stock}
						placeholder="Defina el stock"
						focus={false}
						onBlur={handleBlur("stock")}
						secureTextEntry={false}
						errorMessage=""
					/>
					<SelectCategoryInput
						isValid={!errors.categoryId}
						errorMessage={errors.categoryId?.toString() ?? ""}
						selected={values.categoryId}
						setSelected={(val) => {
							setFieldValue("categoryId", val);
						}}
					/>
				</View>

				<View
					style={tw`w-full right-0 left-0 items-center justify-center mt-10 mb-10`}
				>
					<Button
						title="Crear Producto"
						style="w-4/6"
						onPress={handleSubmit}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}
