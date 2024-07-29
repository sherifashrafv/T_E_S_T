import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";
import RerurnDetails from "@/components/pages-components/my-orders/return-details";

const ReturnOrder = ({ params }: { params: { lang: Locale; id: string } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? "ارجاع الطلب" : "Return Order"}
				breads={[
					{ name: isRTL ? "طلباتي" : "My Orders", href: `/${params.lang}/my-orders` },
					{ name: isRTL ? `رقم الطلب: ${params.id}` : `Order No. ${params.id}`, href: `/${params.lang}/my-orders/${params.id}` },
				]}
			/>

			<ProfileLayout active="/my-orders">
				<RerurnDetails
					lang={params.lang}
					detailsId={params.id as any}
					fromReturnDetails={false}
				/>
			</ProfileLayout>
		</main>
	);
};

export default ReturnOrder;
