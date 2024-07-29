"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { NavigationMenuDemo } from "../shared/nav-menu";

type NavigationLinksProps = {
	Links: {
		id: number;
		name: string;
		href: string;
	}[];
	inMobile?: boolean;
	closeMenu?: () => void;
};

const NavigationLinks = ({ Links, inMobile, closeMenu = () => {} }: NavigationLinksProps) => {
	const pathname = usePathname();

	return (
		<div className={`${inMobile ? "w-full flex-col gap-[8px] pt-8" : "flex-row"} flex items-center justify-center gap-[24px]`}>
			{Links?.slice(0, 2).map(({ id, name, href }) => {
				const isActive = pathname === href || pathname.startsWith(`/${href}/`);

				return (
					<Link
						key={id}
						href={href}
						onClick={closeMenu}
						className={`w-full lg:w-fit ${isActive && inMobile ? "rounded-md bg-primary p-2 font-[700] text-white" : isActive && !inMobile ? "font-[700]" : "font-[400]"} text-[14px] leading-[24px] text-primary ${inMobile ? "rounded-md p-2 hover:bg-primary hover:text-white" : "hover:font-[700]"}`}>
						{name}
					</Link>
				);
			})}
			<NavigationMenuDemo closeMenu={closeMenu} />
			{Links?.slice(3).map(({ id, name, href }) => {
				const isActive = pathname === href || pathname.startsWith(`${href}/`);

				return (
					<Link
						key={id}
						href={href}
						onClick={closeMenu}
						className={`w-full lg:w-fit ${isActive && inMobile ? "rounded-md bg-primary p-2 font-[700] text-white" : isActive && !inMobile ? "font-[700]" : "font-[400]"} text-[14px] leading-[24px] text-primary ${inMobile ? "rounded-md p-2 hover:bg-primary hover:text-white" : "hover:font-[700]"}`}>
						{name}
					</Link>
				);
			})}
		</div>
	);
};

export default NavigationLinks;
