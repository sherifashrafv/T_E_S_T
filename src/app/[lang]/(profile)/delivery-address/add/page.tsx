import React from "react";

import NewAddresses from "@/components/pages-components/delivary-address/new-addresses";
import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

const NewAddress = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks.add}
				bread={ProfileLinks.add}
				breads={[
					{ name: isRTL ? "حسابي" : "My Account", href: `/${params.lang}/profile` },
					{ name: ProfileLinks["D-addresses"], href: `/${params.lang}/profile/delivery-address` },
				]}
			/>

			<ProfileLayout active="/delivery-address">
				<NewAddresses />
			</ProfileLayout>
		</main>
	);
};

export default NewAddress;
