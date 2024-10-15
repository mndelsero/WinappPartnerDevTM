import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MultipleSelectList } from "@venedicto/react-native-dropdown";
import { useQuery } from "react-query";
import DropDownPicker from "react-native-dropdown-picker";
import useGlobalStore from "@/store/useGlobalStore";

interface ProductsProps {
	setSelected: (product: string[]) => void;
	selected: string[];
	isValid: boolean;
	errorMessage: string;
}
export default function SelectProductInput({
	setSelected,
	selected,
	isValid,
	errorMessage,
}: ProductsProps) {
	const { getToken } = useAuth();
	const [defaultOption, setDefaultOption] = useState<any[] | null>(null);
	const [produ, setProdu] = React.useState([]);
	const { business } = useGlobalStore();

	const {
		isFetching,
		data: categories,
		isError,
	} = useQuery({
		queryKey: "productsSelect",
		queryFn: async () => {
			const token = await getToken();

			if (!token) {
				return [];
			}
			const apiService = new ApiService(token);
			const productsData = await apiService.getProducts(token);

			if (!productsData) {
				return [];
			}
		
			const { products } = productsData.data;

			return products.map((product) => ({
				key: product.id,
				value: product.name,
			}));
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (categories) {
			const data = categories
				?.map((category) => {
					if (selected.includes(category.key)) {
						return category.value;
					}
				})
				.filter((category) => category !== undefined);
			setDefaultOption(data);

			if (data) {
			}
		}
	}, [categories]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const a = produ.map((element) => {
			if (Number.isNaN(parseInt(element))) {
				const cate = categories?.find((category) => category.value === element);
				if (cate) {
					return cate.key;
				}
			}
			return element;
		});
		setSelected(a);
	}, [produ]);

	console.log(selected);

	return (
		<View>
			{defaultOption == null ? (
				<ActivityIndicator color={tw.color("primary")} />
			) : (
				<MultipleSelectList
					defaultSelected={defaultOption ?? []}
					boxStyles={tw.style(
						"border-2 border-primary py-5 rounded-2xl bg-white elevation-2 tablet:py-8",
						!isValid && "border-red-500",
					)}
					inputStyles={tw`tablet:text-xl `}
					placeholder="Selecciona un producto"
					dropdownTextStyles={tw`text-base tablet:text-2xl`}
					dropdownItemStyles={tw`text-xl tablet:text-2xl`}
					setSelected={(value) => {
						setProdu(value);
					}}
					data={categories || []}
					save="key"
					label="Productos"
					searchPlaceholder="Buscar Productos"
					notFoundText="No se encontraron productos"
					badgeTextStyles={tw`text-xs tablet:text-lg`}
				/>
			)}
		</View>
	);
}
