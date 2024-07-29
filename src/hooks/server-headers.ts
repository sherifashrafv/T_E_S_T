import { timeZone } from "@/utils";
import { cookies } from "next/headers";

export const Headers = () => {
	const isRTL = cookies().get("NEXT_LOCALE")?.value === "ar";
	const token = cookies().get("token")?.value;

	// get time zone

	const headers = {
		Authorization: token ? `Bearer ${token}` : "",
		"Accept-Language": isRTL ? "ar" : "en",
		"x-timezone": timeZone,
		"Content-Encoding": "gzip",
	};

	return { headers };
};
