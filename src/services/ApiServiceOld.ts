import { API_URL } from "@/utils/constants";
import {
	BusinessResponse,
	Discount,
	ProductResponse,
	Subscription,
} from "@/utils/types";
import apisauce, { ApisauceInstance } from "apisauce";

export default class ApiService {
	api: ApisauceInstance;

	constructor(accessToken?: string) {
		console.log(accessToken);
		this.api = apisauce.create({
			baseURL: API_URL,
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
	}

	async getBusinesses(address: string): Promise<BusinessResponse> {
		const response = await this.api.get<BusinessResponse>("/businesses", {
			address,
		});

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		console.log(response);

		return [];
	}

	async getProducts(businessId: number): Promise<ProductResponse> {
		const response = await this.api.get<ProductResponse>(
			`/products?businessId=${businessId}`,
		);

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		return [];
	}

	async getSubscriptions(businessId: number): Promise<Subscription | null> {
		const response = await this.api.get<Subscription>(
			`/businesses/${businessId}/subscription`,
		);

		console.log(response);

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		return null;
	}

	async subscribe(businessId: number): Promise<Subscription> {
		console.log(API_URL);
		const response = await this.api.post<Subscription>(
			`/businesses/${businessId}/subscribe`,
		);

		console.log(response.data);

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		throw new Error("Error subscribing to business");
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async getPreferences(data: any): Promise<string | null> {
		const response = await this.api.post<string>(
			"/payments/create_preference",
			data,
		);

		console.log(response);

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		return null;
	}

	async getDiscount(
		code: string,
		businessId: string,
	): Promise<Discount | null> {
		const response = await this.api.get<Discount>(
			`/discounts?code=${code}&businessId=${businessId}`,
		);

		if (response.ok) {
			if (response.data) {
				console.log(response.data);
				return response.data;
			}
		}

		return null;
	}
}
