"use client";

import React from "react";

import CarouselCard from "@/components/shared/carousel-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { ProductProps } from "@/types";

const FlashSale = ({ offers, refetch }: { offers: ProductProps[] | any; refetch: Function }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<CarouselCard
			header={isRTL ? "تسوق عروضنا الحصرية" : "Discover our flash sale"}
			productArr={offers}
			refetch={refetch}
			isFlash={true}
		/>
	);
};

export default FlashSale;
