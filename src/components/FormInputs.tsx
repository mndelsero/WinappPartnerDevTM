import { View, Text, TextInput } from "react-native";
import React from "react";
import tw from "@/config/tw";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface FormInputsProps {
  onChangeText: (text: string) => void;
  value: string;
  loading: boolean;
  isValid: boolean;
  placeholder: string;
  onBlur: (e: any) => void;
  secureTextEntry: boolean;
  focus: boolean;
  errorMessage?: string;
  multiple?: boolean;
  icon?: string;
  porcentaje?: boolean;
}
export default function FormInput({
  onChangeText,
  value,
  loading,
  isValid,
  placeholder,
  focus,
  onBlur,
  secureTextEntry,
  errorMessage,
  multiple,
  icon,
  porcentaje,
}: FormInputsProps) {
  return (
 <View
  style={tw`tablet:h-24 my-3 w-full h-16 ${
    multiple ? "h-30 tablet:h-42" : ""
  }`}
>
  <View style={tw.style(
    "flex-row items-center border-2 tablet:border-4 border-primary py-5 rounded-2xl bg-white tablet:py-8 tablet:text-2xl px-4",
    !isValid && "border-red-500",
    focus && "border-black",
    multiple && "h-30 tablet:h-42"
  )}>
    {icon && <MaterialCommunityIcons name={icon} size={18} style={tw`mr-2 flex items-center `} color={!isValid ? "red" : "black"} />}
    <TextInput
      multiline={multiple}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
      placeholderTextColor={!isValid ? "red" : "grey"}
      style={tw`flex-grow placeholder:text-black`}
    />
  </View>
  <Text
    style={tw.style(
      "text-2xs tablet:text-lg mt-1",
      !isValid && "text-red-500 font-bold"
    )}
  >
    {errorMessage}
  </Text>
</View>
  );
}
