import React from "react";

import PageHeader from "@/components/shared/page-header";
import PaymentWrapper from "@/components/pages-components/payment/payment-wrapper";
import { Locale } from "@/config/i18n.config";

const Payment = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<>
			<PageHeader
				pageName={isRTL ? "الدفع" : "Payment"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
				withoutBreadcrumb
				title={isRTL ? "اكمل عملية الدفع لتأكيد طلبك." : "Complete the payment process to confirm your order."}
			/>

			<PaymentWrapper lang={params.lang} />
		</>
	);
};

export default Payment;
