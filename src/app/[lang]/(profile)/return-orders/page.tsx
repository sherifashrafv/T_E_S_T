import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import ReturnOrdersWrapper from "@/components/pages-components/return-orders/orders-wrapper";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

const MyOrders = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["R-orders"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/return-orders">
				<ReturnOrdersWrapper />
			</ProfileLayout>
		</main>
	);
};

export default MyOrders;
