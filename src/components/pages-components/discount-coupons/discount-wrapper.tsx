"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import CopuneCard from "./copune-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useCouponsQuery } from "@/hooks/profile/use-profile-hooks";
import { CouponsProps } from "@/types";
import Empty from "@/components/shared/empty";
import { Loader2Icon } from "lucide-react";

const DiscountWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { data: coupons, isFetching } = useCouponsQuery();

	return (
		<div className="flex w-full flex-col gap-5">
			<CartHeader title={isRTL ? "كوبونات الخصم" : "Discount Coupons"} />

			{isFetching ? (
				<div className="flex size-full items-center justify-center">
					<Loader2Icon className="mx-auto size-5 animate-spin" />
				</div>
			) : coupons?.data?.items?.length === (0 || undefined) ? (
				<div className="flex size-full items-center justify-center">
					<Empty />
				</div>
			) : (
				<div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
					{coupons?.data?.items?.map((copune: CouponsProps) => (
						<CopuneCard
							coupons={copune}
							key={copune?.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default DiscountWrapper;
