// src/components/pages-components/home/home-wrapper.tsx

"use client";

import React, { memo } from "react";
import { useHomeQuery } from "@/hooks/root/use-root-hooks";
import Hero from "./hero";
import FlashSale from "./flash-sale";
import Categories from "./categories";
import Arrivals from "./arrivals";
import { ProductProps } from "@/types";
import Loading from "@/components/shared/loading";

const HomeWrapper: React.FC = () => {
	const { data: homeData, loading: isPending, refetch } = useHomeQuery();

	if (isPending) return <Loading />;

	const {
		categories = [],
		offers = { items: [] },
		featured = { items: [] },
		products = { items: [] },
		apple_store_link: apple = "",
		android_store_link: android = "",
	} = (homeData as any)?.data || {};

	const updateOffer = offers.items.map((item: ProductProps) => ({
		...item,
		offer: true,
		name: item.product_name,
	}));
	const appURL = { apple, google: android };

	const arrivals = {
		products: products.items.slice(0, 5),
		featured: featured.items.slice(0, 5),
		sale: updateOffer.slice(0, 5),
	};

	return (
		<>
			<Hero appURL={appURL} />
			{updateOffer.length > 0 && (
				<FlashSale offers={updateOffer} refetch={refetch} />
			)}
			{categories.length > 0 && <Categories categories={categories} />}
			<Arrivals refetch={refetch} arrivals={arrivals} />
		</>
	);
};

export default memo(HomeWrapper);
