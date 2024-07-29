import LoginForm from "@/components/auth/login-form";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";

const SignIn = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<>
			<PageHeader
				pageName={isRTL ? "تسجيل الدخول" : "Login"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<LoginForm lang={params.lang} />
		</>
	);
};

export default SignIn;
