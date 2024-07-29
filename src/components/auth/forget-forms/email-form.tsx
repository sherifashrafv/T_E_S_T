"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useForgetPasswordMutation } from "@/hooks/auth/use-forget-password-steps-hooks";

type Props = {
	isRTL: boolean;
	handleForms: (form: string) => void;
	setEmail: (email: string) => void;
};

const EmailForm = ({ isRTL, handleForms, setEmail }: Props) => {
	const { mutate, isPending } = useForgetPasswordMutation({
		setEmail: () => setEmail(form.getValues("email")),
		handleForms: () => handleForms("codeForm"),
	});

	const formSchema = z.object({
		email: z
			.string()
			.min(1, { message: isRTL ? "البريد الإلكتروني مطلوب" : "Email is required" })
			.email({ message: isRTL ? "البريد الإلكتروني غير صالح" : "Invalid email" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate(data as any);
	};

	return (
		<div className="flex w-full max-w-[440px] flex-col items-center justify-center space-y-8">
			<p className="w-full max-w-[440px] text-sm font-[400] leading-[30px] text-muted-foreground">
				{isRTL
					? "الرجاء إدخال عنوان البريد الإلكتروني المرتبط بحسابك. سنرسل لك بريدًا إلكترونيًا مع كود لإعادة تعيين كلمة المرور علي الفور"
					: "Kindly enter the email address linked to your account. We'll immediately send you an email with a code to reset your password"}
			</p>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6">
					<FormFields
						control={form.control}
						name="email"
						label={isRTL ? "البريد الالكتروني" : "Email"}
						holder={isRTL ? "مثال: 9Q0p5@example.com" : "e.g. 9Q0p5@example.com"}
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

export default EmailForm;
