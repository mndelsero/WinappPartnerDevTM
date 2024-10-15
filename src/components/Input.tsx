import { View, Text, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "@/config/tw";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface Props {
	errorMessage?: string;
	error?: boolean;
	placeholder: string;
	focus?: boolean;
	onChangeText?: (text: string) => void;
	value?: string;
	onFocus?: (e: any) => void;
	onBlur?: (e: any) => void;
	secureTextEntry?: boolean;
	lineal?: boolean;
}
export default function Input({
	error = false,
	errorMessage = "",
	placeholder,
	focus,
	onChangeText,
	value,
	onBlur,
	secureTextEntry,
	onFocus,
	lineal = false,
}: Props) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);


	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(prevState => !prevState);
	  }, []);

	return (
		<View style={tw` h-8 tablet:h-20 my-5 w-full `}>
  <View style={tw`relative`}>
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    onFocus={onFocus}
    secureTextEntry={secureTextEntry && !isPasswordVisible}
    onBlur={onBlur}
    placeholderTextColor={error ? "red" : "grey"}
    style={tw.style(
      lineal
        ? "h-6 tablet:h-13 border-b-2 tablet:text-xl border-gray-300"
        : "border-2 tablet:border-4 border-black rounded-2xl h-12 tablet:py-8 tablet:text-2xl px-4 placeholder:text-black",
      error && "border-red-500",
      focus && "border-black",
    )}
  />
  {secureTextEntry && (
   <TouchableOpacity onPress={togglePasswordVisibility}>
   <Ionicons
	 name={isPasswordVisible ? "eye-off" : "eye"}
	 size={24}
	 style={tw`absolute right-3 bottom-2`}
   />
 </TouchableOpacity>
  )}
</View>
  <Text
    style={tw.style(
      "text-2xs tablet:text-lg mt-1",
      error && "text-red-500 font-bold",
    )}
  >
    {errorMessage}
  </Text>
</View>
	);
}
