"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import { registerFormSchema } from "@/schemas/auth-schema";
import PhoneInputComponent from "@/components/common/froms/phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "@/components/common/froms/select";
import { useRegisterMutation } from "@/hooks/auth/use-auth-mutations-hooks";
import { toast } from "sonner";

type Props = {
  isRTL: boolean;
  lang: string;
  handleForms: (form: string) => void;
  setEmail: (email: string) => void;
};

const SignupForm = ({ isRTL, handleForms, lang, setEmail }: Props) => {
  const router = useRouter();

  const formSchema = registerFormSchema(isRTL);
  const { mutate, isPending } = useRegisterMutation({
    setEmail: () => setEmail(form.getValues("email")),
    handleForms: () => {
      handleForms("codeForm");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      phonecode: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [show, setShow] = React.useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.password !== data.confirmPassword) {
      toast.error(isRTL ? "كلمة المرور غير مطابقة" : "Passwords do not match");
      return;
    }
    mutate({ ...data, token: "test", type: "web" } as any);
  };

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center justify-center gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="space-y-4">
            <FormFields
              control={form.control}
              name="name"
              label={isRTL ? "الاسم" : "Name"}
              holder={isRTL ? "مثال: جون دو" : "e.g. John Doe"}
            />
            <FormFields
              control={form.control}
              name="email"
              label={isRTL ? "البريد الالكتروني" : "Email Address"}
              holder={
                isRTL ? "مثال: 9Q0p5@example.com" : "e.g. 9Q0p5@example.com"
              }
            />
            <FormField
              control={form.control}
              name={"phone"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isRTL ? "رقم الهاتف" : "Phone Number"}</FormLabel>
                  <FormControl>
                    <PhoneInputComponent
                      className={`${isRTL ? "phone_contact_ar" : "phone_contact"} phone`}
                      onChange={(value: any, country: any) => {
                        field.onChange(
                          value?.replace(`${country.dialCode}`, "")
                        );
                        form.setValue("phonecode", country.countryCode);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Select
              control={form.control}
              name="gender"
              label={isRTL ? "الجنس" : "Gender"}
              holder={""}
              options={[
                { label: isRTL ? "ذكر" : "Male", value: "Male" },
                { label: isRTL ? "أنثى" : "Female", value: "Female" },
              ]}
            />
            <FormFields
              control={form.control}
              name="password"
              label={isRTL ? "كلمة المرور" : "Password"}
              holder={""}
              isPassword
              lang={lang}
              setShow={(value) => setShow(value)}
              show={show}
            />
            <FormFields
              control={form.control}
              name="confirmPassword"
              label={isRTL ? "تأكيد كلمة المرور" : "Confirm Password"}
              holder={""}
              isPassword
              lang={lang}
              setShow={(value) => setShow(value)}
              show={show}
            />
            <div className="flex items-center gap-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isRTL ? "اوافق علي" : "Accept"}{" "}
                <Link
                  href={`/${lang}/terms`}
                  target="_blank"
                  className="font-[700] text-primary"
                >
                  {isRTL ? "الشروط والاحكام" : "Terms & Conditions"}
                </Link>
              </label>
            </div>
          </div>

          <LoadingButton isLoading={isPending} className="h-[50px] w-full">
            {isRTL ? "انشاء حساب" : "Create New Account"}
          </LoadingButton>
        </form>
      </Form>

      <h3 className="text-center text-sm font-[400] text-[#464547]">
        {isRTL ? "بالفعل لديك حساب؟" : "Already have an account?"}{" "}
        <Link href={`/${lang}/sign-in`} className="font-[700] text-primary">
          {isRTL ? "تسجيل الدخول" : "Login"}
        </Link>{" "}
      </h3>
    </div>
  );
};

export default SignupForm;
