import { z } from "zod";

export const contactUsFormSchema = (isRTL: boolean) => {
	return z.object({
		name: z.optional(z.string().min(1, isRTL ? "الاسم مطلوب" : "Name is required")),
		email: z.optional(z.string().email(isRTL ? "البريد الالكتروني غير صالح" : "Email is not valid")),
		phone: z.optional(z.string().min(1, isRTL ? "رقم الهاتف مطلوب" : "Phone number is required")),
		message: z.optional(z.string().min(1, isRTL ? "الرسالة مطلوبة" : "Message is required")),
	});
};
