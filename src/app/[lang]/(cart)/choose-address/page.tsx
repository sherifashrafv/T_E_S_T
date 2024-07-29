import React from "react";

import PageHeader from "@/components/shared/page-header";
import AddressWrapper from "@/components/pages-components/choose-address/address-wrapper";
import { Locale } from "@/config/i18n.config";
import CartProvider from "@/config/providers/CartProvider";

const ChooseAddress = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<CartProvider>
			<PageHeader
				pageName={isRTL ? "اختيار عنوان التوصيل" : "Choose Delivery Address"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
				withoutBreadcrumb
				title={isRTL ? "اختيار عنوان التوصيل الذي تريد طلبك منه" : "Choose the address you want your order to be delivered to."}
			/>

			<AddressWrapper lang={params.lang} />
		</CartProvider>
	);
};

export default ChooseAddress;
