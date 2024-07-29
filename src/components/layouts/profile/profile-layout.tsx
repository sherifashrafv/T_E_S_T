"use client";

import React from "react";

import { icons } from "@/constants";
import SideItems from "./side-item";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import MobileDropdown from "./mobile-dropdown";

const ProfileLayout = ({ active, children }: { active: string; children: React.ReactNode }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const ProfileLinks = [
		{ id: 1, name: isRTL ? "إعدادات الحساب" : "Account Settings", href: `/${isRTL ? "ar" : "en"}/profile`, icon: icons.user, active },
		{ id: 2, name: isRTL ? "طلباتي" : "My Orders", href: `/${isRTL ? "ar" : "en"}/my-orders`, icon: icons.cart, active },
		{ id: 3, name: isRTL ? "سجل الطلبات المرتجع" : "Return Orders", href: `/${isRTL ? "ar" : "en"}/return-orders`, icon: icons.rCart, active },
		{
			id: 4,
			name: isRTL ? "عناوين التوصيل" : "Delivery Addresses",
			href: `/${isRTL ? "ar" : "en"}/delivery-address`,
			icon: icons.delivery,
			active,
		},
		{ id: 5, name: isRTL ? "المنتجات المفضلة" : "Favorite Products", href: `/${isRTL ? "ar" : "en"}/favourites`, icon: icons.bHeart, active },
		{ id: 6, name: isRTL ? "محفظتي" : "My Wallet", href: `/${isRTL ? "ar" : "en"}/my-wallet`, icon: icons.wallet, active },
		{ id: 7, name: isRTL ? "نقاط الولاء" : "Loyalty Points", href: `/${isRTL ? "ar" : "en"}/loyalty-points`, icon: icons.point, active },
		{ id: 8, name: isRTL ? "كوبونات الخصم" : "Discount Coupons", href: `/${isRTL ? "ar" : "en"}/discount-coupons`, icon: icons.bTicket, active },
		{ id: 9, name: isRTL ? "تسجيل الخروج" : "Signout", href: "", icon: icons.logout, active, logout: true },
	];

	return (
		<div className="container flex flex-col items-start justify-center py-[50px] md:flex-row lg:py-[100px]">
			<div
				className={`hidden size-full max-h-[440px] w-full max-w-[252px] flex-col gap-3 md:flex ${isRTL ? "border-l-2 border-l-border pl-[30px]" : "border-r-2 border-r-border pr-[30px]"}`}>
				{ProfileLinks.map((item) => {
					return (
						<SideItems
							key={item.id}
							item={item}
						/>
					);
				})}
			</div>
			<MobileDropdown MenuItems={ProfileLinks} />
			<div className={`w-full max-w-[877px] ${isRTL ? "md:pr-[30px]" : "md:pl-[30px]"}`}>{children}</div>
		</div>
	);
};

export default ProfileLayout;
