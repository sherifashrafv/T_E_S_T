import React from "react";

import OrderSummary from "@/components/shared/order-summary";
import { StripeProvider } from "@/config/providers/StripeProvider";
import PaymentForm from "./payment-form";
import CartHeader from "@/components/shared/cart-header";

const PaymentWrapper = ({ lang }: { lang: string }) => {
	const isRTL = lang === "ar";

	return (
		<div className="container flex w-full flex-col items-start justify-center gap-5 py-[50px] lg:flex-row lg:gap-10 lg:py-[100px]">
			<div className="flex w-full flex-col gap-5 md:max-w-[797px]">
				<CartHeader title={isRTL ? "الدفع" : "Payment"} />
				<div className="w-full rounded border border-border p-4">
					<StripeProvider>
						<PaymentForm />
					</StripeProvider>
				</div>
			</div>

			<OrderSummary
				href={`/${isRTL ? "ar" : "en"}/tracking`}
				inPayment
			/>
		</div>
	);
};

export default PaymentWrapper;
