import { API_URL, Status, Types } from "@/utils/constants";
import {
	Award,
	AwardCreate,
	Business,
	BusinessResponse,
	BussinessCreate,
	Discount,
	Product,
	ProductCreate,
	ProductResponse,
	Subscription,
} from "@/utils/types";
import apisauce, { ApisauceInstance } from "apisauce";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Database } from "database.types";

export default class ApiService {
	// client: SupabaseClient<Database>;

	// constructor(accessToken: string) {
	// 	this.client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
	// 		global: {
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 		},
	// 	});
	// }

	// async getBusinesses(address: string): Promise<BusinessResponse> {
	// 	const near = await fetch(
	// 		`https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/business-by-address?address=${address}`,
	// 		{
	// 			method: "POST",
	// 			headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
	// 			body: JSON.stringify({ address }),
	// 		},
	// 	);
	// 	const data = await near.json();

	// 	return data.near.filter((business: any) => !!business);
	// }

	async getProducts(token: string) {

		const response = await fetch(
			`${API_URL}/my-products`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const dataPrincipal = await response.json();

		console.log('data', dataPrincipal);
		return dataPrincipal;
	}

	// async getProduct(id: number, business_id: number) {
	// 	const { data, error } = await this.client
	// 		.from("Products")
	// 		.select("*, ProductsCategory(*)")
	// 		.eq("id", id)
	// 		.eq("business_id", business_id);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}
	// 	if (data.length > 0) {
	// 		return data[0];
	// 	}
	// 	return null;
	// }

	async getProductsByCategory(token: string) {
		const response = await fetch(
			`${API_URL}/product/categories`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const dataPrincipal = await response.json();

		return dataPrincipal;
	}

	async getBusinessCategories(token: string) {
		try {
			const response = await fetch(
				`${API_URL}/business/categories`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const result = await response.json()
			if (result.status === 'success') {
				const businessCategories = result.data.businessCategories;

				return businessCategories; // Devuelves el array de categorías
			} else {
				throw new Error('No se pudieron obtener las categorías');
			}


		} catch (error) {

			console.log(error);
			throw error;
		}
	}


	// async uploadImage(base64: string): Promise<string> {
	// 	try {
	// 		const id = Math.random().toString(36).substring(7);


	// 		const filePath = `public/${id}.jpg`;
	// 		const { data, error } = await this.client.storage
	// 			.from("business_logos")
	// 			.upload(filePath, decode(base64), {
	// 				cacheControl: "3600",
	// 				contentType: "image/jpg",
	// 			});

	// 		if (error) {
	// 			console.log(error);
	// 			throw error;
	// 		}

	// 		return data.path;
	// 	} catch (e) {
	// 		console.log(e);
	// 		return "";
	// 	}
	// }

	// async createBusiness(
	// 	info: BussinessCreate,
	// 	categories: number[],
	// 	userId: string,
	// ) {
	// 	const { data, error } = await this.client
	// 		.from("Business")
	// 		.insert([
	// 			{
	// 				name: info.name,
	// 				address: info.address,
	// 				description: info.description,
	// 				color: info.color,
	// 				logo: info.logo,
	// 			},
	// 		])
	// 		.returns()
	// 		.select("*");

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	if (data) {
	// 		// biome-ignore lint/complexity/noForEach: <explanation>
	// 		categories.forEach(async (categoryId) => {
	// 			await this.client.from("BusinessCategory").insert(
	// 				categories.map((_category) => ({
	// 					business_id: data[0].id,
	// 					category_id: categoryId,
	// 				})),
	// 			);
	// 		});
	// 		await this.client.from("BusinessAccount").insert([
	// 			{
	// 				business_id: data[0].id,
	// 				user_id_partner: userId,
	// 			},
	// 		]);
	// 	}

	// 	if (data.length > 0) {
	// 		return data[0];
	// 	}

	// 	return null;
	// }

	async getBussinessByUser(
		token: string,
	) {
		try {
			const response = await fetch(
				`${API_URL}/business/me`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const dataPrincipal = await response.json();


			return dataPrincipal;
		}
		catch (error) {

			console.log(error);
			throw error;
		}




	}



	async uploadDocuments(documents: FormData, token: string): Promise<BusinessResponse> {
		try {
			const near = await fetch(
				`${API_URL}/business/document`,
				{
					method: "POST",
					headers: { Authorization: `Bearer ${token}` },
					body: documents,
				},
			);
			console.log(near.status)
			if (near.status === 201) {
				console.log("Documentos subidos")
			}
			const data = await near.json();
			return data.near;
		} catch (error) {
			console.log(error)
			throw error
		}
	}


	async createBusiness(business: FormData, token: string): Promise<BusinessResponse> {
		try {
			const near = await fetch(
				`${API_URL}/business`,
				{
					method: "POST",
					headers: { Authorization: `Bearer ${token}` },
					body:
						business,
				},
			);

			console.log(near.status)
			if (near.status === 201) {
				console.log("negocio creado ")
			}
			const data = await near.json();
		

			return data;
		} catch (error) {
			console.log(error)
			throw error
		}
	}


	// async createProduct(product: ProductCreate, business_id: number) {
	// 	const { data, error } = await this.client
	// 		.from("Products")
	// 		.insert([
	// 			{
	// 				active: true,
	// 				business_id,
	// 				description: product.description,
	// 				image: product.image,
	// 				name: product.name,
	// 				price: String(product.price),
	// 				stock: product.stock,
	// 			},
	// 		])
	// 		.returns()
	// 		.select("*");

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	await this.client.from("ProductsCategory").insert(
	// 		product.category.map((category: any) => ({
	// 			product_id: data[0].id,
	// 			category_id: parseInt(category),
	// 		})),
	// 	);

	// 	return data[0];
	// }

	// async updateProduct(product: ProductCreate, business_id: number, id: number) {
	// 	const { data, error } = await this.client
	// 		.from("Products")
	// 		.update({
	// 			name: product.name,
	// 			description: product.description,
	// 			price: String(product.price),
	// 			image: product.image,
	// 			stock: product.stock,
	// 		})
	// 		.eq("id", id)
	// 		.eq("business_id", business_id)
	// 		.returns()
	// 		.select("*");

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	await this.client.from("ProductsCategory").delete().eq("product_id", id);
	// 	console.log(product.category);

	// 	const categories = await Promise.all(
	// 		product.category.map((category:any) => ({
	// 			product_id: data[0].id,
	// 			category_id: category,
	// 		})),
	// 	);
	// 	console.log("API SERVICE", categories);
	// 	await this.client.from("ProductsCategory").insert({
	// 		category_id: parseInt(categories[0].category_id),
	// 		product_id: categories[0].product_id,
	// 	});

	// 	return data[0];
	// }

	// async createAward(discount: AwardCreate, business_id: number): Promise<void> {
	// 	const data = await Promise.all(
	// 		discount.product_id.map(async (product) => {
	// 			return this.client
	// 				.from("DiscountCodes")
	// 				.insert([
	// 					{
	// 						name: discount.name,
	// 						discount: discount.discount,
	// 						product_id: parseInt(product),
	// 						business_id,
	// 						description: discount.description,
	// 						type: discount.type,
	// 						point_cost: discount.point_cost,
	// 						image: discount.image,
	// 					},
	// 				])
	// 				.returns()
	// 				.select("*");
	// 		}),
	// 	);

	// 	return;
	// }

	// async getAwards(business_id: number, type: number) {
	// 	const { data, error } = await this.client
	// 		.from("DiscountCodes")
	// 		.select("*")
	// 		.eq("business_id", business_id)
	// 		.neq("point_cost", 0)
	// 		.eq("active", true);
	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	return data;
	// }

	// async getGifts(business_id: number, type: number) {
	// 	const { data, error } = await this.client
	// 		.from("DiscountCodes")
	// 		.select("*")
	// 		.eq("business_id", business_id)
	// 		.eq("point_cost", 0)
	// 		.eq("active", true);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	return data;
	// }

	// async createGift(discount: AwardCreate, business_id: number): Promise<void> {
	// 	const data = await Promise.all(
	// 		discount.product_id.map(async (product) => {
	// 			return this.client
	// 				.from("DiscountCodes")
	// 				.insert([
	// 					{
	// 						name: discount.name,
	// 						discount: discount.discount,
	// 						product_id: parseInt(product),
	// 						business_id,
	// 						description: discount.description,
	// 						type: discount.type,
	// 						point_cost: 0,
	// 						image: discount.image,
	// 					},
	// 				])
	// 				.returns()
	// 				.select("*");
	// 		}),
	// 	);

	// 	return;
	// }

	// async getDiscountById(code: string, business_id: number) {
	// 	const { data, error } = await this.client
	// 		.from("GeneratedCodes")
	// 		.select("*, DiscountCodes(*)")
	// 		.eq("code", code)
	// 		.eq("DiscountCodes.business_id", business_id)
	// 		.eq("active", true);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	console.log(data);

	// 	if (data.length > 0) {
	// 		const expireAt = data[0].expireAt ?? "";
	// 		const hasExpire = new Date(expireAt) < new Date();

	// 		if (hasExpire) {
	// 			return null;
	// 		}

	// 		return data[0];
	// 	}
	// 	return null;
	// }
	// async ScanCode(code: string, business_id: number, user_id: string) {
	// 	return fetch(
	// 		"https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/winap-scan-code",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ code, business_id, user_id }),
	// 		},
	// 	).then((res) => res.json());
	// }

	// async getScannedCodes(business_id: number, user_id: string): Promise<any[]> {
	// 	return fetch(
	// 		"https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/get-scanned-code",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ business_id, user_id_partner: user_id }),
	// 		},
	// 	).then((res) => res.json());
	// }

	// async getOrders(business_id: number, status: Status | Status[]) {
	// 	return fetch(
	// 		"https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/winap-get-orders",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ business_id, status }),
	// 		},
	// 	).then((res) => res.json());
	// }

	// async changeStatusOrder(order_id: string, status: Status) {
	// 	return fetch(
	// 		"https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/winap-update-orders",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ order_id, status }),
	// 		},
	// 	).then((res) => res.json());
	// }

	// async deleteCodes(code_id: number, business_id: number) {
	// 	const { data, error } = await this.client
	// 		.from("DiscountCodes")
	// 		.select("*")
	// 		.eq("id", code_id)
	// 		.eq("business_id", business_id);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	if (data.length > 0) {
	// 		await this.client
	// 			.from("DiscountCodes")
	// 			.update({ active: false })
	// 			.eq("id", code_id);
	// 	}
	// }
}
