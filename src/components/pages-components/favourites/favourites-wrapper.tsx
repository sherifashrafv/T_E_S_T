"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import ProductCard from "@/components/shared/product-card";
import Empty from "./empty";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useFavouritesQuery } from "@/hooks/profile/use-profile-hooks";
import { Loader2Icon } from "lucide-react";
import { ProductProps } from "@/types";
import { useHomeQuery } from "@/hooks/root/use-root-hooks";

const FavouritesWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { refetch: homeRefetch } = useHomeQuery();
	const { data: favourites, isFetching, refetch } = useFavouritesQuery();

	return (
		<div className="flex flex-col gap-5">
			<CartHeader title={isRTL ? "المنتجات المفضلة" : "Favorite Products"} />
			{isFetching ? (
				<div className="flex items-center justify-center">
					<Loader2Icon className="mx-auto size-5 animate-spin" />
				</div>
			) : favourites?.data?.products?.length === 0 ? (
				<Empty pageName={isRTL ? "المنتجات المفضلة" : "Favorite Products"} />
			) : (
				<div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
					{favourites?.data?.products?.map((item: ProductProps) => {
						return (
							<ProductCard
								key={item.id}
								item={item}
								refetch={() => {
									homeRefetch();
									refetch();
								}}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default FavouritesWrapper;
