/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import CartHeader from "@/components/shared/cart-header";
import AddressCard from "@/components/shared/address-card";
import { Button } from "@/components/ui/button";
import { useAddressesQuery } from "@/hooks/cart/use-cart-hooks";
import Empty from "@/components/shared/empty";
import { AddressProps } from "@/types";
import { useDetailsIdStore } from "@/store";
import { Loader2Icon } from "lucide-react";

const DeliveryWrapper = () => {
	const route = useRouter();
	const { setDetailsId } = useDetailsIdStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { data, isFetching, refetch } = useAddressesQuery();
	useEffect(() => {
		setDetailsId(null);
	}, []);

	return (
		<div className="flex w-full flex-col gap-3 md:gap-5">
			<CartHeader title={isRTL ? "عناوين التوصيل" : "Delivery Addresses"} />
			{isFetching ? (
				<div className="flex w-full items-center justify-center">
					<Loader2Icon className="animate-spin" />
				</div>
			) : data?.data?.length === 0 ? (
				<div className="flex w-full flex-col gap-5">
					<Empty />
				</div>
			) : (
				<div className="flex w-full flex-col gap-5">
					{data?.data?.map((item: AddressProps, index: number) => (
						<AddressCard
							fromProfile
							key={index}
							active={item.is_default === 1}
							address={item}
							refetch={refetch}
						/>
					))}
				</div>
			)}
			<Button
				className="w-[172px]"
				onClick={() => route.push(`/${isRTL ? "ar" : "en"}/delivery-address/add`)}>
				{isRTL ? "اضافة عنوان جديد" : "Add New Address"}
			</Button>
		</div>
	);
};

export default DeliveryWrapper;
