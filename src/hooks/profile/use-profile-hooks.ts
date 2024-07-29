import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// import { Headers } from "../global";
import {
	getAddressData,
	getCouponsData,
	getFavouritesData,
	getNewOrdersData,
	getOldOrdersData,
	getOrderDetailsData,
	getOrderStatusData,
	getPointsData,
	getProfileData,
	getReturnOrderData,
	getReturnOrderDetailsData,
	getWalletData,
} from "@/actions/profile-actions";
import { Headers } from "../global";

export const useProfileQuery = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => await getProfileData(),
	});
};

export const useWalletQuery = () => {
	return useQuery({
		queryKey: ["wallet"],
		queryFn: async () => await getWalletData(),
	});
};

export const usePointsQuery = () => {
	return useQuery({
		queryKey: ["points"],
		queryFn: async () => await getPointsData(),
	});
};

export const useNewOrdersQuery = ({ page }: { page: number }) => {
	const { headers } = Headers();
	return useQuery({
		queryKey: ["new-orders"],
		queryFn: async () => await getNewOrdersData({ params: { page }, headers }),
	});
};

export const useOldOrdersQuery = ({ page }: { page: number }) => {
	const { headers } = Headers();
	return useQuery({
		queryKey: ["old-orders"],
		queryFn: async () => await getOldOrdersData({ params: { page }, headers }),
	});
};

export const useOrderDetailsQuery = ({ id, inReturn }: { id: number; inReturn: boolean }) => {
	const { headers } = Headers();
	return useQuery({
		queryKey: ["order-details"],
		queryFn: async () =>
			inReturn ? await getReturnOrderDetailsData({ params: { id }, headers }) : await getOrderDetailsData({ params: { id }, headers }),
		enabled: !!id,
	});
};

export const useReturnOrderQuery = ({ page }: { page: number }) => {
	const { headers } = Headers();
	return useQuery({
		queryKey: ["return-orders"],
		queryFn: async () => await getReturnOrderData({ params: { page }, headers }),
	});
};

export const useFavouritesQuery = () => {
	return useQuery({
		queryKey: ["favourites"],
		queryFn: async () => await getFavouritesData(),
	});
};

export const useCouponsQuery = () => {
	return useQuery({
		queryKey: ["coupons"],
		queryFn: async () => await getCouponsData(),
	});
};

export const useShowAddressQuery = ({ id }: { id: string }) => {
	return useQuery({
		queryKey: ["show-address"],
		queryFn: async () => await getAddressData({ id }),
		enabled: !!id,
	});
};

export const useOrderStatusQuery = () => {
	const { headers } = Headers();
	return useQuery({
		queryKey: ["show-address"],
		queryFn: async () => await getOrderStatusData({ headers }),
	});
};
