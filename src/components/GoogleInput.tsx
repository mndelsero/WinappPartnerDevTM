import tw from "@/config/tw";
import { GOOGLE_API_KEY } from "@/utils/constants";
import React from "react";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface GooglePlacesInputProps {
	setAddress: (address: string) => void;
}
const GooglePlacesInput = ({ setAddress }: GooglePlacesInputProps) => {
	return (
		<GooglePlacesAutocomplete
			styles={{
				description: tw`tablet:text-2xl`,
				listView: tw`text-3xl`,
				container: tw`w-full`,
				textInputContainer: tw`w-full`,

				textInput: tw`tablet:h-20 h-15 tablet:text-2xl rounded-2xl border-2 border-gray-300`,
			}}
			placeholder="Escribe tu direccion"
			onPress={(data, details = null) => {
				console.log(data, details);
				setAddress(data.description);
			}}
			query={{
				key: GOOGLE_API_KEY,
				language: "es",
			}}
		/>
	);
};

export default GooglePlacesInput;
