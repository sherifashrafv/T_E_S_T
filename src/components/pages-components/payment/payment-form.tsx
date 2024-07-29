"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import { useDetailsIdStore, useOrderTypeStore } from "@/store";
import { useCheckoutMutation } from "@/hooks/cart/use-cart-mutation-hooks";
import { toast } from "sonner";

const PaymentForm = () => {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [loading, setLoading] = React.useState(false);

	const { refetch } = useCartOrdersQuery();
	const { addressId, code, orderNote, orderType, paymentMethod, paymentType, shippingFees, clientSecret } = useOrderTypeStore();
	const { setDetailsId } = useDetailsIdStore();

	const { mutate, isPending: isCheckoutPending } = useCheckoutMutation({
		resetFunction: (response: any) => {
			refetch();

			setDetailsId(response?.data?.order?.id);
			router.replace(`/${isRTL ? "ar" : "en"}/tracking`);
		},
	});

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setLoading(true);
		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			setLoading(false);
			toast.error(submitError.message);
			return;
		}

		const result = await stripe.confirmPayment({
			elements,
			clientSecret,
			redirect: "if_required",
		});

		if (result.error) {
			setLoading(false);
			toast.error(result.error.message);
		} else {
			mutate({
				address_id: addressId,
				code,
				order_gift_note: orderNote,
				order_type: orderType,
				payment_method: paymentMethod,
				payment_type: paymentType,
				shipping_fees: shippingFees,
			});
		}
	};

	return (
		<div className="flex w-full flex-col gap-5">
			<form
				className="w-full"
				onSubmit={handleSubmit}>
				<PaymentElement options={{ layout: "tabs" }} />
				<LoadingButton
					isLoading={loading || isCheckoutPending}
					htmlType="submit"
					disabled={!stripe || !elements || !clientSecret}
					className="mt-5 w-full md:w-[200px]">
					{isRTL ? "إتمام الطلب" : "Checkout"}
				</LoadingButton>
			</form>
		</div>
	);
};

export default PaymentForm;
