"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import { icons, images } from "@/constants";
import AppButton from "../../common/buttons/app-button";
import { useHeaderQuery } from "@/hooks/root/use-root-hooks";

type Props = {
	appURL: { apple: string; google: string };
};

const Hero = ({ appURL }: Props) => {
	const { data: headerData } = useHeaderQuery();

	const title = useMemo(() => headerData?.data?.title, [headerData]);
	const subTitle = useMemo(() => headerData?.data?.sub_title, [headerData]);
	const description = useMemo(
		() => headerData?.data?.description,
		[headerData]
	);

	const appButtons = useMemo(
		() => (
			<div className="flex gap-3 pb-4">
				<AppButton
					title={"Download on the"}
					img={icons.apple}
					text="App Store"
					bg="white"
					href={appURL.apple || ""}
					animation="to-black"
					useComponent
				/>
				<AppButton
					title={"Get it on"}
					img={icons.google}
					text="Google Play"
					bg="white"
					href={appURL.google || ""}
					animation="to-black"
				/>
			</div>
		),
		[appURL]
	);

	return (
		<div
			className={`shape relative flex min-h-[632px] items-center justify-center gap-4 overflow-hidden bg-primary pb-[50px] pt-[83px] lg:pb-0 lg:pt-32`}
		>
			<div className="container flex flex-col items-center justify-start gap-4 lg:flex-row">
				<div className="order-2 flex w-full flex-1 flex-col items-start gap-4 lg:order-1">
					<h3 className="w-full break-words text-lg font-[700] text-secondary-gray md:max-w-[698px] md:text-2xl">
						{subTitle}
					</h3>
					<h1 className="w-full break-words text-2xl font-[400] text-white md:max-w-[698px] md:text-5xl">
						{title}
					</h1>
					<p className="max-w-[687px] text-sm font-[400] text-secondary-gray md:text-lg">
						{description}
					</p>
					{appButtons}
				</div>

				<div className="order-1 flex flex-[0.55] items-end justify-end lg:order-2">
					<Image
						src={images.hero}
						alt="hero"
						width={570}
						height={10}
						priority
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(Hero);
