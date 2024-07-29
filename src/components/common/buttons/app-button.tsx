"use client";

import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

import AppleIcon from "@/assets/icons/apple-icon";

type Props = {
	img: string;
	text: string;
	href: string;
	bg: "primary" | "white";
	animation: "to-white" | "to-black";
	useComponent?: boolean;
	title?: string;
	inFooter?: boolean;
};

const AppButton = ({
	img,
	text,
	href,
	bg,
	animation,
	useComponent,
	title,
}: Props) => {
	return (
		<Link
			href={href}
			dir="ltr"
			target="_blank"
			className={`flex w-full items-center justify-center gap-1 rounded-md md:w-fit ${bg === "white" ? "bg-white text-primary" : "bg-primary text-white"} transition-colors duration-200 ${animation === "to-white" ? "hover:bg-white hover:text-primary" : "hover:bg-primary hover:text-white"} group px-3 py-1 md:px-5`}
		>
			{useComponent ? (
				<AppleIcon
					fill={bg === "white" ? "black" : "white"}
					className={
						animation === "to-white"
							? "group-hover:fill-primary"
							: "group-hover:fill-white"
					}
				/>
			) : (
				<div className="relative w-5 h-5 md:w-7 md:h-7">
					<Image
						src={img}
						alt="icon"
						layout="fill"
						objectFit="contain"
						priority
					/>
				</div>
			)}
			<div className="flex w-full flex-col gap-0">
				<p className="m-0 p-0 text-[10px] font-[400] text-inherit md:text-[12px]">
					{title}
				</p>
				<p className="text-sm font-[700] text-inherit md:text-lg">
					{text}
				</p>
			</div>
		</Link>
	);
};

export default memo(AppButton);
