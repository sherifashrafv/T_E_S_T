export interface MenuItems {
	id: number;
	name: string;
	href: string;
	logout?: boolean;
}

export interface UserProps {
	avatar: string;
	email: string;
	gender: string;
	google_id: string;
	id: number;
	is_active: boolean;
	is_verified: boolean;
	name: string;
	notification_count: number;
	notifications: number;
	phone: string;
	phonecode: string;
	point: number;
	tex: string;
	val_point: number;
	wallet: number;
}

export interface RegisterResponse {
	device_id: string;
	token: string;
	user: UserProps;
}

export interface PaginateProps {
	total: number;
	count: number;
	per_page: number;
	current_page: number;
	total_pages: number;
}

// Root Layout Props
export interface BannersProps {
	id: number;
	title: string;
	category: string;
	image: string;
	description: string;
}

export interface BrandsProps {}

export interface SubCategoriesProps {
	id: number;
	name: string;
	description: string;
}
export interface CategoriesProps {
	id: number;
	name: string;
	image: string;
	description: string;
	products: number;
	sub_categories: SubCategoriesProps[];
}

export interface ProductProps {
	id: number;
	end_date: string;
	start_date: string;
	product_name: string;
	name: string;
	color: string;
	color_id: number;
	image: string;
	size: string;
	size_id: number;
	product_id: number;
	status_key: string;
	status: string;
	is_available: boolean;
	rate: string;
	price: string;
	price_offer: string;
	offer: false;
	currency: string;
	ratio: string;
	total_from: string;
	total_to: string;
	is_favoured: boolean;
	images: { id: number; url: string }[];
}

export interface FooterProps {
	facebook: string;
	whatsapp: string;
	instegram: string;
	twitter: string;
	Whatsapp: string;
	snapchat: string;
	LinkedIn: string;
	website: string;
	TikTok: string;
	YouTube: string;
	email: string;
	address: string[];
	numbers: string[];
	android_store_link: string;
	apple_store_link: string;
	footer: string;
}

export interface HomeResponseProps {
	status: boolean;
	data: {
		banners: BannersProps[];
		brands: BrandsProps[];
		categories: CategoriesProps[];
		products: {
			items: ProductProps[];
			paginate: PaginateProps;
		};
		offers: {
			items: ProductProps[];
			paginate: PaginateProps;
		};
		featured: {
			items: ProductProps[];
			paginate: PaginateProps;
		};
		profile: string;
		facebook: string;
		whatsapp: string;
		instegram: string;
		twitter: string;
		LinkedIn: string;
		website: string;
		TikTok: string;
		YouTube: string;
		email: string;
		address: string[];
		numbers: string[];
		android_store_link: string;
		apple_store_link: string;
		footer: string;
	};
}

// About us Props
export interface AboutusDataProps {
	id: number;
	title: string;
	description: string;
	image: string;
	title_colored: string;
}
export interface AboutusProps {
	section_1: AboutusDataProps;
	section_2: AboutusDataProps[];
	section_3: AboutusDataProps[];
}

// Blogs Props
export interface BlogsProps {
	id: number;
	title: string;
	date: string;
	description: string;
	image: string;
}

export interface ProductParamsProps {
	page?: number;
	sort?: string;
	category_id?: string;
	categoryId?: string;
	name?: string;
	max_price?: number;
	favourites?: number;
	maxPrice?: number;
	min_price?: number;
	minPrice?: number;
	offer?: string;
}

// Cart Props
export interface CartItemsProps {
	color: string;
	color_id: number;
	currency: string;
	grand_total: number;
	id: number;
	images: { id: number; url: string }[];
	price: string;
	product_id: number;
	product_image: string;
	product_name: string;
	quantity: number;
	quantity_returen: number;
	size: string;
	size_id: number;
}

export interface CartProps {
	actual_shipping_fees: number;
	address: [];
	branch: string;
	branch_id: number;
	cashback: number;
	company: string;
	company_id: number;
	coupon: string;
	coupon_value: string;
	created_at: string;
	currency: string;
	date_canceled: string;
	day_returns: string;
	discount: string;
	grand_total: number;
	id: number;
	items: CartItemsProps[];
	items_count: number;
	name: string;
	one_paice: number;
	order_gift_note: string;
	order_type: string;
	payment_method: string;
	phone: string;
	point_discount: string;
	products_count: number;
	rate_exists: boolean;
	representative: string;
	representative_id: string;
	shipping_fees: number;
	shipping_method: string;
	status: string;
	status_key: string;
	sub_total: number;
	tex: string;
	whatsapp: string;
}

// Profile Props
export interface ProfileProps {
	id: number;
	name: string;
	phone: string;
	phonecode: string;
	gender: string;
	avatar: string;
	point: number;
	val_point: number;
	full_phone: string;
	is_active: boolean;
	is_verified: boolean;
	notification_count: number;
	email: string;
	wallet: number;
	google_id: string;
	tex: string;
	notifications: number;
}

export interface CouponsProps {
	id: number;
	code: string;
	start: string;
	end: string;
	value: string;
	currency: string;
}

export interface AddressProps {
	id: number;
	name: string;
	postal: string;
	is_default: number;
	nearest_place: string;
	address: string;
	kind: string;
	kind_key: string;
	country: string;
	country_id: number;
	city: string;
	city_id: number;
	shipping_fees: any[];
	lat: string;
	lng: string;
}

export interface OrdersProps {
	address: string;
	cashback: number;
	coupon: string;
	items_count: number;
	coupon_value: string;
	currency: string;
	date: string;
	date_canceled: string;
	day_returns: boolean;
	return_date: string;
	grand_total: number;
	id: number;
	lat: string;
	lng: string;
	name: string;
	one_paice: number;
	order_gift_note: string;
	order_type: string;
	payment_method: string;
	phone: string;
	products_count: number;
	rate: number;
	rate_exists: boolean;
	shipping_fees: number;
	status: string;
	status_key: string;
	order_date: string;
	tex: number;
	created_at: string;
	whatsapp: string;
}
export interface HomeData {
	categories: Category[];
	offers: {
		items: ProductProps[];
	};
	featured: {
		items: ProductProps[];
	};
	products: {
		items: ProductProps[];
	};
	apple_store_link: string;
	android_store_link: string;
}

export interface Category {
	// Define your category fields here
}
