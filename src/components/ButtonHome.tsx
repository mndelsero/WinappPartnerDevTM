import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/config/tw";

interface Props {
	text: string;
	icon?: () => JSX.Element;
	onPress: () => void;
	isImage?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}
export default function ButtonHome({
	text,
	icon,
	onPress,
	isImage = false,
    isFirst = false,
    isLast = false,
}: Props) {
	if (!icon) {
		return null;
	}

    
    const width = Dimensions.get('window').width;
    let fontSize;
    
    if (width >= 1024) {
      fontSize = '4xl'; // Tamaño del texto para tablets
    } else if (width >= 768) {
      fontSize = '2xl'; // Tamaño del texto para teléfonos grandes
    } else {
      fontSize = 'base'; // Tamaño del texto para teléfonos pequeños
    }


    const color = "black"; // Cambiado a "primary"
    const background = "white"; // Cambiado a "white"
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={tw`w-full h-8 bg-${background} rounded-3xl tablet:rounded-1/2 items-start justify-center mx-auto  tablet:w-56 tablet:h-56 tablet:mt-20`}
        >
            <View style={tw`flex-row items-center justify-start`}>
        {icon()}
        <Text style={tw`text-${color} font-bold text-base md:text-2xl tablet:text-4xl`}>
            {text}
        </Text>
    </View>
        </TouchableOpacity>

	);
}
