import { View, Text } from "react-native";
import React from "react";
import { SelectList } from "@venedicto/react-native-dropdown";
import tw from "@/config/tw";

interface SelectTypeProps {
	setSelected: (type: string) => void;
	selected: string;
	isValid: boolean;
	errorMessage: string;
}

const TYPES = [
	{
		key: "1",
		value: "Descuento",
	},
	{
		key: "2",
		value: "2x1",
	},
	{
		key: "3",
		value: "Producto Gratis",
	},
];
export default function SelectType({
	setSelected,
	selected,
	isValid,
	errorMessage,
}: SelectTypeProps) {
	const [type, setType] = React.useState("");
	return (
		<View style={tw`pb-4 mt-3`}>
			<SelectList
				defaultOption={TYPES.find((t) => t.key === selected) || TYPES[0]}
				boxStyles={tw.style(
					"border-2 border-primary py-5 rounded-2xl bg-white elevation-2 tablet:py-8",
					!isValid && "border-red-500",
				)}
				dropdownTextStyles={tw`text-base tablet:text-2xl`}
				dropdownItemStyles={tw`text-xl tablet:text-2xl`}
				inputStyles={tw`tablet:text-xl `}
				placeholder="Selecciona el tipo de recompensa"
				data={TYPES}
				save="key"
				onSelect={() => {
					setSelected(type);
				}}
				// @ts-ignore
				setSelected={(val) => {
					setType(val);
				}}
			/>
		</View>
	);
}
