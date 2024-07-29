"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/common/modals/modal";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import LoadingButton from "@/components/common/buttons/loading-button";
import { Button } from "@/components/ui/button";
import { useCheckoutMutation } from "@/hooks/cart/use-cart-mutation-hooks";
import { useOrderTypeStore } from "@/store";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

export const RequestShippingFees = ({ isOpen, setIsOpen }: Props) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const {
		addressId,
		code,
		orderType,
		setAddressId,
		setClientSecret,
		setOrderNote,
		setCode,
		setOrderType,
		setPaymentMethod,
		setPaymentType,
		setShippingFees,
	} = useOrderTypeStore();

	const handleClear = () => {
		setAddressId(null);
		setClientSecret("");
		setOrderNote("");
		setCode("");
		setOrderType("");
		setPaymentMethod("");
		setPaymentType("");
		setShippingFees(0);
	};

	const { mutate, isPending: isCheckoutPending } = useCheckoutMutation({
		resetFunction: (response: any) => {
			if (response?.data) {
				handleClear();
				setIsOpen(false);
				router.push(`/${isRTL ? "ar" : "en"}/my-orders/${response?.data?.order?.id}`);
			}
		},
	});

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className="max-h-[650px] overflow-y-auto md:max-w-[600px]"
			title={isRTL ? "اضافة عنوان جديد" : "Add New Address"}
			description={
				isRTL
					? "العنوان خارج منطقة التوصيل الخاصة بنا، يمكنك طلب الطلب الآن والرجاء الانتظار لإشعار منا برسوم التوصيل لتأكيد طلبك."
					: "This address is out of our delivery area, you can request the order now and  Kindly wait for a notification from us with the delivery fees to confirm your order"
			}>
			<div className={`flex items-center justify-center gap-2`}>
				<Button
					className="h-[50px] w-full"
					onClick={() => setIsOpen(false)}
					variant={"destructive"}>
					<span className="text-lg">{isRTL ? "الغاء" : "Cancel"}</span>
				</Button>

				<LoadingButton
					isLoading={isCheckoutPending}
					onClick={() => {
						mutate({
							address_id: addressId,
							code,
							order_type: orderType,
						});
					}}
					variant="default"
					className={`h-[50px] w-full`}>
					<span className="text-lg">{isRTL ? "تأكيد" : "Confirm"}</span>
				</LoadingButton>
			</div>
		</Modal>
	);
};
