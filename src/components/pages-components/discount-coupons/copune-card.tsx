"use client";

import Image from "next/image";
import { toast } from "sonner";
import React from "react";

import { icons } from "@/constants";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { CouponsProps } from "@/types";

const CopuneCard = ({ coupons }: { coupons: CouponsProps }) => {
	const isRTL = getCookiesClientSide("isRTL") === "true";

	const handelCopyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(isRTL ? "تم نسخ الكوبون بنجاح" : "Copied to clipboard");
	};

	return (
		<div className="flex h-[107px] items-center justify-center rounded-md bg-card-card2">
			<div className="flex size-full max-w-[78px] items-center justify-center border-r-2 border-r-[#DBD69F]">
				<div className="relative size-[50px]">
					<Image
						src={icons.mobileLogo}
						alt="copune"
						fill
						priority
					/>
				</div>
			</div>
			<div className="flex w-full flex-col gap-1 p-5">
				<div className="flex w-full items-center justify-between">
					<h1 className="text-lg font-[700] text-primary">
						{coupons?.value} {coupons?.currency}
					</h1>
					<div
						onClick={() => handelCopyToClipboard(coupons?.code)}
						className="relative size-[24px] cursor-pointer">
						<Image
							src={icons.copy}
							alt="copy"
							fill
							priority
						/>
					</div>
				</div>
				<h2 className="text-sm font-[700] text-primary">{coupons?.code}</h2>
				<p className="text-primary/80 text-xs font-[400]">
					{isRTL ? "صالح حتى" : "Valid until"} {coupons?.end}
				</p>
			</div>
		</div>
	);
};

export default CopuneCard;
