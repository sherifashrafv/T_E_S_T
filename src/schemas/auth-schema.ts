import { z } from "zod";

export const loginFormSchema = (isRTL: boolean) => {
  return z.object({
    email: z
      .string()
      .email(isRTL ? "البريد الالكتروني غير صالح" : "Email is not valid"),
    password: z
      .string()
      .min(1, isRTL ? "كلمة المرور مطلوبة" : "Password is required"),
  });
};

export const registerFormSchema = (isRTL: boolean) => {
  return z.object({
    name: z.string().min(1, isRTL ? "الاسم مطلوب" : "Name is required"),
    email: z
      .string()
      .email(isRTL ? "البريد الالكتروني غير صالح" : "Email is not valid"),
    phone: z
      .string()
      .min(1, isRTL ? "رقم الهاتف مطلوب" : "Phone number is required"),
    phonecode: z.optional(
      z.string().min(1, isRTL ? "رمز الهاتف مطلوب" : "Phone code is required")
    ),
    gender: z.string().min(1, isRTL ? "الجنس مطلوب" : "Gender is required"),
    password: z
      .string()
      .min(1, isRTL ? "كلمة المرور مطلوبة" : "Password is required"),
    confirmPassword: z
      .string()
      .min(
        1,
        isRTL ? "تاكيد كلمة المرور مطلوبة" : "Confirm password is required"
      ),
  });
};
