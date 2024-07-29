import React from "react";

import PageHeader from "@/components/shared/page-header";
import Blog from "@/components/pages-components/blogs/blog";
import { Locale } from "@/config/i18n.config";

const Blogs = ({ params }: { params: { lang: Locale } }) => {
	const isRTL = params.lang === "ar";

	return (
		<main>
			<PageHeader
				pageName={isRTL ? "المدونة" : "Blog"}
				breads={[{ name: isRTL ? "الرئيسية" : "Home", href: `/${params.lang}` }]}
			/>
			<div className="container flex items-center justify-center py-[50px] lg:py-[100px]">
				<Blog />
			</div>
		</main>
	);
};

export default Blogs;
