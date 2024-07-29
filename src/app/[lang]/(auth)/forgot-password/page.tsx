import ForgetLayout from "@/components/auth/forget-forms/foget-layout";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";

const ForgetPassword = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<>
			<PageHeader
				pageName={isRTL ? "نسيت كلمة المرور" : "Forgot Your Password"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<ForgetLayout lang={params.lang} />
		</>
	);
};

export default ForgetPassword;
