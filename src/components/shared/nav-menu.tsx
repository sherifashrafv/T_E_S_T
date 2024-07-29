"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useCategoriesStore } from "@/store";
import { useCategoriesQuery } from "@/hooks/root/use-root-hooks";

export function NavigationMenuDemo({ closeMenu = () => {} }) {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const pathname = usePathname();

	const isActive = pathname === `/${isRTL ? "ar" : "en"}/store` || pathname.startsWith(`/${isRTL ? "ar" : "en"}/store/`);

	const { data } = useCategoriesQuery();
	const { categories } = useCategoriesStore();
	const allCategories = categories?.length > 0 ? categories : data?.data?.items;

	return (
		<NavigationMenu
			dir={isRTL ? "rtl" : "ltr"}
			className={`${isActive ? "bg-primary text-white md:bg-transparent md:text-primary" : ""}`}>
			<NavigationMenuList dir={isRTL ? "rtl" : "ltr"}>
				<NavigationMenuItem>
					<Link href={`/${isRTL ? "ar" : "en"}/store?category=all`}>
						<NavigationMenuTrigger className={cn(`focus-visible:border-none focus-visible:outline-none ${isActive ? "font-[700]" : ""}`)}>
							{isRTL ? "المتجر" : "Store"}
						</NavigationMenuTrigger>
					</Link>

					<NavigationMenuContent>
						<ul className="grid w-[90%] gap-0 p-4 md:w-[500px] md:grid-cols-2 md:gap-3 lg:w-[600px] ">
							{allCategories?.map((component: any) => (
								<ListItem
									key={component.name}
									title={component.name}
									onClick={closeMenu}
									href={`/${isRTL ? "ar" : "en"}/store?category=${component.id}`}>
									<div className="flex items-center justify-start gap-3">
										<Image
											src={component.image}
											alt={component.name}
											width={40}
											height={40}
											priority
											className="size-10 object-cover"
										/>
										<div>
											<h3 className="text-sm font-medium">{component.name}</h3>
											<p className="text-sm text-muted-foreground">{component.description || ""}</p>
										</div>
									</div>
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, React.ComponentPropsWithoutRef<typeof Link>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}>
						{children}
					</Link>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
