"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CartHeader from "./cart-header";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Input } from "../ui/input";
import { icons } from "@/constants";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import Loading from "./loading";
import { useDetailsIdStore, useOrderSummaryStore, useOrderTypeStore } from "@/store";
import { useCheckCouponMutation, useCheckoutMutation } from "@/hooks/cart/use-cart-mutation-hooks";
import LoadingButton from "../common/buttons/loading-button";
import { RequestShippingFees } from "@/components/pages-components/choose-address/request-shipping-fees";
import { toast } from "sonner";

const OrderSummary = ({ href, inPayment, inAddress }: { href: string; inPayment?: boolean; inAddress?: boolean }) => {
	const { grandTotal, shippingFeesValue, couponValue, couponCode, walletValue, setGrandTotal, setWalletValue, setItems, setPrice, setTax } =
		useOrderSummaryStore();
	const { addressId, code, orderNote, orderType, paymentMethod, paymentType, setClientSecret } = useOrderTypeStore();
	const { setDetailsId } = useDetailsIdStore();
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [openReqFees, setOpenReqFees] = React.useState(false);
	const [copune, setCopune] = React.useState("");

	const { mutate, isPending: isCheckoutPending } = useCheckoutMutation({
		resetFunction: (response: any) => {
			if (response?.data?.payment_url?.client_secret) {
				setClientSecret(response?.data?.payment_url?.client_secret);
				router.push(href);
			}
			if (response?.data) {
				toast.success(isRTL ? "تم الطلب بنجاح" : "Order Placed Successfully");
				setDetailsId(response?.data?.order?.id);
				router.replace(`/${isRTL ? "ar" : "en"}/tracking`);
			}
		},
	});

	const { data, isPending } = useCartOrdersQuery();
	const { mutate: checkCoupon, isPending: isCouponPending } = useCheckCouponMutation({
		resetFunction: () => {
			setCopune("");
		},
	});

	useEffect(() => {
		if (!isPending) {
			setItems(data?.data?.order?.items_count);
			setTax(data?.data?.order?.tex);
			setPrice(data?.data?.order?.sub_total);
			const totalAfterWallet = data?.data?.order?.grand_total - data?.data?.wallet;
			setGrandTotal(totalAfterWallet > 0 ? totalAfterWallet : 0);
			setWalletValue(data?.data?.wallet);
		}
	}, [data, isPending, setGrandTotal, setItems, setPrice, setTax, setWalletValue]);

	if (isPending) return <Loading />;

	// rFE3epefwl
	return (
		<div className="w-full max-w-[336px] rounded-md border border-border px-5 py-8">
			<CartHeader title={isRTL ? "ملخص الطلب" : "Order Summary"} />
			<div className="flex flex-col items-start justify-center gap-1 border-b border-b-border pt-5">
				<label
					htmlFor="copune"
					className="px-2 text-[15px] font-[600] text-primary">
					{isRTL ? "هل لديك كوبون خصم ؟" : "Do you have a coupon?"}
				</label>
				<div className={`relative flex w-full items-center`}>
					<Input
						className="w-full border-none outline-none focus-within:border-none hover:border-none focus:border-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-inset focus-visible:ring-transparent"
						id="copune"
						placeholder={isRTL ? "ادخل كوبون الخصم" : "Enter Discount coupon"}
						value={couponCode || copune}
						onChange={(e) => setCopune(e.target.value)}
					/>
					{copune ? (
						<LoadingButton
							disabled={couponValue !== 0}
							onClick={() => {
								checkCoupon({
									code: copune,
									products:
										data?.data?.order?.items?.map((item: any) => {
											return {
												id: item.product_id,
												size: item.size_id,
												quantity: item.quantity,
												color: item.color_id,
												price: item.price,
											};
										}) || [],
								});
							}}
							isLoading={isCouponPending}
							className="h-[30px]">
							{isRTL ? "تطبيق" : "Apply"}
						</LoadingButton>
					) : (
						<Image
							src={icons.copune}
							alt="copune"
							width={24}
							height={24}
							priority
							className={`absolute ${isRTL ? "left-3" : "right-3"}`}
						/>
					)}
				</div>
			</div>
			<div className="flex flex-col items-start justify-center gap-7 border-b border-b-border py-5">
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "عدد المنتجات :" : "Number of items :"}</h3>
					<span className="text-sm font-[600] text-primary">{data?.data?.order?.items_count}</span>
				</div>
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "سعر المنتجات :" : "Price :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{data?.data?.order?.sub_total} {data?.data?.order?.currency}
					</span>
				</div>
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "قيمة كوبون الخصم :" : "Discount coupon value :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{couponValue} {data?.data?.order?.currency}
					</span>
				</div>
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "قيمة المحفظة :" : "Wallet value :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{walletValue} {data?.data?.order?.currency}
					</span>
				</div>
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "الضريبة : " : "Tax :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{data?.data?.order?.tex} {data?.data?.order?.currency}
					</span>
				</div>
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[400] text-primary">{isRTL ? "تكلفة الشحن : " : "shipping fees :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{shippingFeesValue} {typeof shippingFeesValue === "string" ? "" : data?.data?.order?.currency}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-start justify-center gap-5 pt-5">
				<div className="flex w-full items-center justify-between">
					<h3 className="text-sm font-[700] text-primary">{isRTL ? "السعر الكلي :" : "Total Price :"}</h3>
					<span className="text-sm font-[600] text-primary">
						{grandTotal} {data?.data?.order?.currency}
					</span>
				</div>
				{inPayment ? (
					<></>
				) : inAddress ? (
					<LoadingButton
						onClick={
							typeof shippingFeesValue === "string"
								? () => setOpenReqFees(true)
								: () => {
										mutate({
											address_id: addressId,
											code,
											order_gift_note: orderNote,
											order_type: orderType,
											payment_method: paymentMethod,
											payment_type: paymentType,
											shipping_fees: shippingFeesValue,
										});
									}
						}
						isLoading={isCheckoutPending}
						className="w-full"
						disabled={!addressId && inAddress ? true : data?.data?.items?.length === 0}>
						{isRTL ? "المتابعة لإتمام الطلب" : "Continue to Checkout"}
					</LoadingButton>
				) : (
					<Link
						href={data?.data?.items?.length === 0 ? "" : href}
						className="w-full">
						<LoadingButton
							isLoading={isCheckoutPending}
							className="w-full"
							disabled={!addressId && inAddress ? true : data?.data?.items?.length === 0}>
							{isRTL ? "المتابعة لإتمام الطلب" : "Continue to Checkout"}
						</LoadingButton>
					</Link>
				)}
				<p className="text-center text-sm font-[400] text-primary">
					{isRTL
						? "سيتم حساب مصاريف الشحن، الضرائب، و الخصم عند إتمام الطلب"
						: "Shipping costs, taxes, and discounts will be calculated upon checkout."}
				</p>
			</div>

			<RequestShippingFees
				isOpen={openReqFees}
				setIsOpen={setOpenReqFees}
			/>
		</div>
	);
};

export default OrderSummary;
