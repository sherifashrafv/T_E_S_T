"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import Image from "next/image";
import { icons } from "@/constants";

const Empty = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex w-full flex-col items-center justify-center gap-5">
			<div className="relative size-[64px]">
				<Image
					src={icons.empty}
					alt="empty"
					priority
					fill
				/>
			</div>
			<p className="w-full max-w-[237px] text-center text-sm font-[400]">{isRTL ? "لايوجد اي معلومات مضافة حتي الان" : "No Data added yet!"}</p>
		</div>
	);
};

export default Empty;
