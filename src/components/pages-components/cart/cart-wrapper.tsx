"use client";

import React from "react";

import OrderSummary from "@/components/shared/order-summary";
import CartHeader from "@/components/shared/cart-header";
import CartProductCard from "./product-card";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import { CartItemsProps } from "@/types";
import Loading from "@/components/shared/loading";
import Empty from "@/components/shared/empty";
import OrderType from "./order-type";

const CartWrapper = ({ lang }: { lang: string }) => {
	const isRTL = lang === "ar";

	const { data, isPending, refetch } = useCartOrdersQuery();

	if (isPending) return <Loading />;

	return (
		<div className="container flex w-full flex-col items-start justify-center gap-5 py-[50px] lg:flex-row lg:gap-10 lg:py-[100px]">
			<div className="flex w-full flex-col justify-start gap-5 md:max-w-[797px]">
				<CartHeader title={isRTL ? `سلة الشراء ${data?.data?.order?.items?.length}` : `Shopping Cart ${data?.data?.order?.items?.length}`} />
				<div className="flex w-full flex-col justify-start gap-5">
					{data?.data?.order?.items?.length === 0 ? (
						<Empty />
					) : (
						data?.data?.order?.items?.map((product: CartItemsProps) => (
							<CartProductCard
								key={product.id}
								product={product}
								refetch={refetch}
							/>
						))
					)}
				</div>

				<CartHeader title={isRTL ? "هل هذا الطلب طلب للهدية؟" : "Is this order a gift?"} />
				<OrderType />
			</div>
			<OrderSummary href={`/${isRTL ? "ar" : "en"}/choose-address`} />
		</div>
	);
};

export default CartWrapper;
