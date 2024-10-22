import { Platform } from "react-native";

export const COURIER_CLIENT_KEY =
	process.env.EXPO_PUBLIC_COURIER_CLIENT_KEY || "";
export const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || "";
export const CLERK_PUSHEABLE_KEY =
	process.env.EXPO_PUBLIC_CLERK_PUSHEABLE_KEY || "pk_test_Y2xlYW4tYnVubnktNzAuY2xlcmsuYWNjb3VudHMuZGV2JA";
export const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "";
export const API_URL =
	process.env.EXPO_PUBLIC_API_URL || "https://winap-backend-staging.up.railway.app";
export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";


export const ENVIROMENT = process.env.EXPO_PUBLIC_ENV || "development";

export enum Status {
	Pending = "Payment pending",
	Preparing = "In progress",
	ForPickup = "Done",
	Completed = "Delivered",
	Cancelled = "Cancelled",
}

export enum Types {
	Discount = 1,
	FreeProduct = 2,
	"2x1" = 3,
}
