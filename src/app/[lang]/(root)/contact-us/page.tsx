import React from "react";

import ContactWrapper from "@/components/pages-components/contact-us/contact-wrapper";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

const ContactUs = async ({ params }: { params: { lang: Locale } }) => {
	const { Headers } = await getDictionary(params.lang);
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={Headers.contact}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>
			<div className="flex items-center justify-center px-4 py-[50px] md:container lg:py-[100px]">
				<ContactWrapper />
			</div>
		</main>
	);
};

export default ContactUs;
