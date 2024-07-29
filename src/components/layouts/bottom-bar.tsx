"use client";

import Link from "next/link";
import React from "react";

import { Grid3X3, HeartIcon, Home, StoreIcon, UserCircleIcon } from "lucide-react";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import Image from "next/image";
import { Sheet, SheetContent } from "../ui/sheet";
import { useCategoriesStore } from "@/store";
import { useCategoriesQuery } from "@/hooks/root/use-root-hooks";

const BottomBar = ({ lang }: { lang: string }) => {
	const isRTL = lang === "ar";
	const user = JSON.parse(getCookiesClientSide("user") || "{}");

	const [open, setOpen] = React.useState(false);
	const isLoggedin = Object.keys(user).length > 0;

	const bottomArray = [
		{ id: 0, name: isRTL ? "الرئيسية" : "Home", href: `/${lang}`, Icon: Home },
		{ id: 1, name: isRTL ? "المتجر" : "Store", href: `/${lang}/store?category=all`, Icon: StoreIcon },
		{ id: 2, name: isRTL ? "التصنيفات" : "Categories", href: "", Icon: Grid3X3, isBtn: true },
		{ id: 3, name: isRTL ? "حسابي" : "My Account", href: !isLoggedin ? `/${lang}/sign-in` : `/${lang}/profile`, Icon: UserCircleIcon },
		{ id: 4, name: isRTL ? "المفضلة" : "Favorites", href: !isLoggedin ? `/${lang}/sign-in` : `/${lang}/favourites`, Icon: HeartIcon },
	];

	const { data } = useCategoriesQuery();
	const { categories } = useCategoriesStore();
	const allCategories = categories?.length > 0 ? categories : data?.data?.items;

	return (
		<>
			<div className="fixed bottom-0 left-0 z-50 block h-[70px] w-full border-t border-t-border bg-background shadow-md md:hidden">
				<div className="flex size-full items-center justify-evenly">
					{bottomArray.map(({ id, name, href, Icon, isBtn }) => {
						return isBtn ? (
							<div
								key={id}
								onClick={() => setOpen(true)}
								className="cursor-pointer">
								<Icon
									className="mx-auto size-5"
									strokeWidth={1}
								/>
								<span className="text-[13px] font-[400]">{name}</span>
							</div>
						) : (
							<Link
								key={id}
								href={`${href}`}>
								<Icon
									className="mx-auto size-5"
									strokeWidth={1}
								/>
								<span className="text-[13px] font-[400]">{name}</span>
							</Link>
						);
					})}
				</div>
				<Sheet
					open={open}
					onOpenChange={setOpen}>
					<SheetContent
						side="bottom"
						className="flex h-[500px] flex-col items-start justify-start gap-4">
						{allCategories?.map((component: any) => {
							return (
								<Link
									href={`/${isRTL ? "ar" : "en"}/store?category=${component.id}`}
									key={component.name}
									onClick={() => setOpen(false)}
									className="flex items-center justify-start gap-3">
									<Image
										src={component.image}
										alt={component.name}
										width={40}
										height={40}
										className="size-10 object-cover"
									/>
									<div>
										<h3 className="text-sm font-medium">{component.name}</h3>
										<p className="text-sm text-muted-foreground">{component.description || ""}</p>
									</div>
								</Link>
							);
						})}
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
};

export default BottomBar;
