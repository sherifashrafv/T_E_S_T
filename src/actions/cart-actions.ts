/* eslint-disable camelcase */
"use server";

import { Headers } from "@/hooks/server-headers";
import axios from "axios";

export const getCartData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/get-cart`, { headers });
	return response.data;
};

export const getAddressesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/addresses`, { headers });
	return response.data;
};

export const getCountriesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/countries`, { headers });
	return response.data;
};

export const getCitiesData = async ({ country_id }: { country_id: string }) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/cities?country_id=${country_id}`, { headers });
	return response.data;
};

export const getPaymentMethodsData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/orders-payment_method`, { headers });
	return response.data;
};

export const getPaymentTypesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/orders-payment_type`, { headers });
	return response.data;
};

export const getStripeKeysData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/payment-stripe`, { headers });
	return response.data;
};
