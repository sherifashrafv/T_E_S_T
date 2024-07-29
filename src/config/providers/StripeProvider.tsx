"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useStripeKeysQuery } from "@/hooks/cart/use-cart-hooks";
import { useOrderTypeStore } from "@/store";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: stripeKeys, isFetching } = useStripeKeysQuery();
	const { clientSecret } = useOrderTypeStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	if (isFetching) return <></>;

	const stripeKey = stripeKeys?.data?.key;
	const options: any = {
		clientSecret,
		locale: isRTL ? "ar" : "en",
		appearance: {
			theme: "stripe",
		},
	};

	return clientSecret && stripeKey ? (
		<Elements
			options={options}
			stripe={loadStripe(stripeKey)}>
			{children}
		</Elements>
	) : null;
};
