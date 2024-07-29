"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useOrderDetailsQuery } from "@/hooks/profile/use-profile-hooks";
import CartHeader from "@/components/shared/cart-header";
import OrderCard from "@/components/shared/order-card";
import CartProductCard from "../cart/product-card";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useMakeReturnMutation } from "@/hooks/profile/use-profile-mutation-hooks";

const RerurnDetails = ({ lang, detailsId, fromReturnDetails }: { lang: string; detailsId: number; fromReturnDetails?: boolean }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const router = useRouter();

	if (!detailsId) redirect(fromReturnDetails ? `/${lang}/return-orders` : `/${lang}/my-orders`);
	const { data: orderDetails, isFetching } = useOrderDetailsQuery({ id: detailsId as number, inReturn: !!fromReturnDetails });

	const [products, setProducts] = React.useState<any[]>([]);
	const [productsCount, setProductsCount] = React.useState<any>({});
	const [reason, setReason] = React.useState(orderDetails?.data?.reason);

	const handleProductSelection = (product: any) => {
		const selectedProduct = {
			id: product.product_id,
			item_id: product.id,
			quantity: productsCount[product.id] || 1,
		};

		if (products.some((p) => p.item_id === product.id)) {
			setProducts(products.filter((p) => p.item_id !== product.id));
		} else {
			setProducts([...products, selectedProduct]);
		}
	};
	const handleProductCount = (id: number, count: number) => {
		setProductsCount({ ...productsCount, [id]: count });
	};

	const { mutate, isPending } = useMakeReturnMutation({
		resetFunction: () => {
			setProducts([]);
			setReason("");
			router.replace(`/${lang}/return-orders`);
		},
	});

	return (
		<div className="w-full">
			{isFetching ? (
				<div className="flex w-full items-center justify-center">
					<Loader2Icon className="animate-spin" />
				</div>
			) : (
				<div className="flex w-full flex-col items-start gap-5">
					<div className="flex w-full flex-col gap-4">
						<CartHeader title={isRTL ? "تفاصيل الطلب المرتجع" : "Return Details"} />
						<OrderCard
							btnText={orderDetails?.data?.status}
							item={orderDetails?.data}
							fromReturnDetails
						/>
					</div>
					<div className="flex w-full flex-col gap-5">
						<CartHeader title={isRTL ? "المنتجات" : "Products"} />
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
							{orderDetails?.data?.items?.map((product: any) => {
								const selectedProduct = products.some((p) => p.item_id === product.id);
								return (
									<CartProductCard
										fromDetails
										fromReturn={!fromReturnDetails}
										selected={selectedProduct}
										productsCount={productsCount}
										selectProduct={() => handleProductSelection(product)}
										handleProductCount={(id: number, count: number) => handleProductCount(id, count)}
										key={product.id}
										product={product}
										refetch={() => {}}
									/>
								);
							})}
						</div>
					</div>
					<div className="flex w-full flex-col gap-3">
						<label
							htmlFor="reason"
							className="text-sm font-medium leading-none">
							{isRTL ? "اذكر سبب الارجاع" : "Mention return reason"}
						</label>
						<Textarea
							rows={4}
							disabled={fromReturnDetails}
							className="w-full resize-none"
							id="reason"
							value={reason}
							onChange={(e) => setReason(e.target.value)}
						/>
					</div>

					{!fromReturnDetails && orderDetails?.data?.day_returns === true && (
						<LoadingButton
							isLoading={isPending}
							onClick={() => {
								mutate({
									order: orderDetails?.data?.id,
									reason,
									products,
								});
							}}
							disabled={reason === "" || products.length === 0}
							variant={"default"}
							className="h-[50px] w-full bg-primary md:w-[200px]">
							{isRTL ? "تأكيد إرجاع المنتجات" : "Confirm"}
						</LoadingButton>
					)}
				</div>
			)}
		</div>
	);
};

export default RerurnDetails;
