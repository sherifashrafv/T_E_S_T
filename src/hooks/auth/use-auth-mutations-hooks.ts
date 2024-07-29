"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { Headers } from "../global";
import { sumErrors } from "@/utils";
import { setCookiesClientSide, getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { RegisterResponse } from "@/types";

export const useRegisterMutation = ({ setEmail, handleForms }: { setEmail: () => void; handleForms: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/register", data, { headers });

			return response;
		},

		onSuccess: ({ data: { data } }: { data: { data: RegisterResponse } }) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			const token = () => setCookiesClientSide("token", data.token);
			const device = () => setCookiesClientSide("device_id", data.device_id);
			// const user = () => setCookiesClientSide("user", JSON.stringify(data.user));

			toast.success(isRTL ? "تم ارسال رمز التحقق الخاص بك" : "Verification code has been sent");

			token();
			device();
			// user();
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

export const useVerifyMutation = ({ handleForms }: { handleForms: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["verify"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/verify", data, { headers });

			return response;
		},

		onSuccess: ({ data: { data } }: { data: { data: RegisterResponse } }) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			const user = () => setCookiesClientSide("user", JSON.stringify(data.user));

			toast.success(isRTL ? "تم التحقق بنجاح" : "Successfully verified");

			user();
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

export const useLoginMutation = ({ redirect }: { redirect: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/login", data, { headers });

			return response;
		},

		onSuccess: ({ data: { data } }: { data: { data: RegisterResponse } }) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			const token = () => setCookiesClientSide("token", data.token);
			const device = () => setCookiesClientSide("device_id", data.device_id);
			const user = () => setCookiesClientSide("user", JSON.stringify(data.user));

			toast.success(isRTL ? "تم تسجيل الدخول بنجاح" : "Successfully Logged In");

			token();
			device();
			user();
			redirect();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useLogoutMutation = ({ redirect }: { redirect: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/logout", data, { headers });

			return response;
		},

		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(isRTL ? "تم تسجيل الخروج بنجاح" : "Successfully Logged Out");
			redirect();
		},

		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useGoogleMutation = ({ redirect }: { redirect: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["google"],
		mutationFn: async (params) => {
			const response = await axios.get("/auth/callback/google", { headers, params });

			return response;
		},
		onSuccess: ({ data: { data } }: { data: { data: RegisterResponse } }) => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			const token = () => setCookiesClientSide("token", data.token);
			const device = () => setCookiesClientSide("device_id", data.device_id);
			const user = () => setCookiesClientSide("user", JSON.stringify(data.user));

			toast.success(isRTL ? "تم تسجيل الدخول بواسطة جوجل" : "Successfully Logged In via Google");

			token();
			device();
			user();
			redirect();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useResendCodeMutation = ({ handleFunction }: { handleFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["resendCode"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/resend", data, { headers });

			return response;
		},
		onSuccess: () => {
			const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
			toast.success(isRTL ? "تم ارسال رمز التحقق الجديد" : "Verification code has been sent");

			handleFunction();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};

export const useActiveMutation = ({ handleFunction }: { handleFunction: () => void }) => {
	const { headers } = Headers();

	return useMutation({
		mutationKey: ["active"],
		mutationFn: async (data) => {
			const response = await axios.post("/auth/activate", data, { headers });

			return response;
		},
		onSuccess: (response) => {
			toast.success(response?.data?.message);

			handleFunction();
		},
		onError: (error: any) => {
			const message = error?.response?.data?.errors || error?.response?.data?.message;
			const typeMessage = typeof message;

			const errors = typeMessage === "string" ? [message] : sumErrors(message as any);
			errors.forEach((error) => toast.error(error));
		},
	});
};
