"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import AddressWrapper from "@/components/shared/address-wrapper";
import { useDetailsIdStore } from "@/store";

const NewAddresses = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const { detailsId } = useDetailsIdStore();

	return (
		<div className="flex w-full flex-col gap-3 md:gap-5">
			<CartHeader title={detailsId ? (isRTL ? "تعديل عنوان" : "Edit Address") : isRTL ? "اضافة عنوان جديد" : "Add New Address"} />
			<AddressWrapper
				closeModal={() => {}}
				inAdd
			/>
		</div>
	);
};

export default NewAddresses;
