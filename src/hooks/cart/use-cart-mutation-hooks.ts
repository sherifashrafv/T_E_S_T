import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { Headers } from "../global";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { sumErrors } from "@/utils";
import { useCitiesStore, useOrderSummaryStore } from "@/store";

export const useDeleteOrderMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["deleteorder"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/delet-from-cart", data, { headers });
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.info(isRTL ? "تم الحذف بنجاح" : "Successfully deleted");

			resetFunction();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useOrderWalletMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["deleteorder"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/delet-from-cart", data, { headers });
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.info(isRTL ? "تم الحذف بنجاح" : "Successfully deleted");

			resetFunction();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useGetOrderWalletMutation = ({ resetFunction }: { resetFunction: (response: any) => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["get-order-wallet"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/get-order-wallet", data, { headers });
			return response.data;
		},
		onSuccess: (response) => {
			resetFunction(response);
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useCheckoutMutation = ({ resetFunction }: { resetFunction: (response: any) => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["checkout"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/checkout", data, { headers });
			return response.data;
		},
		onSuccess: (response) => {
			resetFunction(response);
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useCheckCouponMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();
	const { setCouponCode, setCouponValue, setGrandTotal, grandTotal } = useOrderSummaryStore();

	return useMutation({
		mutationKey: ["check-coupon"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/coupon", data, { headers });
			return response.data;
		},
		onSuccess: (response) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(response.message || isRTL ? "تم التحقق بنجاح" : "Successfully checked");
			setCouponCode(response?.data?.coupon?.code);
			setCouponValue(response?.data?.total - response?.data?.total_after_coupon);

			setGrandTotal(grandTotal - (response?.data?.total - response?.data?.total_after_coupon));
			resetFunction();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useGetCountriesMutation = () => {
	const { headers } = Headers();
	const { setCities } = useCitiesStore();

	return useMutation({
		mutationKey: ["check-coupon"],
		mutationFn: async (countryId: any) => {
			const response = await axios.get(`/cities?country_id=${countryId}`, { headers });
			return response.data;
		},
		onSuccess: (response) => {
			setCities(response?.data);
		},
	});
};
