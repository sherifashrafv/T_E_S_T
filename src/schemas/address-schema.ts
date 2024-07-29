import * as z from "zod";

export const addressFormSchema = (isRTL: boolean) => {
	return z.object({
		kind: z.string().min(1, isRTL ? "نوع العنوان مطلوب" : "Address type is required"),
		country_id: z.string().min(1, isRTL ? "من فضلك قم باختيار اسم الدولة" : "Please select a country"),
		city_id: z.string().min(1, isRTL ? "من فضلك قم باختيار المدينة" : "Please select a city"),
		postal: z.string().min(1, isRTL ? "الرمز البريدي مطلوب" : "Postal code is required"),
		address: z.optional(z.string().min(1, isRTL ? "الوصف مطلوب" : "Description is required")),
	});
};
