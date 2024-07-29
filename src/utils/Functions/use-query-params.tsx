"use client";

import { useQueryParam, StringParam, withDefault } from "use-query-params";

export const useQueryParams = () => {
	const [category, setCategory] = useQueryParam("category", withDefault(StringParam, ""));
	const [show, setShow] = useQueryParam("show", withDefault(StringParam, ""));
	const [price, setPrice] = useQueryParam("price", withDefault(StringParam, ""));
	const [search, setSearch] = useQueryParam("search", withDefault(StringParam, ""));
	const [maxPrice, setMaxPrice] = useQueryParam("maxPrice", withDefault(StringParam, ""));
	const [minPrice, setMinPrice] = useQueryParam("minPrice", withDefault(StringParam, ""));
	return { category, setCategory, show, setShow, price, setPrice, search, setSearch, maxPrice, setMaxPrice, minPrice, setMinPrice };
};
