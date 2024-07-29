import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import FavouritesWrapper from "@/components/pages-components/favourites/favourites-wrapper";
import { getDictionary } from "@/config/dictionary";
import { Locale } from "@/config/i18n.config";

const Favourites = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks["F-products"]}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/favourites">
				<FavouritesWrapper />
			</ProfileLayout>
		</main>
	);
};

export default Favourites;
