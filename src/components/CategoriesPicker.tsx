import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import HorizontalScrollMenu from "@nyashanziramasanga/react-native-horizontal-scroll-menu/src";
import tw from "@/config/tw";

interface CategoryProps {
	category: number;
	setCategory: (category: number) => void;
	setLoadingCategory: (loading: boolean) => void;
}
export default function CategoriesPicker({
	category,
	setCategory,
	setLoadingCategory,
}: CategoryProps) {
	const { getToken } = useAuth();
	const { data, isFetching, isError } = useQuery({
		queryKey: "categories",
		queryFn: async () => {
			const token = await getToken();
			const apiService = new ApiService(token ?? "");
			const response = await apiService.getCategories(token?? "");
			const { productCategories } = await response.data;
			return productCategories;

		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data) {
			setTimeout(() => {
				setLoadingCategory(false);
			}, 1000);
		}
	}, [data]);
	return (
		<View>
			{isFetching && <ActivityIndicator color={tw.color("primary")} />}
			{isError && <Text>Error: {isError}</Text>}
			{!isFetching && !isError && data && (
				<HorizontalScrollMenu
					activeBackgroundColor={tw.color("primary")}
					activeTextColor={tw.color("white")}
					textStyle={tw`tablet:text-xl`}
					items={data ?? []}
					onPress={(index) => setCategory(index.id)}
					selected={category}
					itemWidth={Dimensions.get("window").width >= 1024 ? 200 : 120}
				/>
			)}
		</View>
	);
}
