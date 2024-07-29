/* eslint-disable camelcase */
"use server";

import { Headers } from "@/hooks/server-headers";
import { ProductParamsProps } from "@/types";
import axios from "axios";

export const getHomeData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/home`, { headers });
	return response.data;
};

export const getHeaderData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/header`, { headers });
	return response.data;
};

export const getAboutusData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/about-us`, { headers });
	return response.data;
};

export const getFooterData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/footer`, { headers });
	return response.data;
};

export const getContactusData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/contact-us`, { headers });
	return response.data;
};

export const getBlogsData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/blogs`, { headers });
	return response.data;
};

export const getBlogData = async (id: string) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/blog/${id}`, { headers });
	return response.data;
};

export const getMaxPriceData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/max-price-product`, { headers });
	return response.data;
};

export const getSalesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/all-offers`, { headers });
	return response.data;
};

export const getCategoriesData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/categories`, { headers });
	return response.data;
};

export const getProductsData = async ({ page = 1, sort, category_id, name, max_price, min_price, favourites, offer }: ProductParamsProps) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/products`, {
		headers,
		params: { page, sort, category_id, name, max_price, min_price, favourites, offer },
	});
	return response.data;
};

export const getProductData = async (id: string) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/products/${id}`, { headers });
	return response.data;
};

export const getProductSimilarData = async (id: string) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/products/smiller?id=${id}`, { headers });
	return response.data;
};

export const getPolicyData = async () => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/policy`, { headers });
	return response.data;
};

export const getChatsData = async (id: string) => {
	const { headers } = Headers();

	const response = await axios.get(`${process.env.API_URL}/get-admin-chat/${id}`, { headers });
	return response.data;
};
