"use client";

import { timeZone } from "@/utils";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

export const Headers = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const token = getCookiesClientSide("token");
	// get time zone

	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true,
		"Accept-Language": isRTL ? "ar" : "en",
		"x-timezone": timeZone,
		"Content-Encoding": "gzip",
		"X-RESPONSE-CODE": true,
		Authorization: token ? `Bearer ${token}` : "",
	};

	return { headers };
};
