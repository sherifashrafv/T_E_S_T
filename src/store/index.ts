import { CategoriesProps } from "./../types/index";
import { create } from "zustand";

export const useDetailsIdStore = create<{ detailsId: number | null | any; setDetailsId: (detailsId: number | null) => void }>((set) => ({
	detailsId: null,
	setDetailsId: (detailsId) => set({ detailsId }),
}));

export const useOpenModalStore = create<{ openModal: boolean; setOpenModal: (openModal: boolean) => void }>((set) => ({
	openModal: false,
	setOpenModal: (openModal) => set({ openModal }),
}));

export const useCitiesStore = create<{ cities: any[]; setCities: (cities: any[]) => void }>((set) => ({
	cities: [],
	setCities: (cities) => set({ cities }),
}));

export const useRefetchWhenFavouriteStore = create<{ favouriteRefetch: boolean; setFavouriteRefetch: (favouriteRefetch: boolean) => void }>(
	(set) => ({
		favouriteRefetch: false,
		setFavouriteRefetch: (favouriteRefetch) => set({ favouriteRefetch }),
	})
);

export const useAddFromStore = create<{ addFrom: string; setAddFrom: (addFrom: string) => void }>((set) => ({
	addFrom: "",
	setAddFrom: (addFrom) => set({ addFrom }),
}));

type Params = {
	favourites: string;
	show: string;
	price: string;
	maxPrice: number;
	minPrice: number;
	search: string;
};
export const useParamsStore = create<{ params: Params; setParams: (params: Params) => void }>((set) => ({
	params: {
		favourites: "0",
		show: "0",
		price: "price_asc",
		maxPrice: 0,
		minPrice: 0,
		search: "",
	},
	setParams: (params) => set({ params }),
}));

type OrderTypeProps = {
	orderType: string;
	orderNote: string;
	paymentType: string;
	code: string;
	paymentMethod: string;
	shippingFees: number;
	addressId: number | null;
	clientSecret: string;
	orderId: number | null;

	setOrderType: (orderType: string) => void;
	setOrderNote: (orderNote: string) => void;
	setPaymentType: (paymentType: string) => void;
	setCode: (code: string) => void;
	setPaymentMethod: (paymentMethod: string) => void;
	setShippingFees: (shippingFees: number) => void;
	setAddressId: (addressId: number | null) => void;
	setClientSecret: (clientSecret: string) => void;
	setOrderId: (orderId: number | null) => void;
};

export const useOrderTypeStore = create<OrderTypeProps>((set) => ({
	orderType: "Buying",
	orderNote: "",
	paymentType: "Stripe",
	code: "",
	paymentMethod: "Payment_by_credit_card",
	shippingFees: 0,
	addressId: null,
	clientSecret: "",
	orderId: null,

	setOrderType: (orderType) => set({ orderType }),
	setOrderNote: (orderNote) => set({ orderNote }),
	setPaymentType: (paymentType) => set({ paymentType }),
	setCode: (code) => set({ code }),
	setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
	setShippingFees: (shippingFees) => set({ shippingFees }),
	setAddressId: (addressId) => set({ addressId }),
	setClientSecret: (clientSecret) => set({ clientSecret }),
	setOrderId: (orderId) => set({ orderId }),
}));

type OrderSummaryProps = {
	items: number;
	price: number;
	walletValue: number;
	couponValue: number;
	couponCode: string;
	tax: number;
	shippingFeesValue: number | any;
	grandTotal: number;

	setItems: (items: number) => void;
	setPrice: (price: number) => void;
	setWalletValue: (walletValue: number) => void;
	setCouponValue: (couponValue: number) => void;
	setCouponCode: (couponCode: string) => void;
	setTax: (tax: number) => void;
	setShippingFees: (shippingFeesValue: any) => void;
	setGrandTotal: (grandTotal: number) => void;
};

export const useOrderSummaryStore = create<OrderSummaryProps>((set) => ({
	items: 0,
	price: 0,
	walletValue: 0,
	couponValue: 0,
	couponCode: "",
	tax: 0,
	shippingFeesValue: 0,
	grandTotal: 0,

	setItems: (items) => set({ items }),
	setPrice: (price) => set({ price }),
	setWalletValue: (walletValue) => set({ walletValue }),
	setCouponValue: (couponValue) => set({ couponValue }),
	setCouponCode: (couponCode) => set({ couponCode }),
	setTax: (tax) => set({ tax }),
	setShippingFees: (shippingFeesValue) => set({ shippingFeesValue }),
	setGrandTotal: (grandTotal) => set({ grandTotal }),
}));

export const useCategoriesStore = create<{ categories: CategoriesProps[]; setCategories: (categories: CategoriesProps[]) => void }>((set) => ({
	categories: [],
	setCategories: (categories) => set({ categories }),
}));

type SocialMediaProps = {
	whatsapp: string;
	facebook: string;
	twitter: string;
	instegram: string;
};
export const useSocialMediaStore = create<{ socialMedia: SocialMediaProps; setSocialMedia: (socialMedia: SocialMediaProps) => void }>((set) => ({
	socialMedia: {
		whatsapp: "",
		facebook: "",
		twitter: "",
		instegram: "",
	},
	setSocialMedia: (socialMedia) => set({ socialMedia }),
}));

export const useFooterStore = create<{ footerData: any; setFooterData: (footerData: any) => void }>((set) => ({
	footerData: null,
	setFooterData: (footerData) => set({ footerData }),
}));

export const useDetailsImagesStore = create<{ images: any; setImages: (images: any) => void }>((set) => ({
	images: [],
	setImages: (images) => set({ images }),
}));
