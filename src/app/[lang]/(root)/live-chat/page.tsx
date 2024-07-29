import React from "react";

import { Locale } from "@/config/i18n.config";
import PageHeader from "@/components/shared/page-header";
import ChatWrapper from "@/components/pages-components/live-chat/chat-wrapper";

const LiveChat = async ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={`${isRTL ? "الدعم" : "Live Chat"}`}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/` }]}
			/>

			<ChatWrapper />
		</main>
	);
};

export default LiveChat;
