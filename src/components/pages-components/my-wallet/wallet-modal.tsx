"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import { Modal } from "@/components/common/modals/modal";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { useChargeWalletMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useOrderTypeStore } from "@/store";
import { StripeProvider } from "@/config/providers/StripeProvider";
import PaymentForm from "./wallet-stripe";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	refetch: () => void;
};

const WalletModal = ({ isOpen, setIsOpen }: Props) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const formSchema = z.object({
		amount: z
			.string()
			.min(1, { message: isRTL ? "الرجاء تحديد المبلغ" : "Please enter the amount" })
			.refine((val) => Number(val) > 0, { message: isRTL ? "الرجاء تحديد المبلغ" : "Please enter the amount" }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: "",
		},
	});
	const { clientSecret } = useOrderTypeStore();

	const { mutate: chargeWallet, isPending } = useChargeWalletMutation({ resetFunction: () => {} });

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		chargeWallet({ amount: Number(data.amount) });
	};

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={() => {
				setIsOpen(false);
				form.reset();
			}}
			className="max-h-[650px] w-[95vw] overflow-y-auto rounded-md md:max-w-[400px]"
			title={isRTL ? "اشحن المحفظة" : "Charge your Wallet"}>
			{clientSecret ? (
				<StripeProvider>
					<PaymentForm
						closeModal={() => {
							setIsOpen(false);
							form.reset();
						}}
					/>
				</StripeProvider>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<FormFields
							control={form.control}
							name="amount"
							label={isRTL ? "القيمة" : "Value"}
							holder={""}
						/>

						<div className="flex w-full flex-col items-center justify-start gap-3 sm:flex-row sm:gap-5">
							<LoadingButton
								type="submit"
								isLoading={isPending}
								className="w-full">
								{isRTL ? "تأكيد" : "Confirm"}
							</LoadingButton>
							<Button
								variant="outline"
								onClick={() => {
									setIsOpen(false);
									form.reset();
								}}
								className="w-full">
								{isRTL ? "رجوع" : "Back"}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</Modal>
	);
};

export default WalletModal;
