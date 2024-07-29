"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import InputWithIcon from "@/components/common/froms/Input";

import { ListFilter, SearchIcon, SlidersHorizontal } from "lucide-react";
import { useParamsStore } from "@/store";
import GlobalDropdown from "@/components/shared/drop-down";
import Category from "./filters/category";
import Products from "./filters/products";
import FilterPrice from "./filters/filter-price";
import Sorted from "./filters/sorted";

const MobileFilter = () => {
	const { params, setParams } = useParamsStore();
	const lang = getCookiesClientSide("NEXT_LOCALE") === "ar" ? "ar" : "en";

	return (
		<div className="flex w-full items-center justify-center gap-2 md:hidden">
			<InputWithIcon
				lang={lang}
				icon={SearchIcon}
				placeholder={lang === "ar" ? "بحث في المنتجات ..." : "Search for product ..."}
				className={`h-[40px] flex-1 ${lang === "ar" ? "pr-8" : "pl-8"}`}
				value={params?.search}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setParams({
						...params,
						search: e.target.value as string,
					})
				}
			/>
			<div className="flex flex-[0.5] items-center justify-center gap-2">
				<GlobalDropdown
					triggerChildren={
						<div className="flex size-10 cursor-pointer items-center justify-center rounded border border-primary">
							<ListFilter size={20} />
						</div>
					}>
					<div className="size-full max-h-[300px] max-w-[300px] flex-col overflow-y-auto p-2 md:flex">
						<Category inMobile />
						<Products inMobile />
						<FilterPrice inMobile />
					</div>
				</GlobalDropdown>

				<GlobalDropdown
					triggerChildren={
						<div className="flex size-10 cursor-pointer items-center justify-center rounded border border-primary">
							<SlidersHorizontal size={20} />
						</div>
					}>
					<div className="size-full max-h-[300px] max-w-[300px] flex-col overflow-y-auto p-2 md:flex">
						<Sorted inMobile />
					</div>
				</GlobalDropdown>
			</div>
		</div>
	);
};

export default MobileFilter;
