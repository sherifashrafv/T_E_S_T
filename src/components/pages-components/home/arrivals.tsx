"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/shared/product-card";
import { ProductProps } from "@/types";

const Arrivals = ({
	refetch,
	arrivals,
}: {
	refetch: Function;
	arrivals: {
		products: ProductProps[];
		featured: ProductProps[];
		sale: ProductProps[] | any;
	};
}) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex w-full items-center justify-center px-5 py-[50px]">
			<Tabs
				defaultValue="arrivals"
				dir={isRTL ? "rtl" : "ltr"}
				className="size-full md:container">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="arrivals">{isRTL ? "وصل حديثا" : "New Arrivals"}</TabsTrigger>
					<TabsTrigger value="featured">{isRTL ? "متميز" : "Featured"}</TabsTrigger>
					<TabsTrigger value="sale">{isRTL ? "عروض" : "Sale"}</TabsTrigger>
				</TabsList>
				<div className="mt-5 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{arrivals?.products?.map((tab) => (
						<TabsContent
							value={"arrivals"}
							key={tab.id}>
							<ProductCard
								item={tab}
								refetch={refetch}
							/>
						</TabsContent>
					))}
					{arrivals?.featured?.map((tab) => (
						<TabsContent
							value={"featured"}
							key={tab.id}>
							<ProductCard
								item={tab}
								refetch={refetch}
							/>
						</TabsContent>
					))}
					{arrivals?.sale?.map((tab: any) => (
						<TabsContent
							value={"sale"}
							key={tab.id}>
							<ProductCard
								item={tab}
								refetch={refetch}
							/>
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	);
};

export default Arrivals;
