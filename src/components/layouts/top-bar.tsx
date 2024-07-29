"use client";

import Link from "next/link";
import React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const TopBar = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	useGSAP(() => {
		gsap.fromTo(
			"#text-to-top",
			{
				opacity: 0,
				y: -30,
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power1.inOut",
			}
		);
	});

	return (
		<div className="hidden h-[40px] items-center justify-center gap-32 bg-primary px-10 lg:flex">
			<div className="flex items-center justify-center gap-4">
				<Link
					href={`/${isRTL ? "ar" : "en"}/privacy`}
					className="text-sm font-[400] text-white hover:underline">
					{isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
				</Link>
				<Link
					href={`/${isRTL ? "ar" : "en"}/refund`}
					className="text-sm font-[400] text-white hover:underline">
					{isRTL ? "سياسة الاسترجاع" : "Refund Policy"}
				</Link>
			</div>
			<div className="flex items-center justify-center gap-2">
				<h1
					className="text-[14px] font-[400] leading-[24.5px] text-white"
					id="text-to-top">
					{isRTL ? "احصل على خصم 25% على طلبك الأول." : "Get 25% OFF on your first order."}
				</h1>{" "}
				<Link
					href={`/${isRTL ? "ar" : "en"}/store?category=all`}
					className="text-[14px] font-[700] leading-[24.5px] text-[#DBD69F]"
					id="text-to-top">
					{isRTL ? "تسوق الآن" : "Shop Now"}
				</Link>
			</div>
			<div className="flex items-center justify-center gap-4">
				<Link
					href={`/${isRTL ? "ar" : "en"}/shipping`}
					className="text-sm font-[400] text-white hover:underline">
					{isRTL ? "سياسة الشحن" : "Shipping Policy"}
				</Link>
				<Link
					href={`/${isRTL ? "ar" : "en"}/terms`}
					className="text-sm font-[400] text-white hover:underline">
					{isRTL ? "الشروط والاحكام" : "Terms of Service"}
				</Link>
			</div>
		</div>
	);
};

export default TopBar;
