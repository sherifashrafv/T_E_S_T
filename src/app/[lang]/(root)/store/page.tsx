import React from "react";

import PageHeader from "@/components/shared/page-header";
import ShopWrapper from "@/components/pages-components/shop/shop-wrapper";
import { Locale } from "@/config/i18n.config";

const Shop = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? "المتجر" : "Chique Bouttique Store"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<div className="container flex items-center justify-start py-[50px] lg:py-[100px]">
				<ShopWrapper viewType="all" />
			</div>
		</main>
	);
};

export default Shop;
