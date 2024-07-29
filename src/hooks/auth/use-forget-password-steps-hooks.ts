"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { Headers } from "../global";
import { sumErrors } from "@/utils";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

export const useForgetPasswordMutation = ({ setEmail, handleForms }: { setEmail: () => void; handleForms: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["forget-password"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/forget", data, { headers });

			return response;
		},

		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

			toast.success(isRTL ? "تم ارسال رمز التحقق الخاص بك" : "Verification code has been sent");

			setEmail();
			handleForms();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useForgetCodeMutation = ({ handleForms }: { handleForms: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["code-check"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/forget/check", data, { headers });

			return response;
		},

		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

			toast.success(isRTL ? "تم التحقق بنجاح" : "Successfully verified");

			handleForms();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useResetPasswordMutation = ({ handleForms }: { handleForms: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["reset-password"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/forget/reset", data, { headers });

			return response;
		},

		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

			toast.success(isRTL ? "تم تغيير كلمة المرور بنجاح" : "Successfully Reset Password");

			handleForms();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};
