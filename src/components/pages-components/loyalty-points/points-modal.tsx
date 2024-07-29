"use client";

import React from "react";

import { Modal } from "@/components/common/modals/modal";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { useTransferPointMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import LoadingButton from "@/components/common/buttons/loading-button";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	points: number;
	refetch: () => void;
};

const PointsModal = ({ isOpen, setIsOpen, points, refetch }: Props) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { mutate, isPending } = useTransferPointMutation({
		resetFunction: () => {
			setIsOpen(false);
			refetch();
		},
	});

	// const transferToUsd = () => {
	//   // 1$ = 1000 loyalty points
	//   const value = points / 1000;

	//   return value;
	// };

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className={`max-h-[650px] w-[95vw] overflow-y-auto rounded-md md:max-w-[500px]`}
			title={isRTL ? "تحويل نقاط ولائي" : "Transfer loyalty points"}
			description={isRTL ? "تحويل نقاط ولائي الى رصيد المحفظة" : "Transfer loyalty points into wallet balance"}>
			<div className="flex flex-col gap-5">
				<div className="flex items-center justify-between gap-3">
					<h2 className="text-sm font-[400] text-primary">{isRTL ? "اجمالي نقاط ولائي" : "Total loyalty points"} :</h2>
					<p className="text-lg font-[700] text-primary">{points || 0}</p>
				</div>
				{/* <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-[400] text-primary">
            {isRTL ? "قيمة نقاط ولائي" : "Value of loyalty points"} :
          </h2>
          <p className="text-lg font-[700] text-primary">
            {transferToUsd() || 0}$
          </p>
        </div> */}

				<div className="flex w-full flex-col items-center justify-start gap-3 sm:flex-row sm:gap-5">
					<LoadingButton
						onClick={() => mutate()}
						isLoading={isPending}
						className="w-full">
						{isRTL ? "تأكيد" : "Confirm"}
					</LoadingButton>
					<Button
						variant="outline"
						onClick={() => {
							setIsOpen(false);
						}}
						className="w-full">
						{isRTL ? "رجوع" : "Back"}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default PointsModal;
