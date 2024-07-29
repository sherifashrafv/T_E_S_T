"use client";

import Image from "next/image";
import React from "react";

import AppButton from "@/components/common/buttons/app-button";
import { icons } from "@/constants";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { AboutusDataProps } from "@/types";

const OurStory = ({ ourStory, appUrls }: { ourStory: AboutusDataProps; appUrls: { apple: string; google: string } }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="container flex items-center justify-center overflow-hidden py-[50px]">
			<div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
				<div className="flex w-full max-w-[621px] flex-col gap-4 md:gap-10">
					<h1 className="text-lg font-[700] text-primary md:text-2xl">{isRTL ? "قصتنا" : "Our Story"}</h1>
					<h3 className="text-xl font-[400] text-primary md:text-3xl">
						{ourStory.title} <span className="font-[700]">{ourStory.title_colored}</span>
					</h3>
					<p
						className="whitespace-pre-wrap text-sm font-[400] md:text-[16px]"
						dangerouslySetInnerHTML={{ __html: ourStory.description }}
					/>
					<div className="flex gap-3 pb-4">
						<AppButton
							title={"Download on the"}
							img={icons.apple}
							text="App Store"
							bg="primary"
							href={appUrls.apple || ""}
							animation="to-white"
							useComponent
						/>
						<AppButton
							title={"Get it on"}
							img={icons.google}
							text="Google Play"
							bg="primary"
							href={appUrls.google || ""}
							animation="to-white"
						/>
					</div>
				</div>
				<div className="relative h-[308px] w-[315px] md:h-[421px] md:w-[447px]">
					<div className={`absolute size-full ${isRTL ? "md:-left-0 lg:-left-32" : "md:-right-0 lg:-right-10"}`}>
						<div className="absolute left-2 top-0 h-[266px] w-[246px] rounded-2xl md:right-0 md:h-[380px] md:w-[352px]">
							<Image
								src={ourStory.image}
								alt="blue"
								fill
								priority
								className="rounded-2xl object-cover opacity-30"
							/>
						</div>
						<div className="absolute left-8 top-4 h-[266px] w-[246px] rounded-2xl md:-right-6 md:h-[380px] md:w-[352px]">
							<Image
								src={ourStory.image}
								alt="whiteBlue"
								fill
								priority
								className="rounded-2xl object-cover opacity-50"
							/>
						</div>
						<div className="absolute left-16 top-10 h-[266px] w-[246px] rounded-2xl md:-right-14 md:h-[380px] md:w-[352px]">
							<Image
								src={ourStory.image}
								alt="white"
								fill
								priority
								className="rounded-2xl object-center"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OurStory;
