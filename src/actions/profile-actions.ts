"use server";

import { Headers } from "@/hooks/server-headers";
import axios from "axios";

export const getProfileData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/auth/profile`, { headers });
	return response.data;
};

export const getWalletData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/wallet`, { headers });
	return response.data;
};

export const getPointsData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/get-point`, { headers });
	return response.data;
};

export const getNewOrdersData = async ({ params, headers }: { params: any; headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/orders`, { headers, params });
	return response.data;
};

export const getOldOrdersData = async ({ params, headers }: { params: any; headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/old/orders`, { headers, params });
	return response.data;
};

export const getOrderDetailsData = async ({ params, headers }: { params: any; headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/show/${params?.id}/order`, { headers });
	return response.data;
};

export const getReturnOrderData = async ({ params, headers }: { params: any; headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/returns`, { headers, params });
	return response.data;
};

export const getReturnOrderDetailsData = async ({ params, headers }: { params: any; headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/show/${params?.id}/return`, { headers });
	return response.data;
};

export const getFavouritesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/products/favourites`, { headers });
	return response.data;
};

export const getCouponsData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/coupons`, { headers });
	return response.data;
};

export const getAddressData = async ({ id }: { id: string }) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/addresses/${id}`, { headers });
	return response.data;
};

export const getOrderStatusData = async ({ headers }: { headers: any }) => {
	const response = await axios.get(`${process.env.API_URL}/orders-status`, { headers });
	return response.data;
};
