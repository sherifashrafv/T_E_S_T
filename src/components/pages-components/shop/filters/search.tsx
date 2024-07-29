"use client";

import React from "react";

import InputWithIcon from "@/components/common/froms/Input";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Search as SearchIcon, Trash2 } from "lucide-react";
import { useParamsStore } from "@/store";
import { useQueryParams } from "@/utils/Functions/use-query-params";

const Search = () => {
	const { params, setParams } = useParamsStore();
	const { setCategory } = useQueryParams();
	const lang = getCookiesClientSide("NEXT_LOCALE") === "ar" ? "ar" : "en";

	const resetFilter = () => {
		setParams({ favourites: "0", show: "0", price: "price_asc", maxPrice: 0, minPrice: 0, search: "" });
		setCategory("all");
	};

	return (
		<div className="flex w-full items-center justify-center gap-5">
			<InputWithIcon
				lang={lang}
				icon={SearchIcon}
				placeholder={lang === "ar" ? "بحث في المنتجات ..." : "Search for product ..."}
				className={`h-[40px] w-[208px] ${lang === "ar" ? "pr-8" : "pl-8"}`}
				value={params?.search}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setParams({
						...params,
						search: e.target.value as string,
					})
				}
			/>

			<Trash2
				className="size-10 cursor-pointer"
				color="red"
				onClick={resetFilter}
			/>
		</div>
	);
};

export default Search;
