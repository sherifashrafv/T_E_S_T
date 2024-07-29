"use client";

import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

export const setCookiesClientSide = (key: string, value: string) => {
	setCookie(key, value);
};

export const getCookiesClientSide = (key: string) => {
	return getCookie(key);
};

export const deleteCookiesClientSide = (key: string) => {
	deleteCookie(key);
};

export const hasCookiesClientSide = (key: string) => {
	return hasCookie(key);
};
