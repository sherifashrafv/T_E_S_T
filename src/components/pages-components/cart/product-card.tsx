"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CartItemsProps } from "@/types";
import { useDeleteOrderMutation } from "@/hooks/cart/use-cart-mutation-hooks";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useAddToCartMutation } from "@/hooks/root/use-root-mutation";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Check, Loader2Icon, Minus, Plus, X } from "lucide-react";

type Props = {
	fromDetails?: boolean;
	inRate?: boolean;
	fromReturn?: boolean;
	selected?: boolean;
	productsCount?: any;
	product: CartItemsProps;
	handleProductCount?: (id: number, count: number) => void;
	refetch: () => void;
	selectProduct?: () => void;
};

const CartProductCard = ({
	inRate,
	fromDetails,
	fromReturn,
	productsCount,
	product,
	selected,
	refetch,
	selectProduct,
	handleProductCount,
}: Props) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const { mutate, isPending } = useDeleteOrderMutation({
		resetFunction: () => {
			router.refresh();
			refetch();
		},
	});

	const { mutate: mutateAddToCart, isPending: isPendingAddToCart } = useAddToCartMutation({
		resetFunction: () => {
			router.refresh();
			refetch();
		},
	});

	return (
		<div
			className={`flex min-h-[128px] w-full items-start rounded border border-border p-2 sm:p-4 ${selected ? "border-primary" : ""} ${fromReturn ? "cursor-pointer" : ""}`}
			onClick={() => fromReturn && selectProduct?.()}>
			<div className="flex w-full items-center gap-3 md:gap-5">
				<Image
					src={product.product_image}
					alt={product.product_name}
					width={80}
					height={108}
					priority
					className="h-[108px] w-[80px] rounded-md object-cover"
				/>
				<div className="flex w-full flex-wrap items-start justify-between gap-2 md:items-center">
					<div className="flex flex-col gap-4">
						<h2 className="text-sm font-[700] text-primary md:text-lg">{product.product_name}</h2>
						<div className="flex items-center justify-center gap-3 text-secondary-gray">
							<div className="flex items-center gap-2">
								<h4 className="text-sm font-[400] text-primary">{isRTL ? "اللون" : "Color"}: </h4>
								<div
									className="size-[20px] rounded-full border border-border"
									style={{ backgroundColor: product.color }}
								/>
							</div>
							|
							<div className="flex items-center gap-2">
								<h4 className="text-sm font-[400] text-primary">{isRTL ? "المقاس" : "Size"}: </h4>
								<span className="text-sm font-[400] text-primary">{product.size}</span>
							</div>
						</div>
						{fromReturn && (
							<div
								className="flex h-[30px] w-full cursor-default items-center justify-between gap-[10px] rounded border px-2"
								onClick={() => {}}>
								<Minus
									size={16}
									className={`${productsCount?.[product.product_id] === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
									onClick={() =>
										productsCount?.[product.product_id] === 1
											? null
											: handleProductCount?.(product.product_id, (productsCount?.[product.product_id] || 0) - 1)
									}
								/>
								<span className="text-[16px] font-[400] leading-[24px] text-primary">
									{isPendingAddToCart ? <Loader2Icon className="animate-spin" /> : productsCount?.[product.product_id] || 0}
								</span>
								<Plus
									size={16}
									className={`${productsCount?.[product.product_id] === product.quantity ? "cursor-not-allowed" : "cursor-pointer"}`}
									onClick={
										productsCount?.[product.product_id] === product.quantity
											? () => {}
											: () => handleProductCount?.(product.product_id, (productsCount?.[product.product_id] || 0) + 1)
									}
								/>
							</div>
						)}
					</div>

					{inRate ? null : fromDetails ? (
						<div className="flex items-center gap-3 md:flex-col">
							{fromReturn && (
								<div
									className="flex size-[20px] cursor-pointer items-center justify-center rounded-full border border-primary"
									onClick={() => selectProduct?.()}>
									{selected ? (
										<Check
											size={10}
											className="text-primary"
										/>
									) : null}
								</div>
							)}
							<div className="rounded border border-border px-2 py-1">
								<span className="text-sm font-[400] text-primary">
									{isRTL ? "الكمية :" : "Qty :"}
									{product.quantity}
								</span>
							</div>
							<h5 className="text-lg font-[700] text-primary">${product.price}</h5>
						</div>
					) : (
						<div className="flex items-center gap-2 md:gap-3">
							<h5 className="text-sm font-[700] text-primary">${product.price}</h5>
							<div className="flex h-[30px] w-[84px] items-center justify-center gap-[10px] rounded border md:h-[40px] md:w-[94px]">
								<Minus
									size={16}
									className="cursor-pointer"
									onClick={() => {
										mutateAddToCart({
											id: product.size_id,
											quantity: product.quantity - 1,
											all_quantity: 1,
										});
									}}
								/>
								<span className="text-[16px] font-[400] leading-[24px] text-primary">
									{isPendingAddToCart ? <Loader2Icon className="animate-spin" /> : product.quantity}
								</span>
								<Plus
									size={16}
									className="cursor-pointer"
									onClick={() => {
										mutateAddToCart({
											id: product.size_id,
											quantity: product.quantity + 1,
											all_quantity: 1,
										});
									}}
								/>
							</div>
							<LoadingButton
								isLoading={isPending}
								onClick={() => mutate({ id: product.id })}
								variant={"secondary"}
								size={"icon"}>
								<X
									size={17}
									color="red"
								/>
							</LoadingButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartProductCard;
