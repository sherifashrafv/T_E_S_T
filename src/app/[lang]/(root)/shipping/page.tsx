import React from "react";

import SectionHeader from "@/components/shared/section-header";
import { getPolicyData } from "@/actions/root-action";
import { Locale } from "@/config/i18n.config";

const Shipping = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const isRTL = lang === "ar";
	const response = await getPolicyData();

	return (
		<div className="container flex min-h-screen flex-col items-center justify-center gap-5 pb-[40px] pt-[150px]">
			<SectionHeader header={isRTL ? "سياسة الشحن" : "Shipping Policy"} />
			<pre
				className="w-full max-w-[500px] whitespace-pre-wrap text-center font-[500] text-primary"
				dangerouslySetInnerHTML={{ __html: response?.data?.shipping_Policy || "" }}></pre>
		</div>
	);
};

export default Shipping;
