import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import tw from "@/config/tw";

export const IndividualImage = ({ id, source, overlayText }: any) => {
	const [showText, setShowText] = useState(false);

	const handlePress = () => {
		setShowText(!showText);
	};

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View>
				<Image
					source={source}
					style={[tw`w-auto mx-5 h-43 border-2 rounded-xl overflow-hidden`]}
				/>
				{showText && (
					<View
						style={[
							styles.overlayText,
							tw`absolute mx-5 h-43 rounded-xl text-base font-light left-0 right-0 bottom-0 top-0 flex items-stretch justify-between overflow-hidden`,
						]}
					>
						<Text style={[tw`text-base font-light text-white p-5 text-center`]}>
							{overlayText}
						</Text>
						<Text
							style={[
								tw`text-orange-600 bg-white rounded-t-2xl text-center text-4xl py-5 font-bold bottom-0`,
							]}
						>
							40%
						</Text>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	overlayText: {
		fontSize: 20,
		backgroundColor: "#ff4500",
	},
});
