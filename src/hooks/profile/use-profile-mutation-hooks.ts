import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { Headers } from "../global";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { sumErrors } from "@/utils";
import { useOrderTypeStore } from "@/store";

export const useAddAddressMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["addaddress"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/addresses", data, { headers });
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				isRTL
					? "تم اضافة العنوان الجديد بنجاح"
					: "Successfully add new address"
			);

			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useUpdateAddressMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["update-address"],
		mutationFn: async (data: any) => {
			const response = await axios.post(
				`/addresses/${data?.id}`,
				{ _method: "PUT", ...data },
				{ headers }
			);
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				isRTL ? "تم تعديل العنوان بنجاح" : "Successfully Update address"
			);

			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useDeleteAddressMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["addaddress"],
		mutationFn: async (data: any) => {
			const response = await axios.delete(`/addresses/${data?.id}`, {
				headers,
			});
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.info(isRTL ? "تم الحذف بنجاح" : "Deleted successfully");

			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useUpdateProfileMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	// Ensure Content-Type is only set once
	const mergedHeaders = {
		...headers,
		"Content-Type": headers["Content-Type"] || "multipart/form-data",
	};

	return useMutation({
		mutationKey: ["update-profile"],
		mutationFn: async (data: any) => {
			const response = await axios.post("/auth/profile", data, {
				headers: mergedHeaders,
			});
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				isRTL
					? "تم تحديث الملف الشخصي بنجاح"
					: "Successfully updated profile"
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useCancelOrderMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	// Ensure Content-Type is only set once
	const mergedHeaders = {
		...headers,
		"Content-Type": headers["Content-Type"] || "multipart/form-data",
	};

	return useMutation({
		mutationKey: ["cancel-order"],
		mutationFn: async (data: any) => {
			const response = await axios.post(
				`/order/${data?.id}/cancel`,
				data,
				{
					headers: mergedHeaders,
				}
			);
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.info(
				isRTL ? "تم الغاء الطلب بنجاح" : "Order canceled successfully"
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useConfirmOrderMutation = ({
	resetFunction,
}: {
	resetFunction: (response: any) => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["confirm-order"],
		mutationFn: async (data: any) => {
			const response = await axios.post(
				`/update_status/${data?.id}/order`,
				{},
				{ headers }
			);
			return response.data;
		},
		onSuccess: (response) => {
			resetFunction(response);
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useRateOrderMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["rate-order"],
		mutationFn: async (data: any) => {
			const response = await axios.post(
				`/order/${data?.id}/rate`,
				{},
				{ headers }
			);
			return response.data;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				isRTL ? "تم تقييم الطلب بنجاح" : "Thanks for your rating"
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useMakeReturnMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["make-return"],
		mutationFn: async (data: any) => {
			const response = await axios.post(`/make/returns`, data, {
				headers,
			});
			return response.data;
		},
		onSuccess: (response) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				response?.message ||
					(isRTL ? "تم ارجاع الطلب" : "Returned successfully")
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useReOrderMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["re-order"],
		mutationFn: async (id: any) => {
			const response = await axios.get(`/order/${id}/re-order`, {
				headers,
			});
			return response.data;
		},
		onSuccess: (response) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				response?.message ||
					(isRTL ? "تم اعادة طلب المنتج" : "Re-ordered successfully")
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useTransferPointMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["transfer-point"],
		mutationFn: async () => {
			const response = await axios.post(
				`/wallet/deposit/point`,
				{},
				{ headers }
			);
			return response.data;
		},
		onSuccess: (response) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				isRTL
					? "تم نقل نقاطك بنجاح"
					: "Successfully Transfer loyalty points"
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useChargeWalletMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();
	const { setClientSecret } = useOrderTypeStore();

	return useMutation({
		mutationKey: ["deposit-wallet"],
		mutationFn: async (data: any) => {
			const response = await axios.post(`/wallet/deposit`, data, {
				headers,
			});
			return response.data;
		},
		onSuccess: (response) => {
			setClientSecret(response?.data?.payment_url?.client_secret);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useUpdatePasswordMutation = ({
	resetFunction,
}: {
	resetFunction: () => void;
}) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["update-password"],
		mutationFn: async (data: any) => {
			const response = await axios.post(`/auth/update-password`, data, {
				headers,
			});
			return response.data;
		},
		onSuccess: (response) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(
				response?.message ||
					(isRTL
						? "تم تغيير كلمة المرور بنجاح"
						: "Password changed successfully")
			);
			resetFunction();
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors =
				typeMessage === "string"
					? [message]
					: sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};
