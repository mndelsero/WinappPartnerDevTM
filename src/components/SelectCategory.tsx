import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MultipleSelectList, SelectList } from "@venedicto/react-native-dropdown";
import { useQuery } from "react-query";
import DropDownPicker from "react-native-dropdown-picker";

interface CategoryProps {
    setSelected: (selected: string) => void;
    selected: string;
    isValid: boolean;
    errorMessage: string;
}

export default function SelectCategoryInput({
    setSelected,
    selected,
    isValid,
    errorMessage,
}: CategoryProps) {
    const { getToken } = useAuth();
    const [defaultOption, setDefaultOption] = useState<any[] | null>(null);
    const [categori, setCategories] = React.useState<string | null>(null);

    const {
        isFetching,
        data: categories,
        isError,
    } = useQuery({
        queryKey: "categoriesSelect",
		queryFn: async () => {
            const token = await getToken();

            if (!token) {
                return [];
            }
            const apiService = new ApiService(token);
            const response = await apiService.getCategories(token);

            const { productCategories } = await response.data;

            return productCategories.map((category) => ({
                key: category.id,
                value: category.name,
            }));
        },
    });

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

            
        }
    }, [categories]);

    useEffect(() => {
        if (categori) {
            // Si `categori` tiene un valor, lo procesamos
            if (Number.isNaN(parseInt(categori))) {
                const cate = categories?.find((category) => category.value === categori);
                if (cate) {
                    setSelected(cate.key);
                } else {
                    setSelected(categori);
                }
            } else {
                setSelected(categori);
            }
        } else {
            setSelected("");
        }
    }, [categori, categories]);

    console.log(selected);

    return (
        <View>
            {defaultOption == null ? (
                <ActivityIndicator color={tw.color("primary")} />
            ) : (
                <SelectList
                    defaultSelected={defaultOption || []}
                    boxStyles={tw.style(
                        "border-2 border-primary py-5 rounded-2xl bg-white elevation-2 tablet:py-8",
                        !isValid && "border-red-500",
                    )}
                    dropdownTextStyles={tw`text-base tablet:text-2xl`}
                    dropdownItemStyles={tw`text-xl tablet:text-2xl`}
                    inputStyles={tw`tablet:text-xl `}
                    badgeTextStyles={tw`text-xs tablet:text-lg`}
                    placeholder="Selecciona tu categoria"
                    setSelected={(value:string) => {
                        setCategories(value); // Aquí se asume que `value` es un solo valor, no un array
                    }}
                    data={categories || []}
                    save="key"
                    label="Categoria"
                    searchPlaceholder="Buscar Categoria"
                    notFoundText="No se encontraron categorias"
                    single // Asegúrate de que esta propiedad esté configurada para permitir solo una selección
                />
            )}
            {!isValid && <Text style={tw`text-red-500`}>{errorMessage}</Text>}
        </View>
    );
}