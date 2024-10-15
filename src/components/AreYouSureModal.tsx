import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import tw from "@/config/tw";
import Dialog from "react-native-dialog";
interface AreYouSureModalProps {
	show: boolean;
	setShow: (show: boolean) => void;
	description: string;
	onAccept: () => void;
	loading: boolean;
	onCancel: () => void;
	onAcceptText: string;
	onCancelText: string;
	title: string;
}
export default function AreYouSureModal({
	show,
	setShow,
	description,
	onAccept,
	onCancel,
	onAcceptText: onA,
	onCancelText: onC,
	loading,
	title,
}: AreYouSureModalProps) {
	return (
		<Dialog.Container visible={show}
			blurStyle={
				{backgroundColor:"#fff"}
			}
		>
			<Dialog.Title style={tw`text-xl font-bold text-primary`}>
				{title}
			</Dialog.Title>
			<Dialog.Description style={tw`text-lg font-bold text-primary py-4`}>
				{description}
			</Dialog.Description>
			<Dialog.Button disabled={loading} label={onC} color={tw.color(`text-gray-500`)} onPress={onCancel} />
			<Dialog.Button
				disabled={loading}
				label={
					loading ? <ActivityIndicator color={tw.color("primary")} /> : onA
				}
				onPress={onAccept}
				color={tw.color(`text-primary`)}
			/>
		</Dialog.Container>
	);
}
