"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useUpdatePasswordMutation } from "@/hooks/profile/use-profile-mutation-hooks";

const PasswordModal = ({ closeModal }: { closeModal: () => void }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const lang = getCookiesClientSide("NEXT_LOCALE");
	const { mutate, isPending } = useUpdatePasswordMutation({
		resetFunction: () => closeModal(),
	});

	const formSchema = z.object({
		newPassword: z.string().min(8, {
			message: isRTL ? "كلمة المرور يجب أن تكون أكثر من 8 حروف" : "Password must be at least 8 characters",
		}),
		confirmPassword: z
			.string()
			.min(8, {
				message: isRTL ? "كلمة المرور يجب أن تكون أكثر من 8 حروف" : "Password must be at least 8 characters",
			})
			.refine((data) => data === form.getValues("newPassword"), {
				message: isRTL ? "كلمة المرور غير مطابقة" : "Passwords do not match",
			}),
	}) as z.Schema<{
		newPassword: string;
		confirmPassword: string;
	}>;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	const [show, setShow] = React.useState(false);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({ password: data.newPassword } as any);
	};

	return (
		<div className="flex w-full max-w-[440px] flex-col items-center justify-center space-y-8">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-4">
					<FormFields
						control={form.control}
						name="newPassword"
						label={isRTL ? "كلمة المرور الجديدة" : "New Password"}
						holder={""}
						isPassword
						lang={lang}
						setShow={(value) => setShow(value)}
						show={show}
					/>
					<FormFields
						control={form.control}
						name="confirmPassword"
						label={isRTL ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
						holder={""}
						isPassword
						lang={lang}
						setShow={(value) => setShow(value)}
						show={show}
					/>

					<LoadingButton
						isLoading={isPending}
						variant="default"
						className="h-[50px] w-full">
						<span className="text-lg">{isRTL ? "تأكيد" : "Confirm"}</span>
					</LoadingButton>
				</form>
			</Form>
		</div>
	);
};

export default PasswordModal;
