"use client";

import axios from "axios";
import React, { useEffect } from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
	const token = getCookiesClientSide("token");

	axios.defaults.baseURL = "https://admin.chiquebouttique.com/api";
	axios.defaults.headers.post.Authorization = `Bearer ${token}`;
	axios.defaults.headers.delete.Authorization = `Bearer ${token}`;
	axios.defaults.headers.get.Authorization = `Bearer ${token}`;
	axios.defaults.headers.put.Authorization = `Bearer ${token}`;

	useEffect(() => {
		// Add a request interceptor
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				// Do something with request error
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(requestInterceptor);
		};
	}, [token]);

	return <section>{children}</section>;
};

export default AxiosInterceptor;
