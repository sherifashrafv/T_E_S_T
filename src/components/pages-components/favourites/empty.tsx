"use client";

import React from "react";
import Link from "next/link";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import Image from "next/image";
import { icons } from "@/constants";
import { Button } from "@/components/ui/button";

const Empty = ({ pageName }: { pageName: string }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex w-full flex-col items-center justify-center gap-5">
			<div className="relative size-[64px]">
				<Image
					src={icons.empty}
					alt="empty"
					fill
					priority
				/>
			</div>
			<p className="w-full max-w-[237px] text-center text-sm font-[400]">
				{isRTL ? `لا يوجد ${pageName} بعد ! تسوق الان وقم بإضافة ${pageName}` : `No ${pageName} yet! Shop now and add your ${pageName}.`}
			</p>

			<Link
				href={`/${isRTL ? "ar" : "en"}/store?category=all`}
				className="w-full max-w-[184px]">
				<Button className="w-full">{isRTL ? "تسوق الان" : "Shop Now"}</Button>
			</Link>
		</div>
	);
};

export default Empty;
