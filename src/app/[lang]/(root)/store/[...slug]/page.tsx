import React from "react";

import Details from "@/components/pages-components/shop/shop-details";

const ShopDetails = ({ params }: { params: { lang: string; slug: string } }) => {
	return (
		<Details
			lang={params.lang}
			detailsId={params.slug?.[0]}
		/>
	);
};

export default ShopDetails;
