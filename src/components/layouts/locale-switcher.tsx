"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { icons, images } from "@/constants";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { MenuItems as MenuItemsType } from "@/types";
import AfterLoginDropdown from "./after-login-dropdown";

import { CircleUser, Globe } from "lucide-react";
import { i18n } from "@/config/i18n.config";
import { getCookiesClientSide, setCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useQueryParams } from "@/utils/Functions/use-query-params";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import OrderSheet from "./order-sheet";
import GlobalSearch from "./global-search";
import GlobalDropdown from "../shared/drop-down";

type Props = {
	MenuItems: MenuItemsType[];
	lang: string;
};

export default function LocaleSwitcher({ MenuItems, lang }: Props) {
	const { category, price, show } = useQueryParams();
	const user: any = JSON.parse(getCookiesClientSide("user")! || "{}");
	const momizedMenuItems = useMemo(() => MenuItems, [MenuItems]);
	const [isOpen, setIsOpen] = React.useState(false);

	const router = useRouter();
	const pathName = usePathname();
	const { data, refetch } = useCartOrdersQuery();

	const redirectTo = (locale: string) => {
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
		<div className="order-1 flex items-center justify-center gap-[24px]">
			<GlobalSearch lang={lang} />

			<div className="flex items-center gap-2 md:gap-3">
				<GlobalSearch
					lang={lang}
					inMobile
				/>
				<div
					className="relative size-[20px]"
					onClick={() => (user?.id ? setIsOpen(!isOpen) : router.push(`/${lang}/sign-in`))}>
					<Image
						src={icons.cart}
						alt="cart"
						fill
						className="cursor-pointer object-center"
						priority
					/>
					{user?.id
						? data?.data?.order?.items_count > 0 && (
								<div className="absolute -right-2 -top-2 flex size-[15px] items-center justify-center rounded-full bg-primary text-[10px] text-white">
									{data?.data?.order?.products_count}
								</div>
							)
						: null}
				</div>
				<OrderSheet
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					orderData={data?.data?.order}
					refetch={refetch}
				/>

				{!Object.keys(user).length ? (
					<Link href={`/${lang}/sign-in`}>
						<CircleUser
							strokeWidth={1.5}
							className="size-[19px] cursor-pointer"
						/>
					</Link>
				) : (
					<AfterLoginDropdown MenuItems={momizedMenuItems} />
				)}
				<div className="hidden md:block">
					<GlobalDropdown
						className="w-52"
						triggerChildren={
							<Globe
								size={18}
								strokeWidth={1.5}
								className="cursor-pointer"
							/>
						}>
						{i18n.locales.map((locale) => {
							return (
								<DropdownMenuItem
									key={locale}
									className={`${lang === locale && "z-50 bg-primary text-white hover:bg-primary"}`}>
									<Link
										href={redirectTo(locale)}
										onClick={() => setCookiesClientSide("NEXT_LOCALE", locale)}
										className={`z-[99999] flex w-full items-center  ${lang === "en" ? "justify-start" : "justify-end"} gap-2`}>
										<Image
											src={locale === "en" ? images.en : images.ar}
											alt="arabic"
											width={18}
											height={18}
											priority
											className={`${lang === "ar" && "z-[99999] order-2 "} size-[18px]`}
										/>
										{locale === "en" ? (lang === "en" ? "English" : "انجليزي") : lang === "en" ? "Arabic" : "عربي"}
									</Link>
								</DropdownMenuItem>
							);
						})}
					</GlobalDropdown>
				</div>
			</div>
		</div>
	);
}
