import React from "react";
import { Redirect, Stack } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import AuthHeader from "@/components/AuthHeader";

export default function AuthLayout() {
	return (
		<>
			<SignedIn>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
				</Stack>
			</SignedIn>
			<SignedOut>
				<Stack>
					<Stack.Screen
						name="sign-up"
						options={{ headerShown: true, header: () => <AuthHeader title="Bienvenido a WinApp" /> }}
					/>
					<Stack.Screen
						name="sign-in"
						options={{ headerShown: true, header: () => <AuthHeader  /> }}
					/>
					<Stack.Screen
						name="forgot-password"
						options={{ headerShown: true, header: () => <AuthHeader /> }}
					/>
				</Stack>
			</SignedOut>
		</>
	);
}
