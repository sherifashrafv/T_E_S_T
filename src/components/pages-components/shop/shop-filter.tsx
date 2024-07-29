import React from "react";

import Search from "./filters/search";
import Category from "./filters/category";
import Products from "./filters/products";
import Sorted from "./filters/sorted";
import FilterPrice from "./filters/filter-price";

const ShopFilter = () => {
	return (
		<div className="hidden w-full max-w-[300px] flex-col rounded border p-4 md:flex">
			<Search />

			<Category />
			<Products />
			<Sorted />
			<FilterPrice />
		</div>
	);
};

export default ShopFilter;
