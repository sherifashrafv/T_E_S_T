import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getBlogData,
	getBlogsData,
	getContactusData,
	getHeaderData,
	getMaxPriceData,
	getPolicyData,
	getProductSimilarData,
	getProductsData,
	getSalesData,
} from "@/actions/root-action";
import { ProductParamsProps } from "@/types";
import axios from "axios";
import { Headers } from "../global";
import {
	useCategoriesStore,
	useDetailsImagesStore,
	useFooterStore,
	useSocialMediaStore,
} from "@/store";
import { useEffect, useMemo, useState } from "react";

export const useHomeQuery = () => {
	const { setCategories } = useCategoriesStore();
	const { setSocialMedia } = useSocialMediaStore();

	const [data, setData] = useState<any>(null); // Type `data` appropriately
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null); // Type error as unknown

	const fetchData = async () => {
		const headers = { "Content-Type": "application/json" };
		try {
			setLoading(true);
			const response = await axios.get("/home", { headers });
			const { Whatsapp, facebook, twitter, instegram, categories } =
				response.data?.data;

			setSocialMedia({
				whatsapp: Whatsapp,
				facebook,
				twitter,
				instegram,
			});
			setCategories(categories);

			setData(response.data);
		} catch (error) {
			console.error("Failed to fetch home data", error);
			setError(error as unknown); // Assert error as unknown
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [setCategories, setSocialMedia]);

	return { data, loading, error, refetch: fetchData };
};
export const useFooterQuery = () => {
	const { footerData, setFooterData } = useFooterStore();
	const getFooterData = async () => {
		const { headers } = Headers();

		const response = await axios.get(`/footer`, { headers });
		setFooterData(response.data);
		return response.data;
	};
	return useQuery({
		queryKey: ["footer"],
		queryFn: async () => await getFooterData(),
		enabled: footerData === null,
	});
};

export const useHeaderQuery = () => {
	const queryConfig = {
		queryKey: ["header"],
		queryFn: async () => await getHeaderData(),
		staleTime: 5 * 60 * 1000,
		cacheTime: 10 * 60 * 1000,
	};

	return useQuery(queryConfig);
};

export const useContactusQuery = () => {
	return useQuery({
		queryKey: ["contactus"],
		queryFn: async () => await getContactusData(),
	});
};

export const useBlogsQuery = (_page: number) => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: async () => await getBlogsData(),
	});
};

export const useBlogQuery = (id: string) => {
	return useQuery({
		queryKey: ["blog"],
		queryFn: async () => await getBlogData(id),
	});
};

export const useSaleQuery = () => {
	return useQuery({
		queryKey: ["sale"],
		queryFn: async () => await getSalesData(),
	});
};

export const useCategoriesQuery = () => {
	const { categories } = useCategoriesStore();

	const getCategoriesData = async () => {
		const { headers } = Headers();
		const response = await axios.get(`/categories`, { headers });
		return response.data;
	};
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => await getCategoriesData(),
		enabled: categories.length === 0,
	});
};

export const useProductsQuery = ({
	page = 1,
	sort,
	categoryId,
	name,
	maxPrice,
	minPrice,
	offer,
	favourites,
}: ProductParamsProps) => {
	return useQuery({
		queryKey: [
			"products",
			page,
			sort,
			categoryId,
			name,
			maxPrice,
			minPrice,
			favourites,
			offer,
		],
		queryFn: async () =>
			await getProductsData({
				page,
				sort,
				category_id: categoryId,
				name,
				max_price: maxPrice,
				min_price: minPrice,
				offer,
				favourites,
			}),
		placeholderData: () => keepPreviousData,
	});
};

export const useProductsInSearchQuery = ({ name }: ProductParamsProps) => {
	return useQuery({
		queryKey: ["products", name],
		queryFn: async () =>
			await getProductsData({
				page: 1,
				sort: "",
				category_id: "",
				name,
				max_price: 0,
				min_price: 0,
				offer: "",
				favourites: 0,
			}),
		enabled: !!name,
	});
};

export const useMaxPriceQuery = () => {
	return useQuery({
		queryKey: ["maxprice"],
		queryFn: async () => await getMaxPriceData(),
	});
};

export const useProductQuery = (id: string) => {
	const { setImages } = useDetailsImagesStore();

	const getProductData = async () => {
		const { headers } = Headers();
		setImages([]);
		const response = await axios.get(`/products/${id}`, { headers });
		return response.data;
	};
	return useQuery({
		queryKey: ["product"],
		queryFn: async () => await getProductData(),
	});
};

export const useProductSimilarQuery = (id: string) => {
	return useQuery({
		queryKey: ["product-similar"],
		queryFn: async () => await getProductSimilarData(id),
	});
};

export const usePolicyQuery = () => {
	return useQuery({
		queryKey: ["policy"],
		queryFn: async () => await getPolicyData(),
	});
};

export const useGetChatsQuery = (id: string) => {
	const getChatsData = async () => {
		const { headers } = Headers();
		const response = await axios.get(`/get-admin-chat/${id}`, { headers });
		return response.data;
	};
	return useQuery({
		queryKey: ["chats"],
		queryFn: async () => await getChatsData(),
	});
};
