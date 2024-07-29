import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import WalletWrapper from "@/components/pages-components/my-wallet/wallet-wrapper";
import { getDictionary } from "@/config/dictionary";
import { Locale } from "@/config/i18n.config";

const MyWallet = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["M-wallet"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/my-wallet">
				<WalletWrapper />
			</ProfileLayout>
		</main>
	);
};

export default MyWallet;
