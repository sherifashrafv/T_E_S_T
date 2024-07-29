"use client";

import React from "react";
import EmailForm from "./email-form";
import CodeForm from "../../shared/code-form";
import NewPasswordForm from "./new-password-form";
import Congratulations from "@/components/shared/congratulations";

const ForgetLayout = ({ lang }: { lang: string }) => {
	const isRTL = lang === "ar";

	const [email, setEmail] = React.useState("");
	const [code, setCode] = React.useState("");
	const [forms, setForms] = React.useState({
		emailForm: true,
		codeForm: false,
		newPassForm: false,
		congratulations: false,
	});

	const changeForm = (form: string) => {
		if (form === "emailForm") {
			setForms({
				emailForm: true,
				codeForm: false,
				newPassForm: false,
				congratulations: false,
			});
		} else if (form === "codeForm") {
			setForms({
				emailForm: false,
				codeForm: true,
				newPassForm: false,
				congratulations: false,
			});
		} else if (form === "newPassForm") {
			setForms({
				emailForm: false,
				codeForm: false,
				newPassForm: true,
				congratulations: false,
			});
		} else if (form === "congratulations") {
			setForms({
				emailForm: false,
				codeForm: false,
				newPassForm: false,
				congratulations: true,
			});
		}
	};

	return (
		<div className="container flex items-center justify-center py-[50px] md:py-[100px]">
			{forms.emailForm && (
				<EmailForm
					isRTL={isRTL}
					handleForms={changeForm}
					setEmail={setEmail}
				/>
			)}
			{forms.codeForm && (
				<CodeForm
					email={email}
					handleForms={changeForm}
					isRTL={isRTL}
					setCode={setCode}
				/>
			)}
			{forms.newPassForm && (
				<NewPasswordForm
					handleForms={changeForm}
					isRTL={isRTL}
					lang={lang}
					email={email}
					code={code}
				/>
			)}
			{forms.congratulations && (
				<Congratulations
					isRTL={isRTL}
					lang={lang}
					btnName={isRTL ? "الذهاب لتسجيل الدخول" : "Go To Login"}
					href={`/${lang}/sign-in`}
				/>
			)}
		</div>
	);
};

export default ForgetLayout;
