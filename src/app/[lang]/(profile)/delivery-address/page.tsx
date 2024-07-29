import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import DeliveryWrapper from "@/components/pages-components/delivary-address/delivary-wrapper";
import { getDictionary } from "@/config/dictionary";
import { Locale } from "@/config/i18n.config";

const DeliveryAddress = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["D-addresses"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/delivery-address">
				<DeliveryWrapper />
			</ProfileLayout>
		</main>
	);
};

export default DeliveryAddress;
