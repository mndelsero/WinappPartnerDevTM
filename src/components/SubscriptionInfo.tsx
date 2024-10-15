import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { formatCardNumber } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { Subscription } from "@/utils/types";

export default function SubscriptionInfo({
	subscriptions,
}: { subscriptions: Subscription }) {
	return (
		<View
			style={[
				tw`h-45 tablet:h-64 bg-primary tablet:w-4/6 mx-auto rounded-xl flex flex-col justify-center items-center gap-3 mb-5 w-[94%] `,
			]}
		>
			<View>
				<Text
					style={tw`text-center font-OpenSansBold text-4xl tablet:text-7xl text-white`}
				>
					{subscriptions.credits}
				</Text>
				<Text
					style={tw`text-center font-OpenSans text-lg tablet:text-3xl text-white`}
				>
					Creditos
				</Text>
			</View>
			<View style={tw`flex-row items-center justify-center gap-2`}>
				<Ionicons
					name="card-outline"
					color={tw.color("white")}
					style={tw`text-2xl tablet:text-4xl`}
				/>
				<View style={tw` border-2 rounded-full border-white px-3 tablet:py-1`}>
					<Text style={tw`text-lg tablet:text-3xl text-white`}>
						{formatCardNumber(subscriptions.card_number)}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
