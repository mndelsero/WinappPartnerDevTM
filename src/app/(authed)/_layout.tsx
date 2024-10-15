import React, { useEffect } from "react";
import { Redirect, Stack, useRouter } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import AuthHeader from "@/components/AuthHeader";
import ApiService from "@/services/ApiService";
import LoadingScreen from "@/components/LoadingScreen";
export default function AuthedLayout() {
	const { isSignedIn, isLoaded, userId, getToken } = useAuth();
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	return (
		<>
			<SignedIn>
				<Stack>
					<Stack.Screen
						name="(pre-active)/create-business"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(pre-active)/select-category"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(pre-active)/revision"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="(dashboard)"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</SignedIn>
			<SignedOut>
				<Redirect href="/(auth)/sign-in" />
			</SignedOut>
		</>
	);
}
