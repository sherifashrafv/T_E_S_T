"use client";

import React, { memo, useMemo } from "react";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";
import SectionHeader from "@/components/shared/section-header";
import { ProductProps } from "@/types";

type Props = {
	header: string;
	productArr: ProductProps[];
	refetch: Function;
	isFlash?: boolean;
};

const CarouselCard = ({ header, productArr, refetch, isFlash }: Props) => {
	const isRTL = useMemo(
		() => getCookiesClientSide("NEXT_LOCALE") === "ar",
		[]
	);

	const renderedItems = useMemo(
		() =>
			productArr.map((item) => (
				<CarouselItem
					key={item.id}
					className="basis-1/2 pl-4 md:basis-1/4 lg:basis-1/6"
				>
					<ProductCard item={item} refetch={refetch} />
				</CarouselItem>
			)),
		[productArr, refetch]
	);

	return (
		<div
			className={`flex w-full flex-col items-center gap-12 px-2  md:container ${isFlash ? "pt-[40px] lg:pb-0" : "py-[40px] lg:pb-[100px]"}`}
		>
			<SectionHeader header={header} />
			<Carousel
				className="flex w-full flex-col"
				opts={{ direction: isRTL ? "rtl" : "ltr", dragFree: true }}
			>
				<CarouselContent className="-ml-4">
					{renderedItems}
				</CarouselContent>
				{productArr.length > 7 && (
					<>
						<CarouselNext className="hidden size-10 rounded-md bg-card-card2 md:flex" />
						<CarouselPrevious className="hidden size-10 rounded-md bg-card-card2 md:flex" />
					</>
				)}
			</Carousel>
		</div>
	);
};

export default memo(CarouselCard);
