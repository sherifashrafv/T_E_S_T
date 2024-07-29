"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import OrderSummary from "@/components/shared/order-summary";
import AddressCard from "../../shared/address-card";
import { Button } from "@/components/ui/button";
import { useAddressesQuery } from "@/hooks/cart/use-cart-hooks";
import Empty from "@/components/shared/empty";
import AddressModal from "@/components/shared/address-modal";
import { AddressProps } from "@/types";
import { useAddFromStore, useDetailsIdStore, useOrderSummaryStore, useOrderTypeStore } from "@/store";
import { Loader2Icon } from "lucide-react";

const AddressWrapper = ({ lang }: { lang: string }) => {
	const { setAddFrom } = useAddFromStore();
	const { setDetailsId } = useDetailsIdStore();
	const { setAddressId } = useOrderTypeStore();
	const { tax, couponValue, price, walletValue, setGrandTotal, items, setShippingFees } = useOrderSummaryStore();

	const isRTL = lang === "ar";

	const [isOpen, setIsOpen] = React.useState(false);
	const { data, isFetching, refetch } = useAddressesQuery();

	const findValue = React.useCallback(
		(items: any[], count: number) => {
			let result = 0;
			if (items === null) return isRTL ? "سيتم تحديد رسوم الشحن" : "Shipping Price Will Be Reviewed";
			if (typeof items === "string") return items;
			items.some((item) => {
				const { from, to, value } = item;
				if (count > from && (to === null || count <= to)) {
					result = value;
					return true;
				}
				return false;
			});
			return result;
		},
		[isRTL]
	);
	const updateGrandTotal = React.useCallback(
		(shipping: number) => {
			const total = price + shipping + tax - couponValue;
			const totalAfterWallet = total - walletValue;
			setGrandTotal(totalAfterWallet > 0 ? totalAfterWallet : 0);
		},
		[couponValue, price, setGrandTotal, tax, walletValue]
	);

	const getFirstAddress = React.useCallback(() => {
		if (isFetching) return;
		if (data?.data?.length > 1) {
			const defaultAddress = data?.data?.find((item: AddressProps) => item.is_default === 1);
			if (defaultAddress) {
				setAddressId(defaultAddress.id);
				const results = findValue(defaultAddress?.shipping_fees, items);
				setShippingFees(results);
				updateGrandTotal(typeof results === "string" ? 0 : results);
			}
		} else if (data?.data?.length > 0 && data?.data?.length <= 1) {
			const firstAddress = data?.data?.[0];
			if (firstAddress) {
				setAddressId(firstAddress.id);
				const results = findValue(firstAddress?.shipping_fees, items);
				setShippingFees(results);
				updateGrandTotal(typeof results === "string" ? 0 : results);
			}
		}
	}, [data?.data, items, setAddressId, setShippingFees, updateGrandTotal, findValue, isFetching]);

	React.useEffect(() => {
		getFirstAddress();
	}, [data, getFirstAddress]);

	return (
		<div className="container flex w-full flex-col items-start justify-center gap-5 py-[50px] lg:flex-row lg:gap-10 lg:py-[100px]">
			<div className="flex w-full flex-col gap-5 md:max-w-[797px]">
				<CartHeader title={isRTL ? "اختيار عنوان التوصيل" : "Choose Delivery Address"} />
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
								key={index}
								active={item.is_default === 1}
								address={item}
								refetch={refetch}
								findValue={findValue}
								updateGrandTotal={updateGrandTotal}
							/>
						))}
					</div>
				)}
				<Button
					className="w-[172px]"
					onClick={() => {
						setIsOpen(true);
						setAddFrom("cart");
						setDetailsId(null);
					}}>
					{isRTL ? "اضافة عنوان جديد" : "Add New Address"}
				</Button>
				<AddressModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					refetch={refetch}
				/>
			</div>

			<OrderSummary
				inAddress
				href={`/${isRTL ? "ar" : "en"}/payment`}
			/>
		</div>
	);
};

export default AddressWrapper;
