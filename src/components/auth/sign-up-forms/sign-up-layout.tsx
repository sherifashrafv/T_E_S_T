"use client";

import React from "react";

import SignupForm from "./sign-up-form";
import Congratulations from "@/components/shared/congratulations";
import CodeForm from "@/components/shared/code-form";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const SignupLayout = ({ lang }: { lang: string }) => {
	const user = JSON.parse(getCookiesClientSide("user")! || "{}");
	const isRTL = lang === "ar";

	const [email, setEmail] = React.useState("");
	const [forms, setForms] = React.useState({
		signUp: user?.is_verified !== 0,
		codeForm: user?.is_verified === 0,
		congratulations: false,
	});

	const changeForm = (form: string) => {
		if (form === "signUp") {
			setForms({
				signUp: true,
				codeForm: false,
				congratulations: false,
			});
		} else if (form === "codeForm") {
			setForms({
				signUp: false,
				codeForm: true,
				congratulations: false,
			});
		} else if (form === "newPassForm") {
			setForms({
				signUp: false,
				codeForm: false,
				congratulations: true,
			});
		}
	};

	return (
		<div className="container flex items-center justify-center py-[50px] md:py-[100px]">
			{forms.signUp && (
				<SignupForm
					isRTL={isRTL}
					setEmail={setEmail}
					lang={lang}
					handleForms={changeForm}
				/>
			)}
			{forms.codeForm && (
				<CodeForm
					email={email}
					handleForms={changeForm}
					isRTL={isRTL}
					inRegister
				/>
			)}
			{forms.congratulations && (
				<Congratulations
					isRTL={isRTL}
					lang={lang}
					btnName={isRTL ? "الذهاب للصفحة الرئيسية" : "Go To Home Page"}
					href={`/${lang}`}
					inRegister
				/>
			)}
		</div>
	);
};

export default SignupLayout;
