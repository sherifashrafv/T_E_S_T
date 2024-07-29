import { useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { Headers } from "../global";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { sumErrors } from "@/utils";

export const useContactUsMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["contacts"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/contacts", data, { headers });
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

			toast.success(isRTL ? "تم الارسال بنجاح" : "Successfully sent message");

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

export const useFavouriteMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();
	const queryClient = new QueryClient();

	return useMutation({
		mutationKey: ["favourite"],
		mutationFn: async (data: any) => {
			const response = await axios.post(`/favourite/${data?.product_id}`, {}, { headers });
			return response.data;
		},
		onSuccess: (response) => {
			toast.success(response?.data);

			queryClient.invalidateQueries({ queryKey: ["products", "home"] });
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

export const useAddToCartMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();
	const queryClient = new QueryClient();

	return useMutation({
		mutationKey: ["addtocart"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/add-to-cart", data, { headers });
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(isRTL ? "تم الاضافة للسلة بنجاح" : "Successfully added to cart");

			queryClient.invalidateQueries({ queryKey: ["product", "cart"] });

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

export const useLiveSendChatMutation = ({ resetFunction }: { resetFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["live-send-chat"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/admin-chat/send", data, { headers: { ...headers, "Content-Type": "multipart/form-data" } });
			return response.data;
		},
		onSuccess: () => {
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
