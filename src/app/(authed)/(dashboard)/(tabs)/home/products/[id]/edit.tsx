import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { useEffect } from "react";
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
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useQuery } from "react-query";
import WithLoading from "@/components/WithLoading";
import DashboardHeader from "@/components/DashboardHeader";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function EditProduct() {
	const { id } = useGlobalSearchParams();
	const { business } = useGlobalStore();
	const { getToken } = useAuth();
	const [fetching, setFetching] = React.useState(true);
	const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["product", id],

		queryFn: async () => {
			const token = await getToken({ template: "supabase" });
			const apiService = new ApiService(token ?? "");
			return apiService.getProduct(parseInt(id.toString()), business.id);
		},
	});
	const [initial, setInitial] = React.useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		image: "",
		category: [],
	});

	const [loading, setLoading] = React.useState(false);

	const [image, setImage] = React.useState<{ any } | null>(null);
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
			stock: "",
			image: "",
			category: [],
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es requerido"),
			description: Yup.string().required("La descripción es requerida"),
			price: Yup.number()
				.required("El precio es requerido")
				.min(0, "El precio debe ser mayor a 0"),
			stock: Yup.number()
				.required("El stock es requerido")
				.min(1, "El stock debe ser mayor a 0"),
			image: Yup.string().required("La imagen es requerida"),
			category: Yup.array(Yup.string())
				.required("La categoria es requerida")
				.min(1, "Debe seleccionar al menos una categoria"),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			const token = await getToken({ template: "supabase" });
			const apiService = new ApiService(token ?? "");
			apiService
				.updateProduct(
					{
						category: values.category ?? [],
						description: values.description,
						image: values.image,
						name: values.name,
						price: parseFloat(values.price),
						stock: parseInt(values.stock),
					},
					business.id,
					parseInt(id.toString()),
				)
				.then((value) => {
					setLoading(false);
					toast.success("Producto editado con exito");
					resetForm();
					router.back();
				})
				.catch((e) => {
					console.log(e);
					setLoading(false);
				});
		},
	});

	useEffect(() => {
		if (data) {
			const categories = data.ProductsCategory?.map((c) => c.category_id) ?? [];
			console.log(categories);
			setFieldValue("name", data.name);
			setFieldValue("description", data.description);
			setFieldValue("price", data.price);
			setFieldValue("stock", String(data.stock));
			setFieldValue("image", data.image);
			setImage({ uri: data.image });
			setFieldValue("category", categories);
			setTimeout(() => {
				setFetching(false);
			}, 2000);
		}
	}, [data]);

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

	useEffect(() => {
		refetch();
	}, []);

	return (
		<>
		<Stack.Screen options={{
			headerShown: true,
			header: () => (
				<DashboardHeader
					title="Editar Productos"
				/>
			),
		}} />
		
		
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`bg-background h-full`}
		>
			<WithLoading isLoading={isFetching && fetching} error={isError}>
				<ScrollView
					automaticallyAdjustKeyboardInsets={true}
					style={tw`h-full bg-background px-4`}
				>
					<View>
						<View style={tw`flex justify-center items-center tablet:mt-0`}>
							<TouchableOpacity
								onPress={handleLogo}
								style={tw`h-36 border-primary rounded-2xl tablet:rounded-3xl w-3/6 tablet:h-56 tablet:w-2/6 border-2 tablet:border-4 tablet:mt-10 justify-center items-center elevation-2 mb-2`}
							>
								{image ? (
									<View style={tw`relative w-full h-full`}>
									<Image
									  style={tw`w-full h-full rounded-xl  tablet:rounded-2xl`}
									  resizeMode="cover"
									  source={{ uri: image.uri }}
									/>
									<View style={tw`absolute top-2 right-2`}>
									  <AntDesign name="edit" size={24} color="white" />
									</View>
								  </View>
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
							onChangeText={handleChange("price")}
							value={values.price}
							loading={loading}
							isValid={!errors.price}
							placeholder="Defina el precio"
							focus={false}
							onBlur={handleBlur("price")}
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
							isValid={!errors.category}
							errorMessage={errors.category?.toString() ?? ""}
							selected={values.category}
							setSelected={(val) => {
								setFieldValue("category", val);
							}}
						/>
					</View>

					<View
						style={tw`w-full right-0 left-0 items-center justify-center mt-10 mb-10`}
					>
						<Button
							title="Editar Producto"
							style="w-4/6"
							onPress={handleSubmit}
							loading={loading}
						/>
					</View>
				</ScrollView>
			</WithLoading>
		</KeyboardAvoidingView>
		</>
	);
}
