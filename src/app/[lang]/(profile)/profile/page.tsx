import React from "react";

import ProfileLayout from "@/components/layouts/profile/profile-layout";
import PageHeader from "@/components/shared/page-header";
import ProfileWrapper from "@/components/pages-components/profile/profile-wrapper";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

const Profile = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";
	const { ProfileLinks } = await getDictionary(params.lang);

	return (
		<main>
			<PageHeader
				pageName={ProfileLinks.settings}
				bread={isRTL ? "حسابي" : "My Account"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ProfileLayout active="/profile">
				<ProfileWrapper />
			</ProfileLayout>
		</main>
	);
};

export default Profile;
