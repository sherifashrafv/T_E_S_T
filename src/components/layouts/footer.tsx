"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { icons } from "@/constants";
import AppButton from "../common/buttons/app-button";
import { useFooterQuery } from "@/hooks/root/use-root-hooks";
import { Earth, LinkedinIcon, LoaderCircle, YoutubeIcon } from "lucide-react";

const Footer = ({ lang }: { lang: string }) => {
	const { data, isFetching } = useFooterQuery();

	const isRTL = lang === "ar";

	const social = [
		{ id: 1, icon: icons?.tiktok, href: data?.data?.TikTok || "" },
		{ id: 2, icon: icons?.facebook, href: data?.data?.facebook || "" },
		{
			id: 3,
			icon: icons?.whatsapp,
			href: `https://wa.me/${data?.data?.Whatsapp}` || "",
		},
		{ id: 4, icon: icons?.twitter, href: data?.data?.twitter || "" },
		{ id: 5, icon: icons?.snapchat, href: data?.data?.snapchat || "" },
		{ id: 6, icon: icons?.instagram, href: data?.data?.instegram || "" },
		{
			id: 7,
			icon: (
				<LinkedinIcon
					strokeWidth={0.9}
					size={20}
				/>
			),
			href: data?.data?.LinkedIn || "",
			type: "icon",
		},
		{
			id: 8,
			icon: (
				<Earth
					strokeWidth={0.9}
					size={20}
				/>
			),
			href: data?.data?.website || "",
			type: "icon",
		},
		{
			id: 9,
			icon: (
				<YoutubeIcon
					strokeWidth={0.9}
					size={20}
				/>
			),
			href: data?.data?.YouTube || "",
			type: "icon",
		},
	];

	return (
		<footer className="flex w-full flex-col items-center gap-5 bg-card-card2 py-[100px] md:pb-[20px]">
			<div className="container flex w-full flex-col items-center gap-5">
				<Image
					src={icons.logo}
					alt="logo"
					width={255}
					height={50}
					priority
				/>
				{isFetching ? (
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<p
						className="max-w-[720px] text-center text-[16px] font-[400] leading-6 text-[#464547]"
						dangerouslySetInnerHTML={{ __html: data?.data?.footer || "" }}
					/>
				)}

				<div className="flex flex-wrap items-center gap-5">
					{social
						.filter((item) => item.href)
						.map(({ id, icon, href, type }) => (
							<Link
								key={id}
								href={href}
								target="_blank"
								className="size-5 sm:size-7">
								{type === "icon" ? (
									<>{icon}</>
								) : (
									<Image
										src={icon}
										alt="icon"
										width={24}
										height={24}
										priority
									/>
								)}
							</Link>
						))}
				</div>

				<div className="flex gap-3 pb-4">
					<AppButton
						title={"Download on the"}
						img={icons.apple}
						text="App Store"
						bg="primary"
						href={data?.data?.apple_store_link || ""}
						animation="to-white"
						useComponent
						inFooter
					/>
					<AppButton
						title={"Get it on"}
						img={icons.google}
						text="Google Play"
						bg="primary"
						href={data?.data?.android_store_link || ""}
						animation="to-white"
						inFooter
					/>
				</div>

				<div className="border-primary/20 flex w-full flex-wrap items-center justify-center gap-4 border-t pt-3 md:justify-between md:gap-0">
					<h3 className="text-sm font-[400] text-primary">
						{isRTL ? "جميع الحقوق محفوظة" : "All rights reserved to"} <span className="font-[700]">Chique Bouttique</span> © 2024
					</h3>

					<div className="flex items-center gap-3">
						<p className="text-sm font-[400] text-primary">{isRTL ? "تصميم و برمجة" : "Developed by"}</p>
						<Image
							src={icons.technoraft}
							alt="technoraft"
							width={95}
							height={30}
							priority
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
