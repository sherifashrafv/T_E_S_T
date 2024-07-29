import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";
import RerurnDetails from "@/components/pages-components/my-orders/return-details";

const ReturnOrder = ({ params }: { params: { lang: Locale; slug: string } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? `رقم الطلب: ${params.slug}` : `Return No. ${params.slug}`}
				breads={[
					{ name: isRTL ? "طلباتي" : "My Orders", href: `/${params.lang}/my-orders` },
					{ name: isRTL ? `الطبيات المرتجعة` : `Return Orders`, href: `/${params.lang}/return-orders` },
				]}
			/>

			<ProfileLayout active="/return-orders">
				<RerurnDetails
					lang={params.lang}
					detailsId={params.slug as any}
					fromReturnDetails={true}
				/>
			</ProfileLayout>
		</main>
	);
};

export default ReturnOrder;
