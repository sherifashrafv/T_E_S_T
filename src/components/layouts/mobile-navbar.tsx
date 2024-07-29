"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import NavigationLinks from "./navigations";
import { icons, images } from "@/constants";
import { getCookiesClientSide, setCookiesClientSide } from "@/utils/Functions/cookies-client-side";

import { i18n } from "@/config/i18n.config";
import { useQueryParams } from "@/utils/Functions/use-query-params";
import { Earth, LinkedinIcon, Menu, YoutubeIcon } from "lucide-react";
import { useFooterStore } from "@/store";

type Props = {
	Links: {
		id: number;
		name: string;
		href: string;
	}[];
};

const MobileNavbar = ({ Links }: Props) => {
	const { category, price, show } = useQueryParams();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const pathName = usePathname();
	const { footerData: data } = useFooterStore();
	const footerData = data?.data;

	const social = [
		{ id: 1, icon: icons?.tiktok, href: footerData?.TikTok || "" },
		{ id: 2, icon: icons?.facebook, href: footerData?.facebook || "" },
		{
			id: 3,
			icon: icons?.whatsapp,
			href: `https://wa.me/${footerData?.Whatsapp}` || "",
		},
		{ id: 4, icon: icons?.twitter, href: footerData?.twitter || "" },
		{ id: 5, icon: icons?.snapchat, href: footerData?.snapchat || "" },
		{ id: 6, icon: icons?.instagram, href: footerData?.instegram || "" },
		{
			id: 7,
			icon: <LinkedinIcon size={24} />,
			href: footerData?.LinkedIn || "",
			type: "icon",
		},
		{
			id: 8,
			icon: <Earth size={24} />,
			href: footerData?.website || "",
			type: "icon",
		},
		{
			id: 9,
			icon: <YoutubeIcon size={24} />,
			href: footerData?.YouTube || "",
			type: "icon",
		},
	];

	const [isOpen, setIsOpen] = React.useState(false);

	const redirectedPathName = (locale: string) => {
		if (!pathName) return "/";
		const [path, queryString] = pathName.split("?");
		const searchParams = new URLSearchParams(queryString);
		const segments = path.split("/");
		segments[1] = locale;
		category && searchParams.set("category", category);
		price && searchParams.set("price", price);
		show && searchParams.set("show", show);
		return `${segments.join("/")}?${searchParams.toString()}`;
	};

	return (
		<>
			<Link
				href={`https://wa.me/${data?.Whatsapp}` || ""}
				target="_blank"
				className={`fixed bottom-20 ${isRTL ? "left-5" : "right-5"} z-20 size-[50px] md:bottom-10`}>
				<Image
					src={icons.whatsappG}
					alt="whatsapp"
					fill
					priority
				/>
			</Link>
			<Link
				href={`tel:${data?.numbers?.[0] || ""}`}
				target="_blank"
				className={`fixed bottom-32 ${isRTL ? "left-6" : "right-6"} z-20 size-[45px] md:bottom-24`}>
				<Image
					src={icons.phone2}
					alt="phone"
					fill
					priority
				/>
			</Link>
			<div className="block lg:hidden">
				<Menu
					className="size-[20px] cursor-pointer"
					onClick={() => setIsOpen(true)}
				/>
				<Sheet
					open={isOpen}
					onOpenChange={setIsOpen}>
					<SheetContent
						side={isRTL ? "right" : "left"}
						className="z-50 h-full w-[90%] overflow-y-auto pb-3">
						<SheetHeader>
							<div className="relative h-[40px] w-[205px] ">
								<Image
									src={icons.logo}
									alt="logo"
									fill
									priority
								/>
							</div>
						</SheetHeader>
						<NavigationLinks
							Links={Links}
							inMobile
							closeMenu={() => setIsOpen(!isOpen)}
						/>
						<div className="flex justify-between gap-5 border-y border-y-border py-5">
							<div className="flex flex-col items-start justify-between gap-4 text-start">
								<Link
									href={`/${isRTL ? "ar" : "en"}/privacy`}
									onClick={() => setIsOpen(!isOpen)}
									className="text-start text-sm font-[700] text-primary hover:underline">
									{isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
								</Link>
								<Link
									href={`/${isRTL ? "ar" : "en"}/terms`}
									onClick={() => setIsOpen(!isOpen)}
									className="text-start text-sm font-[700] text-primary hover:underline">
									{isRTL ? "الشروط والاحكام" : "Terms of Service"}
								</Link>
							</div>
							<div className="flex flex-col items-start justify-between gap-4 text-start">
								<Link
									href={`/${isRTL ? "ar" : "en"}/refund`}
									onClick={() => setIsOpen(!isOpen)}
									className="text-start text-sm font-[700] text-primary hover:underline">
									{isRTL ? "سياسة الاسترجاع" : "Refund Policy"}
								</Link>
								<Link
									href={`/${isRTL ? "ar" : "en"}/shipping`}
									onClick={() => setIsOpen(!isOpen)}
									className="text-start text-sm font-[700] text-primary hover:underline">
									{isRTL ? "سياسة الشحن" : "Shipping Policy"}
								</Link>
							</div>
						</div>
						<div className="mt-5 grid min-h-[45px] grid-cols-4 place-items-center justify-items-center border border-border">
							{social
								.filter((item) => item.href)
								.slice(0, 4)
								.map((item) => (
									<Link
										key={item.id}
										href={item.href}
										target="_blank"
										rel="noreferrer"
										className="flex size-full items-center justify-center border-e border-e-border last:border-none">
										{item.type === "icon" ? (
											<>{item.icon}</>
										) : (
											<Image
												src={item.icon}
												alt="icon"
												width={24}
												height={24}
												priority
												className="size-[24px]"
											/>
										)}
									</Link>
								))}
						</div>
						<div className="mb-5 flex min-h-[45px] flex-wrap items-center border border-border">
							{social
								.filter((item) => item.href)
								.slice(4)
								.map((item) => (
									<Link
										key={item.id}
										href={item.href}
										target="_blank"
										rel="noreferrer"
										className="flex h-[45px] flex-1 items-center justify-center border-e border-e-border">
										{item.type === "icon" ? (
											<>{item.icon}</>
										) : (
											<Image
												src={item.icon}
												alt="icon"
												width={24}
												height={24}
												priority
												className="size-[24px]"
											/>
										)}
									</Link>
								))}
						</div>
						<div className="mt-5 flex w-full items-center justify-center gap-2">
							{i18n.locales.map((locale) => {
								return (
									<Link
										key={locale}
										href={redirectedPathName(locale)}
										onClick={() => {
											setIsOpen(!isOpen);
											setCookiesClientSide("NEXT_LOCALE", locale);
										}}
										className={`flex w-full items-center justify-center gap-2 rounded border bg-background py-1 hover:border-primary hover:bg-primary hover:text-white ${locale === "ar" && isRTL ? "border-primary bg-primary text-white" : locale === "en" && !isRTL ? "border-primary bg-primary text-white" : ""}`}>
										<Image
											src={locale === "en" ? images.en : images.ar}
											alt="arabic"
											width={18}
											height={18}
											priority
										/>
										{locale === "en" ? (isRTL ? "انجليزي" : "English") : isRTL ? "عربي" : "Arabic"}
									</Link>
								);
							})}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
};

export default MobileNavbar;
