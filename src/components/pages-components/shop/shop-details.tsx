/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { redirect } from "next/navigation";
import React from "react";

import { useRefetchWhenFavouriteStore } from "@/store";
import PageHeader from "@/components/shared/page-header";
import CarouselCard from "@/components/shared/carousel-card";
import ProductImages from "./details/images";
import ProductDetails from "./details/details";
import { useProductQuery, useProductSimilarQuery } from "@/hooks/root/use-root-hooks";
import Loading from "@/components/shared/loading";

const Details = ({ lang, detailsId }: { lang: string; detailsId?: string }) => {
	const isRTL = lang === "ar";

	const { favouriteRefetch } = useRefetchWhenFavouriteStore();
	if (!detailsId) return redirect(`/${lang}/store`);

	const { data: product, isPending, isFetching, refetch } = useProductQuery(`${detailsId}`);
	const { data: productSimilar, isPending: isPendingSimilar } = useProductSimilarQuery(`${detailsId}`);
	if (favouriteRefetch ? isPending : isFetching) return <Loading />;

	return (
		<main>
			<PageHeader
				pageName={product?.data?.name as string}
				breads={[{ name: isRTL ? "المتجر" : "Chique Bouttique Store", href: `/${lang}/store` }]}
			/>

			<div className="container flex w-full flex-col items-start justify-center gap-5 py-[50px] md:flex-row md:gap-9 lg:gap-20">
				<ProductDetails
					getShopDetails={product?.data}
					refetch={refetch}
				/>
				<ProductImages getShopDetails={product?.data} />
			</div>

			<CarouselCard
				header={isRTL ? "منتجات مشابهة" : "Similar Products"}
				productArr={isPendingSimilar ? [] : productSimilar?.data?.items}
				refetch={refetch}
			/>
		</main>
	);
};

export default Details;
