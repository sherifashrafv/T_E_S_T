"use client";

import React, { useState } from "react";

import ShopCard from "./shop-cards";
import { useProductsQuery, useSaleQuery } from "@/hooks/root/use-root-hooks";
import Loading from "@/components/shared/loading";
import ShopFilter from "./shop-filter";
import MobileFilter from "./mobile-filter";
import { useQueryParams } from "@/utils/Functions/use-query-params";
import { useParamsStore } from "@/store";
import { LoaderIcon } from "lucide-react";
import Empty from "@/components/shared/empty";

const ShopWrapper = ({ viewType }: { viewType: string }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const { category } = useQueryParams();
	const {
		params: { show, price, maxPrice, minPrice, search, favourites },
	} = useParamsStore();

	const { data: sales, isFetching: salePending, refetch: saleRefetch } = useSaleQuery();
	const {
		data: products,
		isFetching,
		refetch,
	} = useProductsQuery({
		page: currentPage,
		sort: price,
		categoryId: category === "all" ? "" : category,
		offer: show,
		maxPrice,
		minPrice,
		favourites: favourites === "2" ? 1 : 0,
		name: search,
	});

	if (viewType === "sale" && salePending) return <Loading />;

	return (
		<div className="flex w-full flex-col items-start gap-5 md:flex-row md:gap-10">
			{viewType !== "sale" && (
				<>
					<ShopFilter />
					<MobileFilter />
				</>
			)}
			{(!isFetching && products?.data?.items?.length === 0) || (viewType === "sale" && sales?.data?.items?.length === 0) ? (
				<div className="flex w-full items-center justify-center">
					<Empty />
				</div>
			) : isFetching && viewType !== "sale" ? (
				<div className="flex size-full items-center justify-center">
					<LoaderIcon className="animate-spin" />
				</div>
			) : (
				<ShopCard
					productArr={viewType === "sale" ? sales?.data?.items || ([] as any) : products?.data?.items || ([] as any)}
					paginate={
						viewType === "sale"
							? (sales?.data?.paginate as any) || ({ per_page: 0 } as any)
							: (products?.data?.paginate as any) || ({ per_page: 0 } as any)
					}
					viewType={viewType}
					refetch={viewType === "sale" ? saleRefetch : refetch}
					currentPage={currentPage}
					setCurrentPage={(value: number) => setCurrentPage(value)}
				/>
			)}
		</div>
	);
};

export default ShopWrapper;
