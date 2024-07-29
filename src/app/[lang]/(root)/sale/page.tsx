import React from "react";

import PageHeader from "@/components/shared/page-header";
import ShopWrapper from "@/components/pages-components/shop/shop-wrapper";
import { Locale } from "@/config/i18n.config";

const Sale = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? "العروض" : "Chique Bouttique Sale's"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<div className="container flex items-center justify-start py-[50px] lg:py-[100px]">
				<ShopWrapper viewType="sale" />
			</div>
		</main>
	);
};

export default Sale;
