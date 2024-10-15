export type BusinessResponse = Business[];
export type ProductResponse = Product[];

export type Business = {
	id: number;
	name: string;
	address: string;
	description: string;
	country: string;
	created_at: string;
	logo: string;
	active: boolean;
	deleted: boolean;
	distance?: Distance;
};

export type Distance = {
	value: number;
	text: string;
};

export type Product = {
	id: string;
	businessId: string;
	categoryId: number;
	name: string;
	description: string;
	unitPrice: number;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	active: boolean;
	stock: number;
	deleted: boolean;
	selled: number;
	addons: Array<string>;
};



export type ProductCategory = {
	id: number;
	product_id: number;
	category_id: number;
};

export type Subscription = {
	id: number;
	user_id: string;
	business_id: number;
	credits: number;
	card_number: string;
	created_at: Date;
};

export type Discount = {
	id: number;
	business_id: number;
	code: string;
	discount: number;
	created_at: Date;
	active: boolean;
	deleted: boolean;
};

export type BussinessCreate = {
	name: string;
	address: string;
	description: string;
	logo: string;
	color:string
};

export type ProductCreate = {
	name: string;
	description: string;
	unitPrice: number;
	image: string;
	stock: number;
	categoryId: string;
	price:number;
	category:any;
};

export type AwardCreate = {
	name: string;
	description: string;
	point_cost: number;
	type: number;
	discount?: number | null;
	product_id: string[];
	image: string;
};

export type Award = {
	id: number;
	name: string;
	description: string;
	point_cost: number;
	type: number;
	discount: number | null;
	created_at: Date;
	active: boolean;
	deleted: boolean;
	image: string;
};

export type GeneratedCode = {
	id: number;
	discount_code_id: number;
	user_id: string;
	code: string;
	created_at: Date;
	active: boolean;
	expireAt: Date;
	DiscountCodes: Discount;
	Products: Product;
};

//  {"DiscountCodes": {"active": true, "business_id": 7, "created_at": "2024-03-06T02:19:03.733508+00:00", "description": "Prueba", "discount": 30, "id": 11, "name": "Prueba", "point_cost": 0, "product_id": 10, "type": 1}, "active": true, "code": "6Lq9EsGj", "created_at": "2024-03-06T02:19:45.26689+00:00", "discount_code_id": 11, "expireAt": "2024-03-06T02:24:46.808", "id": 28, "user_id": "user_2dD1S9Pwfl9WwhgDlulvLM5ENO2"}
