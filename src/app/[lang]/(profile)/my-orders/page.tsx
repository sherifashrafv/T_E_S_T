import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import OrdersWrapper from "@/components/pages-components/my-orders/orders-wrapper";
import { getDictionary } from "@/config/dictionary";
import { Locale } from "@/config/i18n.config";

const MyOrders = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks.orders}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/my-orders">
				<OrdersWrapper />
			</ProfileLayout>
		</main>
	);
};

export default MyOrders;
