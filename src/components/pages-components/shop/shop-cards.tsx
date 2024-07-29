"use client";

import React from "react";

import ProductCard from "@/components/shared/product-card";
import { Pagination } from "@/components/shared/pagination";
import { ProductProps } from "@/types";

type Props = {
	viewType: string;
	productArr: ProductProps[];
	paginate: any;
	refetch: Function;
	currentPage: number;
	setCurrentPage: (value: number) => void;
};

const ShopCard = ({ refetch, productArr, viewType, paginate, currentPage, setCurrentPage }: Props) => {
	const itemsPerPage = paginate?.per_page;

	return (
		<div className={`flex w-full ${viewType === "sale" ? "w-full" : "max-w-[845px]"} flex-col gap-5 md:gap-10`}>
			<div
				className={`grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 md:gap-5 ${viewType === "sale" ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
				{productArr?.map((item) => (
					<ProductCard
						key={item.id}
						item={item}
						refetch={refetch}
					/>
				))}
			</div>

			{paginate?.total > paginate?.per_page && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onPageChange={setCurrentPage}
					totalItems={paginate?.total}
				/>
			)}
		</div>
	);
};

export default ShopCard;
