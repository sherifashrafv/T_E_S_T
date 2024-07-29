import React from "react";

import PageHeader from "@/components/shared/page-header";
import AboutusWrapper from "@/components/pages-components/about-us/about-us-wrapper";
import { Locale } from "@/config/i18n.config";
import { getAboutusData, getFooterData } from "@/actions/root-action";
import { AboutusProps, FooterProps } from "@/types";

const AboutPage = async ({ params }: { params: { lang: Locale } }) => {
	const aboutUs: AboutusProps = await getAboutusData();
	const { data }: { data: FooterProps } = await getFooterData();
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? "عن الشركة" : "About Us"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<AboutusWrapper
				feature={aboutUs?.section_2}
				mission={aboutUs?.section_3}
				ourStory={aboutUs?.section_1}
				appUrls={{ apple: data?.apple_store_link, google: data?.android_store_link }}
			/>
		</main>
	);
};

export default AboutPage;
