import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
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
import SelectProductInput from "@/components/SelectProduct";
import { SelectList } from "@venedicto/react-native-dropdown";
import SelectType from "@/components/SelectType";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectCategoryInputss from "@/components/SelectCategory";

export default function AddAwards() {
	const [loading, setLoading] = React.useState(false);
	const { getToken } = useAuth();
	const { business } = useGlobalStore();

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
			price: "",
			type: "",
			discount: "",
			product: [],
			image: "",
			category: [],
		},
		validationSchema: Yup.object({
			image: Yup.string().required("La imagen es requerida"),
			name: Yup.string().required("El nombre es requerido"),
			description: Yup.string().required("La descripción es requerida"),
			price: Yup.number()
				.required("El precio es requerido")
				.min(0, "El precio debe ser mayor a 0"),
			type: Yup.number().required("El tipo es requerido"),
			discount: Yup.number().when("type", {
				is: (val: number) => val === 1,
				then: () =>
					Yup.number()
						.required("El descuento es requerido")
						.max(100, "El descuento no puede ser mayor a 100")
						.min(0, "El descuento no puede ser menor a 0"),
				otherwise: () => Yup.number().notRequired(),
			}),
			product: Yup.array(Yup.string())
				.required("El producto es requerido")
				.min(1, "Debe seleccionar al menos un producto"),

			category: Yup.array(Yup.string())
				.required("La categoria es requerida")
				.min(1, "Debe seleccionar al menos una categoria"),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			const token = await getToken({ template: "supabase" });
			const api = new ApiService(token ?? "");
			api
				.createAward(
					{
						image: values.image,
						name: values.name,
						description: values.description,
						type: parseInt(values.type),
						discount: parseInt(values.discount) || null,
						product_id: values.product,
						point_cost: parseInt(values.price),
					},
					business.id,
				)
				.then((res) => {
					toast.success("Recompensa creada con éxito");
					setLoading(false);
					router.back();
				})
				.catch((err) => {
					toast.error("Ocurrió un error al crear la recompensa");
					setLoading(false);
				});
		},
	});

	const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
		null,
	);
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
							style={tw`h-36 border-primary ${
								errors.image ? "border-red-500" : ""
							} rounded-2xl tablet:rounded-3xl w-3/6 tablet:h-56 tablet:w-2/6 border-2 tablet:border-4 tablet:mt-10 justify-center items-center `}
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
						placeholder="Nombre de la recompensa"
						focus={false}
						onBlur={handleBlur("name")}
						secureTextEntry={false}
						errorMessage=""
						icon="account-edit-outline"
					/>
					<FormInput
						onChangeText={handleChange("description")}
						value={values.description}
						loading={loading}
						isValid={!errors.description}
						placeholder="Descripción de la recompensa"
						focus={false}
						onBlur={handleBlur("description")}
						secureTextEntry={false}
						errorMessage=""
						multiple
						icon="text-box"
					/>
					<FormInput
						onChangeText={handleChange("price")}
						value={values.price}
						loading={loading}
						isValid={!errors.price}
						placeholder="Defina el precio"
						focus={false}
						onBlur={handleBlur("price")}
						secureTextEntry={false}
						errorMessage=""
						icon="currency-usd"
						
					/>
					
					<SelectType
						isValid={!errors.type}
						errorMessage={errors.type?.toString() ?? ""}
						selected={values.type}
						setSelected={(val) => {
							console.log("val", val);
							setFieldValue("type", val);
						}}
					/>

						<View>
						{parseInt(values.type) === 1 && (
							<FormInput
								onChangeText={handleChange("discount")}
								value={values.discount}
								loading={loading}
								isValid={!errors.discount}
								placeholder="Defina el descuento (en %)"
								focus={false}
								onBlur={handleBlur("discount300")}
								secureTextEntry={false}
								errorMessage=""
								icon="hand-coin-outline"
							/>
						)}
					</View>
				
					
					<SelectCategoryInputss
						isValid={!errors.category}
						errorMessage={errors.category?.toString() ?? ""}
						selected={values.category}
						setSelected={(val) => {
							setFieldValue("category", val);
						}}
					/>
					

					<SelectProductInput
						isValid={!errors.product}
						errorMessage={errors.product?.toString() ?? ""}
						selected={values.product}
						setSelected={(val) => {
							setFieldValue("product", val);
						}}
					/>
				</View>

				<View
					style={tw`w-full right-0 left-0 items-center justify-center mt-10 mb-10`}
				>
					<Button
						title="Crear Recompensa"
						style="w-4/6"
						onPress={handleSubmit}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}
