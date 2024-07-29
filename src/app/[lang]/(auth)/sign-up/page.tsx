import SignupLayout from "@/components/auth/sign-up-forms/sign-up-layout";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";

const Signup = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<>
			<PageHeader
				pageName={isRTL ? "انشاء حساب جديد" : "Create New Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<SignupLayout lang={params.lang} />
		</>
	);
};

export default Signup;
