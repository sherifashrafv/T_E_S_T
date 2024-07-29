"use client";

import React, { useEffect, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SectionHeader = ({ header }: { header: string }) => {
	useEffect(() => {
		gsap.fromTo(
			"#header-to-top",
			{ opacity: 0, y: 30 },
			{ opacity: 1, y: 0, duration: 0.8, ease: "power1.inOut" }
		);

		gsap.fromTo(
			"#text-to-right",
			{ opacity: 0, x: -30 },
			{ opacity: 1, x: 0, duration: 0.8, ease: "power1.inOut" }
		);

		gsap.fromTo(
			"#text-to-left",
			{ opacity: 0, x: 30 },
			{ opacity: 1, x: 0, duration: 0.8, ease: "power1.inOut" }
		);
	}, []);

	return (
		<>
			<h1
				className="text-lg font-[700] text-primary md:text-2xl lg:text-3xl"
				id="header-to-top"
			>
				{header}
			</h1>
		</>
	);
};

export default memo(SectionHeader);
