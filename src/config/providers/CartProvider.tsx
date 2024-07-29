"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const router = useRouter();
	const { data, isFetching } = useCartOrdersQuery();

	if (!isFetching && !data?.data?.order?.items_count) {
		router.push("/");
		toast.error(isRTL ? "السلة فارغة" : "Cart is empty");
	}

	return <>{children}</>;
};

export default CartProvider;
