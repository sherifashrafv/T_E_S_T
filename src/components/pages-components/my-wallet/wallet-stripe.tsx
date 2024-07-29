"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useOrderTypeStore } from "@/store";
import { toast } from "sonner";
import { useWalletQuery } from "@/hooks/profile/use-profile-hooks";

const PaymentForm = ({ closeModal }: { closeModal: () => void }) => {
	const stripe = useStripe();
	const elements = useElements();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [loading, setLoading] = React.useState(false);

	const { refetch } = useWalletQuery();
	const { clientSecret, setClientSecret } = useOrderTypeStore();

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
			console.log(result.error.message);
			toast.error(result.error.message);
			setLoading(false);
		} else {
			toast.success(isRTL ? "تم الدفع بنجاح" : "Payment successful");
			refetch && refetch();
			setClientSecret("");
			setLoading(false);
			closeModal();
		}
	};

	return (
		<div className="flex w-full flex-col gap-5">
			<form
				className="w-full"
				onSubmit={handleSubmit}>
				<PaymentElement />
				<LoadingButton
					isLoading={loading}
					htmlType="submit"
					disabled={!stripe || !elements || !clientSecret}
					className="mt-5 w-full">
					{isRTL ? "إتمام الطلب" : "Complete Payment"}
				</LoadingButton>
			</form>
		</div>
	);
};

export default PaymentForm;
