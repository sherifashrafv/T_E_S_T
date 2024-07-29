import React from "react";

import QrWrapper from "@/components/pages-components/qr/qr-wrapper";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";

const QR = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={"Chique Bouttique QR"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>
			<div className="py-[50px] md:py-[100px]">
				<QrWrapper />
			</div>
		</main>
	);
};

export default QR;
