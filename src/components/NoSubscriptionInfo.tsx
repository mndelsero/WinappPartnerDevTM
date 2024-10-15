import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Business } from "@/utils/types";
import tw from "@/config/tw";
import Button from "./Button";

interface Props {
	selectedBusiness: Business | null;
	loading: boolean;
	handleSubscribe: () => void;
}

export default function NoSubscriptionInfo({
	selectedBusiness,
	loading,
	handleSubscribe,
}: Props) {
	return (
		<View
			style={tw`flex justify-center items-center bg-white px-5 py-10 rounded-xl gap-3 mx-auto w-5/6`}
		>
			<Text style={tw`text-center font-OpenSans text-lg tablet:text-3xl`}>
				Todavia no estas subscripto en
			</Text>
			<Text
				style={tw`text-center font-OpenSansBold text-2xl tablet:text-3xl text-primary`}
			>
				{selectedBusiness?.name}
			</Text>
			<Text style={tw`text-center tablet:text-xl`}>
				¡Presiona en subscribirse para acceder a los beneficios de este
				comercio!
			</Text>
			<View style={tw`w-full mx-auto flex justify-center items-center mt-5`}>
				<Button
					title="Subscribirse"
					loading={loading}
					disabled={loading}
					onPress={handleSubscribe}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
