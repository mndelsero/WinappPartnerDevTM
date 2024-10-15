import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardOpen() {
	const [keyboardOpen, setKeyboardOpen] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardOpen(true);
			},
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardOpen(false);
			},
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return keyboardOpen;
}
