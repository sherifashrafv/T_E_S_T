"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import OrderTabsLayout from "./order-tabs-layout";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const OrdersWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex flex-col gap-5">
			<CartHeader title={isRTL ? "طلباتي" : "My Orders"} />

			<OrderTabsLayout />
		</div>
	);
};

export default OrdersWrapper;
