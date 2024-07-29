"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/common/buttons/loading-button";
import { ProfileFormSchema } from "@/schemas/profile-schema";
import { getCookiesClientSide, deleteCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import PhoneInputComponent from "../../common/froms/phone-input";
import Select from "@/components/common/froms/select";
import { ProfileProps } from "@/types";
import { useUpdateProfileMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import { useActiveMutation } from "@/hooks/auth/use-auth-mutations-hooks";
import { Modal } from "@/components/common/modals/modal";
import PasswordModal from "./password-modal";

const ContactForm = ({ newAvatar, user, refetch }: { newAvatar: File | {}; user: ProfileProps; refetch: Function }) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const devideId = getCookiesClientSide("device_id");
	const formSchema = ProfileFormSchema(isRTL);

	const [openPassword, setOpenPassword] = useState(false);

	const { mutate, isPending } = useUpdateProfileMutation({
		resetFunction: () => {
			refetch();
		},
	});
	const { mutate: active, isPending: activePending } = useActiveMutation({
		handleFunction: () => {
			deleteCookiesClientSide("device_id");
			deleteCookiesClientSide("token");
			deleteCookiesClientSide("user");
			router.push("/sign-up");
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			phone: user?.full_phone || "",
			phonecode: user?.phonecode || "",
			gender: user?.gender || "",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({ ...data, avatar: newAvatar, _method: "PUT" } as any);
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
									<FormLabel>{isRTL ? "رقم الهاتف" : "Phone number"}</FormLabel>
									<FormControl>
										<PhoneInputComponent
											className={`${isRTL ? "phone_contact_ar" : "phone_contact"} phone`}
											country={user?.phonecode || "us"}
											onChange={(value: any, country: any) => {
												field.onChange(value?.replace(`${country.dialCode}`, ""));
												form.setValue("phonecode", country.countryCode);
											}}
											value={field.value}
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
					</div>

					<div className="flex w-full py-5">
						<LoadingButton
							type="button"
							isLoading={activePending}
							onClick={() => active({ device_id: devideId } as any)}
							className="flex-1 bg-red-500 text-white hover:bg-red-400 hover:text-white md:max-w-[244px]">
							{isRTL ? "تعطيل الحساب" : "Deactivate Account"}
						</LoadingButton>
					</div>

					<div className="flex w-full flex-wrap items-center justify-start gap-5">
						<LoadingButton
							type="submit"
							isLoading={isPending}
							className="flex-1 md:max-w-[244px]">
							{isRTL ? "حفظ التغييرات" : "Save Changes"}
						</LoadingButton>
						<Button
							type="button"
							onClick={() => setOpenPassword(true)}
							variant="outline"
							className="flex-1 md:max-w-[244px]">
							{isRTL ? "تغيير كلمة المرور" : "Change Password"}
						</Button>
					</div>
				</form>
			</Form>

			<Modal
				isOpen={openPassword}
				setIsOpen={setOpenPassword}
				title={isRTL ? "تغيير كلمة المرور" : "Change Password"}>
				<PasswordModal closeModal={() => setOpenPassword(false)} />
			</Modal>
		</div>
	);
};

export default ContactForm;
