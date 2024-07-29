import { z } from "zod";

export const ProfileFormSchema = (isRTL: boolean) => {
	return z.object({
		name: z.optional(z.string().min(1, isRTL ? "الاسم مطلوب" : "Name is required")),
		email: z.optional(z.string().email(isRTL ? "البريد الالكتروني غير صالح" : "Email is not valid")),
		phone: z.optional(z.string().min(1, isRTL ? "رقم الهاتف مطلوب" : "Phone number is required")),
		phonecode: z.optional(z.string().min(1, isRTL ? "رقم الهاتف مطلوب" : "Phone number is required")),
		gender: z.string().min(1, isRTL ? "الجنس مطلوب" : "Gender is required"),
	});
};
