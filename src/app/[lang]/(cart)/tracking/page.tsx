import React from "react";

import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";
import TrackingWrapper from "@/components/pages-components/tracking/tracking-wrapper";

const Tracking = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<>
			<PageHeader
				pageName={isRTL ? "شكرا لتسويقك معنا" : "Thank you for shopping with us"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
				withoutBreadcrumb
				title={
					isRTL
						? "تم تقديم طلبك بنجاح وتتم مراجعته مؤقتا من قبل المدير"
						: "Your order has been successfully placed and is now under review."
				}
			/>

			<div className="container flex items-center justify-center py-[50px] lg:py-[100px]">
				<TrackingWrapper lang={params.lang} />
			</div>
		</>
	);
};

export default Tracking;
