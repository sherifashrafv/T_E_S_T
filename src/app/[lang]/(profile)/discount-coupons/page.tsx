import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import DiscountWrapper from "@/components/pages-components/discount-coupons/discount-wrapper";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

const DiscountCoupons = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["D-coupons"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/discount-coupons">
				<DiscountWrapper />
			</ProfileLayout>
		</main>
	);
};

export default DiscountCoupons;
