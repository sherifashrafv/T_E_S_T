import React from "react";

import Details from "@/components/pages-components/blogs/blog-details";
import { Locale } from "@/config/i18n.config";

const BlogDetails = ({ params }: { params: { lang: Locale } }) => {
	return <Details lang={params.lang} />;
};

export default BlogDetails;
