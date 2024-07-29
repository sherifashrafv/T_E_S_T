"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useResetPasswordMutation } from "@/hooks/auth/use-forget-password-steps-hooks";

type Props = {
	isRTL: boolean;
	lang: string;
	handleForms: (form: string) => void;
	code?: string;
	email?: string;
};

const NewPasswordForm = ({ isRTL, lang, handleForms, code, email }: Props) => {
	const { mutate, isPending } = useResetPasswordMutation({
		handleForms: () => {
			handleForms("congratulations");
		},
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
		mutate({ password: data.newPassword, code, email } as any);
	};

	return (
		<div className="flex w-full max-w-[440px] flex-col items-center justify-center space-y-8">
			<p className="w-full max-w-[440px] text-sm font-[400] leading-[30px] text-muted-foreground">
				{isRTL
					? "الرجاء ادخال كلمة مرور جديدة وتأكيدها لاعادة تعيين كلمة المرور عند الفوز"
					: "Please enter a new password and confirm it to complete the password reset process."}
			</p>

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

export default NewPasswordForm;
