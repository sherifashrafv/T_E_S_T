import React from "react";

import PageHeader from "@/components/shared/page-header";
import CartWrapper from "@/components/pages-components/cart/cart-wrapper";
import { Locale } from "@/config/i18n.config";
import CartProvider from "@/config/providers/CartProvider";

const Cart = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<CartProvider>
			<PageHeader
				pageName={isRTL ? "سلة الشراء" : "Shopping Cart"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>

			<CartWrapper lang={params.lang} />
		</CartProvider>
	);
};

export default Cart;
