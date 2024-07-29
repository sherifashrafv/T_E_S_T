/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";

import { Linkedin, Earth, LucideFacebook, LucideInstagram, Youtube } from "lucide-react";
import WhatsappIcon from "./icons/WhatsappIcon";
import AppleIcon from "./icons/AppleIcon";
import Googleplay from "./icons/GoogleplayIcon";
import SnapchatIcon from "./icons/SnapchatIcon";
import TiktokIcon from "./icons/TiktokIcon";
import QruanIcon from "./icons/QruanIcon";
import LogoChiqueBouttiqueWhite from "./icons/LogoChiqueBouttiqueWhite";
import Loading from "@/components/shared/loading";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { icons } from "@/constants";

const QrWrapper = () => {
	const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const [loading, setLoading] = React.useState(false);
	const [homeData, setHomeData] = React.useState<any>({});

	const getHomeData = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get("https://admin.chiquebouttique.com/api/home");
			setHomeData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		getHomeData();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const socialLinks = [
		{ id: 1, name: "Twitter account", icon: <QruanIcon className="!size-4 md:!size-7" />, href: homeData?.data?.twitter || "" },
		{ id: 2, name: "Whatsapp account", icon: <WhatsappIcon className="!size-4 md:!size-7" />, href: homeData?.data?.Whatsapp || "" },
		{
			id: 3,
			name: "Facebook account",
			icon: (
				<LucideFacebook
					color="white"
					className="!size-4 bg-black text-white md:!size-7"
				/>
			),
			href: homeData?.data?.facebook || "",
		},
		{
			id: 4,
			name: "Instagram account",
			icon: (
				<LucideInstagram
					color="white"
					className="!size-4 bg-black text-white md:!size-7"
				/>
			),
			href: homeData?.data?.instegram || "",
		},
		{ id: 5, name: "TikTok account", icon: <TiktokIcon className="!size-4 md:!size-7" />, href: homeData?.data?.TikTok || "" },
		{ id: 6, name: "Snapchat account", icon: <SnapchatIcon className="!size-4 md:!size-7" />, href: homeData?.data?.snapchat || "" },
		{
			id: 7,
			name: "LinkedIn account",
			icon: <Linkedin className="!size-4 text-white md:!size-7" />,
			href: homeData?.data?.LinkedIn || "",
		},
		{
			id: 8,
			name: "YouTube account",
			icon: <Youtube className="!size-4 text-white md:!size-7" />,
			href: homeData?.data?.YouTube || "",
		},
		{ id: 9, name: "Website account", icon: <Earth className="!size-4 text-white md:!size-7" />, href: "https://chiquebouttique.com" },
		{ id: 10, name: "Google play", icon: <Googleplay className="!size-4 md:!size-7" />, href: "https://chiquebouttique.com" },
		{ id: 11, name: "App store", icon: <AppleIcon className="!size-4 md:!size-7" />, href: "https://chiquebouttique.com" },
	];

	return (
		<>
			<Carousel
				plugins={[plugin.current]}
				className="w-full"
				opts={{ align: "start", loop: true }}>
				<CarouselContent className="m-0 w-full">
					{homeData?.data?.banners?.map((item: any) => {
						return (
							<CarouselItem
								key={item.id}
								className="w-full p-0">
								<div className="relative h-[140px] w-full md:h-[200px]">
									<Image
										src={item.image}
										alt={item.title}
										fill
										className="size-full object-cover"
										priority
									/>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
			<div
				className="min-h-fit overflow-hidden !bg-cover bg-no-repeat"
				style={{ background: "url('/assets/bg_offer_sec.png')" }}>
				<div className="left-0 top-0 z-10 size-full bg-[rgba(87,77,77,0.8)]">
					<div className="grid place-content-center px-1 py-2 text-white md:py-5">
						<Link
							href="/"
							className="mx-auto py-3 md:py-5">
							<LogoChiqueBouttiqueWhite />
						</Link>
						<p className="text-center font-[Din-Next-bold,sans-serif] text-lg font-semibold capitalize md:text-2xl ">
							<span className="font-[Din-Next-bold,sans-serif] font-bold text-[red]">chique bouttique</span> The best offers on clothing
							collections through our online store
						</p>
					</div>
					<div className="grid grid-cols-3 gap-2 px-2 py-4 text-center text-sm md:container sm:p-10 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
						{socialLinks
							.filter((item) => item.href !== "")
							.map((item) => {
								return (
									<Link
										key={item.id}
										href={item.href}
										target="_blank"
										className="group grid min-w-full place-content-center rounded-xl bg-white p-2 transition-all duration-300 ease-in-out hover:translate-y-[-5px] md:p-5">
										<span className="mx-auto grid size-8 place-content-center overflow-hidden rounded-full bg-black md:size-14">
											{item.icon}
										</span>
										<span className="text-xs text-primary md:text-lg">{item.name}</span>
									</Link>
								);
							})}
					</div>
				</div>
			</div>
			<footer className="flex w-full flex-col items-center justify-between p-5 md:flex-row md:gap-5">
				<h1 className="text-sm font-[400] text-primary md:text-lg">
					All Rights Reserved to <span className="font-[700]">chiquebouttique</span> @ 2024
				</h1>

				<div className="flex items-center gap-3">
					<p className="text-sm font-[400] text-primary">{"Developed by"}</p>
					<Image
						src={icons.technoraft}
						alt="technoraft"
						width={95}
						height={30}
						priority
					/>
				</div>
			</footer>
		</>
	);
};

export default QrWrapper;
