"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CartProps } from "@/types";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import CartProductCard from "../pages-components/cart/product-card";
import { Button } from "../ui/button";
import { icons } from "@/constants";
import Empty from "../shared/empty";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	orderData: CartProps;
	refetch: () => void;
};

const OrderSheet = ({ isOpen, setIsOpen, orderData, refetch }: Props) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<Sheet
			open={isOpen}
			onOpenChange={setIsOpen}>
			<SheetContent
				side={isRTL ? "right" : "left"}
				className="z-50 h-full w-[90%] overflow-y-auto pb-3">
				<SheetHeader className="mt-10">
					<div className="flex w-full items-center justify-between border-b border-b-border pb-5">
						<h2 className="text-lg font-medium leading-6">{isRTL ? "تفاصيل الطلب" : "Order Details"}</h2>
						<span className="flex size-[20px] items-center justify-center rounded-full bg-primary text-xs text-white">
							{orderData?.items_count || 0}
						</span>
					</div>
				</SheetHeader>
				<div className="mt-5 flex w-full flex-col gap-5 border-b border-b-border pb-5">
					{!orderData?.items_count ? (
						<Empty />
					) : (
						orderData?.items?.map((item) => {
							return (
								<CartProductCard
									key={item.id}
									product={item}
									refetch={refetch}
								/>
							);
						})
					)}
				</div>

				{orderData?.items_count && (
					<div className="mt-5 flex items-center justify-center gap-3">
						<Button
							className="flex w-full items-center justify-center gap-2"
							onClick={() => {
								router.push(`/${isRTL ? "ar" : "en"}/choose-address`);
								setIsOpen(false);
							}}
							variant={"default"}>
							{isRTL ? "الدفع" : "Checkout"}
						</Button>
						<Button
							className="flex w-full items-center justify-center gap-2"
							onClick={() => {
								router.push(`/${isRTL ? "ar" : "en"}/cart`);
								setIsOpen(false);
							}}
							variant={"outline"}>
							<div className="relative size-[20px]">
								<Image
									src={icons.cart}
									alt="cart"
									fill
									className="cursor-pointer object-center"
									priority
								/>
							</div>
							{isRTL ? "عرض السلة" : "View Cart"}
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default OrderSheet;
