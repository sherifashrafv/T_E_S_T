import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import PointsWrapper from "@/components/pages-components/loyalty-points/points-wrapper";
import { getDictionary } from "@/config/dictionary";
import { Locale } from "@/config/i18n.config";

const LoyaltyPoints = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["L-points"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/loyalty-points">
				<PointsWrapper />
			</ProfileLayout>
		</main>
	);
};

export default LoyaltyPoints;
