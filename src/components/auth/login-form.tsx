"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";

import { loginFormSchema } from "@/schemas/auth-schema";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { icons } from "@/constants";
import {
	useGoogleMutation,
	useLoginMutation,
} from "@/hooks/auth/use-auth-mutations-hooks";
import LoadingButton from "../common/buttons/loading-button";
import { googleProvider } from "@/config/authPlatforms";

const LoginForm = ({ lang }: { lang: string }) => {
	const router = useRouter();

	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const { mutate, isPending } = useLoginMutation({
		redirect: () => router.replace("/"),
	});
	const { mutate: mutateGoogle, isPending: isGooglePending } =
		useGoogleMutation({
			redirect: () => router.push("/"),
		});

	const formSchema = loginFormSchema(isRTL);

	const [show, setShow] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({ ...data, token: "test", type: "web" } as any);
	};

	return (
		<div className="container flex items-center justify-center py-[50px] md:py-[100px]">
			<div className="flex w-[440px] flex-col gap-3 md:gap-6">
				<LoadingButton
					isLoading={isGooglePending}
					onClick={() => googleProvider(mutateGoogle)}
					variant="outline"
					className="flex h-[44px] w-full items-center justify-center gap-4 rounded-md border border-border"
				>
					<Image
						src={icons.googleLogo}
						alt="google"
						width={16}
						height={16}
						loading="lazy"
					/>
					<h2>
						{isRTL
							? "تسجيل الدخول بواسطة جوجل"
							: "Continue with Google"}
					</h2>
				</LoadingButton>

				<div className="relative flex items-center justify-center py-2">
					<hr className="w-full border-border" />
					<p className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white px-2 text-center text-[16px] font-[400] leading-6 text-primary">
						{isRTL ? "او" : "or"}
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 md:space-y-6"
					>
						<FormFields
							control={form.control}
							name="email"
							label={isRTL ? "البريد الالكتروني" : "Email"}
							holder={
								isRTL
									? "مثال: 9Q0p5@example.com"
									: "e.g. 9Q0p5@example.com"
							}
						/>
						<div className="flex flex-col gap-2">
							<FormFields
								control={form.control}
								name="password"
								label={isRTL ? "كلمة المرور" : "Password"}
								holder={
									isRTL
										? "مثال: *********"
										: "e.g. **********"
								}
								isPassword
								lang={lang}
								setShow={(value) => setShow(value)}
								show={show}
							/>
							<Link
								href={`/${lang}/forgot-password`}
								className="text-sm font-[400] underline"
							>
								{isRTL
									? "نسيت كلمة المرور؟"
									: "Forgot Password?"}
							</Link>
						</div>
						<LoadingButton
							isLoading={isPending}
							variant="default"
							className="h-[50px] w-full"
						>
							<span className="text-lg">
								{isRTL ? "تسجيل الدخول" : "Login"}
							</span>
						</LoadingButton>
					</form>
				</Form>

				<h3 className="text-center text-sm font-[400] text-[#464547]">
					{isRTL ? "ليس لديك حساب؟" : "Don’t Have an account?"}{" "}
					<Link
						href={`/${lang}/sign-up`}
						className="font-[700] text-primary"
					>
						{isRTL ? "انشاء حساب جديد" : "Create New Account"}
					</Link>{" "}
				</h3>
			</div>
		</div>
	);
};

export default LoginForm;
