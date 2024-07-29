"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { icons } from "@/constants";
import { ProductProps } from "@/types";
import { useFavouriteMutation } from "@/hooks/root/use-root-mutation";
import { Loader2Icon } from "lucide-react";

const ProductCard = ({
	refetch = () => {},
	item,
}: {
	refetch?: Function;
	item: ProductProps;
}) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const token = getCookiesClientSide("token");

	const { mutate, isPending } = useFavouriteMutation({
		resetFunction: () => {
			router.refresh();

			refetch();
		},
	});
	const handleFavourite = () => {
		if (!token) {
			router.push(`/${isRTL ? "ar" : "en"}/sign-in`);
			toast.error(
				`${isRTL ? "يرجى تسجيل الدخول أو التسجيل لإضافة المنتج الى المفضلة" : "Please Login or register to add product to favourite"}`
			);
		} else {
			mutate({
				product_id: item.price_offer ? item.product_id : item.id,
			});
		}
	};

	return (
		<div className="relative flex flex-col gap-3">
			<Link
				href={`/${isRTL ? "ar" : "en"}/store/${item.price_offer ? item.product_id : item.id}/${item.name}`}
			>
				<div className="relative aspect-[5/7] w-full overflow-hidden">
					<Image
						src={item.image}
						alt={item.name}
						fill
						loading="lazy"
						className="rounded-md object-cover"
					/>
					<div className="flex items-center gap-1">
						{item.price_offer && (
							<div className="absolute bottom-2 right-1 w-fit rounded bg-[#D4424C] px-[0.20rem] sm:right-2 sm:p-2">
								<span className="text-[11px] text-white sm:text-sm">
									{isRTL && "%"}
									{item.ratio}
									{!isRTL && "%"} {isRTL ? "خصم" : "Off"}
								</span>
							</div>
						)}
						{!item.is_available && (
							<div className="absolute bottom-2 left-1 w-fit rounded bg-[#D4424C] px-[0.20rem] py-1 sm:left-2 sm:p-2">
								<h1 className="text-[11px] text-white sm:text-sm">
									{isRTL ? "غير متوفر" : "Out of Stock"}
								</h1>
							</div>
						)}
					</div>
				</div>
			</Link>

			<div className="flex flex-col gap-1">
				<div className="flex justify-between">
					<Link
						href={`/${isRTL ? "ar" : "en"}/store/${item.price_offer ? item.product_id : item.id}/${item.name}`}
					>
						<h2 className="max-w-[150px] truncate text-[13px] font-[700] leading-[24px] text-primary md:text-[16px]">
							{item.name || item?.product_name}
						</h2>
					</Link>
					{isPending ? (
						<Loader2Icon className="animate-spin" />
					) : (
						<Image
							onClick={handleFavourite}
							src={
								item.is_favoured ? icons.heartBlod : icons.heart
							}
							alt="heart"
							width={16}
							height={16}
							loading="lazy"
							className="cursor-pointer"
						/>
					)}
				</div>
				<Link
					href={`/${isRTL ? "ar" : "en"}/store/${item.price_offer ? item.product_id : item.id}/${item.name}`}
				>
					<div>
						{item.price_offer && (
							<p className="text-[12px] font-[400] leading-[22px] text-primary line-through">
								{item.price} {item.currency}
							</p>
						)}
						<p className="text-[16px] font-[700] leading-[22px] text-primary">
							{item.price_offer
								? item.price_offer
								: item.total_from}{" "}
							{item.currency}
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ProductCard;
