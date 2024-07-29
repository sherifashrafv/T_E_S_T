"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import { contactUsFormSchema } from "@/schemas/contact-us-schema";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import PhoneInputComponent from "../../common/froms/phone-input";
import { useContactUsMutation } from "@/hooks/root/use-root-mutation";
import LoadingButton from "@/components/common/buttons/loading-button";

const ContactForm = () => {
	const { mutate, isPending } = useContactUsMutation({
		resetFunction: () => {
			form.reset();
		},
	});
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const formSchema = contactUsFormSchema(isRTL);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-[14px]">
				<FormFields
					control={form.control}
					name="name"
					label={isRTL ? "الاسم" : "Name"}
					holder={isRTL ? "مثال: جون دو" : "e.g. John Doe"}
				/>
				<FormFields
					control={form.control}
					name="email"
					label={isRTL ? "البريد الالكتروني" : "Email"}
					holder={isRTL ? "مثال: example@gmail" : "e.g. example@gmail.com"}
				/>
				<FormField
					control={form.control}
					name={"phone"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{isRTL ? "رقم الهاتف" : "Phone"}</FormLabel>
							<FormControl>
								<PhoneInputComponent
									className={`${isRTL ? "phone_contact_ar" : "phone_contact"} phone`}
									onChange={(value: any, country: any, e: any) => {
										field.onChange(value?.replace(`${country.dialCode}`, ""));
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormFields
					control={form.control}
					name="message"
					label={isRTL ? "الرسالة" : "Message"}
					holder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here ..."}
					textarea
				/>

				<LoadingButton
					isLoading={isPending}
					className="w-full md:max-w-[265px]">
					{isRTL ? "ارسال الرسالة" : "Send Your Message"}
				</LoadingButton>
			</form>
		</Form>
	);
};

export default ContactForm;
