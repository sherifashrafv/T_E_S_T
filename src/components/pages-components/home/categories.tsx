"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import SectionHeader from "../../shared/section-header";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { CategoriesProps } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Categories = ({ categories }: { categories: CategoriesProps[] }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="container flex w-full flex-col items-center  gap-12 py-[40px] lg:py-[100px]">
			<SectionHeader
				header={isRTL ? "التسوق حسب القسم" : "Shop By Category"}
			/>
			<div className="w-full">
				<Swiper
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					spaceBetween={10}
					slidesPerView={6}
					modules={[Autoplay]}
					loop={true}
					breakpoints={{
						320: {
							slidesPerView: 2,
							spaceBetween: 10,
						},

						480: {
							slidesPerView: 2,
							spaceBetween: 10,
						},

						640: {
							slidesPerView: 3,
							spaceBetween: 10,
						},

						768: {
							slidesPerView: 4,
							spaceBetween: 10,
						},
						1024: {
							slidesPerView: 6,
							spaceBetween: 10,
						},
					}}
				>
					{categories?.map(({ id, name, image }) => (
						<SwiperSlide key={id}>
							<Link
								href={`/${isRTL ? "ar" : "en"}/store?category=${id}`}
								className="flex flex-col items-center gap-5"
							>
								<Image
									src={image}
									alt={name}
									width={160}
									height={160}
									priority
									className="size-[160px] rounded-full object-cover"
								/>
								<h2 className="text-center text-[14px] font-[700] capitalize text-primary md:text-lg">
									{name}
								</h2>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Categories;
