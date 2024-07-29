import React from "react";

import Details from "@/components/pages-components/my-orders/order-details";
import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";

const OrderDetails = ({ params }: { params: { lang: string; slug: string } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? `رقم الطلب: ${params.slug}` : `Order No. ${params.slug}`}
				breads={[{ name: isRTL ? "طلباتي" : "My Orders", href: `/${params.lang}/my-orders` }]}
			/>

			<ProfileLayout active="/my-orders">
				<Details lang={params.lang} />{" "}
			</ProfileLayout>
		</main>
	);
};

export default OrderDetails;
