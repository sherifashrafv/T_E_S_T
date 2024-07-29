"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import { Button } from "@/components/ui/button";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import Image from "next/image";
import { icons } from "@/constants";
import { usePointsQuery } from "@/hooks/profile/use-profile-hooks";
import { Loader2Icon } from "lucide-react";
import PointsModal from "./points-modal";

const PointsWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [open, setOpen] = React.useState(false);

	const { data: points, isFetching, refetch } = usePointsQuery();

	return (
		<div className="flex w-full flex-col gap-5">
			<CartHeader title={isRTL ? "نقاط ولائي" : "Loyalty Points"} />
			<div className="flex size-full flex-col items-center justify-center gap-5">
				<div className="flex h-[233px] w-full max-w-[593px] flex-col items-center justify-center gap-3 bg-card-card2">
					<p className="text-primary/80 text-sm font-[400]">{isRTL ? "نقاط ولائي" : "My Loyalty Points"}</p>
					<div className="relative size-[64px]">
						<Image
							src={icons.point}
							alt="wallet"
							fill
							priority
						/>
					</div>
					{isFetching ? (
						<div className="flex items-center justify-center">
							<Loader2Icon className="mx-auto size-5 animate-spin" />
						</div>
					) : (
						<h1 className="text-lg font-[700] text-primary">{points?.data?.points}</h1>
					)}
					{/* <p className="text-primary/80 text-sm font-[400]">{isRTL ? "كل 1000 نقطة ولاء = 1$" : "Each 1000 loyalty points = $1."}</p> */}
				</div>
				<Button
					className="w-full max-w-[266px]"
					onClick={() => setOpen(true)}>
					{isRTL ? "تحويل لرصيد المحفظة" : "Transfer to wallet balance"}
				</Button>
				<PointsModal
					isOpen={open}
					setIsOpen={setOpen}
					points={points?.data?.points}
					refetch={refetch}
				/>
			</div>
		</div>
	);
};

export default PointsWrapper;
