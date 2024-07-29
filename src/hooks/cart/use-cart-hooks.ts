import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// import { Headers } from "../global";
import {
	getAddressesData,
	getCartData,
	getCitiesData,
	getCountriesData,
	getPaymentMethodsData,
	getPaymentTypesData,
	getStripeKeysData,
} from "@/actions/cart-actions";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

export const useCartOrdersQuery = () => {
	const getUser = JSON.parse(getCookiesClientSide("user")! || "{}");

	return useQuery({
		queryKey: ["cart"],
		queryFn: async () => await getCartData(),
		enabled: !!getUser?.id,
	});
};

export const useAddressesQuery = () => {
	return useQuery({
		queryKey: ["addresses"],
		queryFn: async () => await getAddressesData(),
	});
};

export const useCountriesQuery = () => {
	return useQuery({
		queryKey: ["countries"],
		queryFn: async () => await getCountriesData(),
	});
};
export const useCitiesQuery = ({ id }: { id: string }) => {
	return useQuery({
		queryKey: ["cities", id],
		queryFn: async () => await getCitiesData({ country_id: id }),
		enabled: !!id,
	});
};

export const usePaymentMethodsQuery = () => {
	return useQuery({
		queryKey: ["payment-methods"],
		queryFn: async () => await getPaymentMethodsData(),
	});
};

export const usePaymentTypesQuery = () => {
	return useQuery({
		queryKey: ["payment-types"],
		queryFn: async () => await getPaymentTypesData(),
	});
};

export const useStripeKeysQuery = () => {
	return useQuery({
		queryKey: ["stripe-keys"],
		queryFn: async () => await getStripeKeysData(),
	});
};
