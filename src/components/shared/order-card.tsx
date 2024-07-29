"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "../ui/button";
import { OrdersProps } from "@/types";
import { Modal } from "../common/modals/modal";
import CancelForm from "../pages-components/my-orders/cancel-form";
import { useConfirmOrderMutation, useReOrderMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import LoadingButton from "../common/buttons/loading-button";
import { useDetailsIdStore, useOrderTypeStore } from "@/store";
import RateOrderForm from "../pages-components/my-orders/rate-order-form";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import ConfirmModal from "../pages-components/my-orders/confirm-modal/confirm-modal";

type Props = {
	item: OrdersProps;
	btnText: string;
	inReview?: boolean;
	confirmOrder?: boolean;
	fromReturn?: boolean;
	fromReturnDetails?: boolean;
	inCurrent?: boolean;
	inReturn?: boolean;
	inPast?: boolean;
	inDelevered?: boolean;
	refetch?: () => void;
};

const OrderCard = ({
	item,
	btnText,
	inReview,
	confirmOrder,
	fromReturn,
	fromReturnDetails,
	inReturn,
	inCurrent,
	inPast,
	inDelevered,
	refetch,
}: Props) => {
	const { setDetailsId } = useDetailsIdStore();
	const { setClientSecret } = useOrderTypeStore();
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [cancelModal, setCancelModal] = React.useState(false);
	const [confirmModal, setConfirmModal] = React.useState(false);
	const [rateModal, setRateModal] = React.useState(false);

	const { refetch: getCart } = useCartOrdersQuery();
	const { mutate: confirm, isPending: confirmPending } = useConfirmOrderMutation({
		resetFunction: (response) => {
			setConfirmModal(!!response?.data?.payment_url?.client_secret);
			setClientSecret(response?.data?.payment_url?.client_secret);
		},
	});
	const { mutate: reOrder, isPending: reOrderPending } = useReOrderMutation({
		resetFunction: () => getCart(),
	});

	return (
		<div className="flex w-full flex-wrap items-start justify-between gap-5 rounded-md border border-border p-4">
			<div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row md:flex-col lg:flex-row">
				{!fromReturnDetails && (
					<div className="flex flex-col items-start justify-start gap-5">
						<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
							{fromReturn ? (isRTL ? "رقم الارجاع" : "Return No.") : isRTL ? "رقم الطلب" : "Order No."} :{" "}
							<span className="font-[700] text-primary">{item?.id}</span>
						</h5>
						{fromReturn ? (
							<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
								{isRTL ? "تاريخ الارجاع" : "Return Date"} : <span className="font-[700] text-primary">{item?.return_date}</span>
							</h5>
						) : (
							<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
								{isRTL ? "تاريخ الطلب" : "Order Date"} :{" "}
								<span className="font-[700] text-primary">{item?.date || item?.order_date || item?.created_at}</span>
							</h5>
						)}
					</div>
				)}
				{fromReturnDetails && (
					<div className="flex flex-col items-start justify-start gap-5">
						<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
							{isRTL ? "رقم الطلب المسترجع" : "Return No"} : <span className="font-[700] text-primary">{item?.id}</span>
						</h5>
						<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
							{isRTL ? "تاريخ الطلب المسترجع" : "Return Date"} :{" "}
							<span className="font-[700] text-primary">{item?.return_date || "--"}</span>
						</h5>
					</div>
				)}
				<div className="flex flex-col items-start justify-start gap-5">
					<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
						{isRTL ? "عدد المنتجات" : "Nubmer of products"} :{" "}
						<span className="font-[700] text-primary">{item?.one_paice || item?.items_count}</span>
					</h5>
					<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
						{isRTL ? "السعر الكلي" : "Total Price"} :{" "}
						<span className="font-[700] text-primary">
							{item?.grand_total} {item?.currency}
						</span>
					</h5>
				</div>
				<div className="flex flex-col items-start justify-start gap-5">
					<h5 className="text-primary/80 text-[15px] font-[400] leading-6">
						{isRTL ? "رسوم الشحن" : "Shipping Fees"} :{" "}
						<span className="font-[700] text-primary">{item?.shipping_fees || item?.shipping_fees}</span>
					</h5>
				</div>
				<div className="flex flex-col items-start justify-start gap-5">
					<Button
						variant={"secondary"}
						className="h-[40px] w-full">
						{btnText}
					</Button>
				</div>
			</div>
			{inReturn && (
				<Button
					onClick={() => {
						router.push(`/${isRTL ? "ar" : "en"}/return-orders/${item?.id}`);
						setDetailsId(item?.id);
					}}
					variant={"default"}
					className="h-[40px] w-full md:w-[160px]">
					{isRTL ? "تفاصيل الطلب" : "Return Details"}
				</Button>
			)}
			{inCurrent && (
				<div className="flex flex-wrap gap-2">
					<Button
						onClick={() => {
							router.push(`/${isRTL ? "ar" : "en"}/my-orders/${item?.id}`);
							setDetailsId(item?.id);
						}}
						variant={"default"}
						className="block h-[40px] w-full md:w-[160px]">
						{isRTL ? "تفاصيل الطلب" : "Order Details"}
					</Button>
					{confirmOrder && (
						<>
							<LoadingButton
								isLoading={false}
								onClick={() => setCancelModal(true)}
								variant={"default"}
								className="block h-[40px] w-full border-red-500 bg-red-500 text-white hover:border-red-500 hover:text-red-500 md:w-[160px]">
								{isRTL ? "رفض الطلب" : "Reject Order"}
							</LoadingButton>
							<LoadingButton
								isLoading={confirmPending}
								onClick={() => confirm({ id: item?.id })}
								variant={"default"}
								className="block h-[40px] w-full border-emerald-500 bg-emerald-500 text-white hover:border-emerald-500 hover:text-emerald-500 md:w-[160px]">
								{isRTL ? "تأكيد الطلب" : "Confirm Order"}
							</LoadingButton>
						</>
					)}
					{inReview && (
						<Button
							onClick={() => setCancelModal(true)}
							variant={"outline"}
							className="h-[40px] w-full border-destructive text-destructive hover:text-destructive md:w-[160px]">
							{isRTL ? "الغاء الطلب" : "Cancel Order"}
						</Button>
					)}
				</div>
			)}
			{inPast && (
				<div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
					<Button
						onClick={() => {
							router.push(`/${isRTL ? "ar" : "en"}/my-orders/${item?.id}`);
							setDetailsId(item?.id);
						}}
						variant={"default"}
						className="h-[40px] w-full md:w-[160px]">
						{isRTL ? "تفاصيل الطلب" : "Order Details"}
					</Button>
					{inDelevered && (
						<>
							{item?.day_returns && (
								<Button
									onClick={() => router.push(`/${isRTL ? "ar" : "en"}/return/${item?.id}`)}
									variant={"outline"}
									className="h-[40px] w-full border-destructive text-destructive hover:text-destructive md:w-[160px]">
									{isRTL ? "ارجاع الطلب" : "Return Order"}
								</Button>
							)}
							<Button
								onClick={() => setRateModal(true)}
								variant={"outline"}
								className="h-[40px] w-full md:w-[160px]">
								{isRTL ? "تقييم الطلب" : "Rate Order"}
							</Button>
							<LoadingButton
								isLoading={reOrderPending}
								onClick={() => reOrder(item?.id)}
								variant={"default"}
								className="h-[40px] w-full bg-[#464547] md:w-[160px]">
								{isRTL ? "إعادة الطلب" : "Reorder"}
							</LoadingButton>
						</>
					)}
				</div>
			)}
			<Modal
				isOpen={cancelModal}
				title={isRTL ? "تأكيد الغاء الطلب" : "Confirm Cancel Order"}
				description={isRTL ? "هل تريد تأكيد الغاء الطلب؟" : "Are you sure you want to cancel the order?"}
				setIsOpen={() => setCancelModal(false)}>
				<CancelForm
					closeModal={() => {
						refetch && refetch();
						setCancelModal(false);
					}}
					orderId={item.id}
				/>
			</Modal>
			<ConfirmModal
				isOpen={confirmModal}
				setIsOpen={() => {
					refetch && refetch();
					setClientSecret("");
					setConfirmModal(false);
				}}
			/>
			<Modal
				className="sm:max-w-[600px]"
				isOpen={rateModal}
				title={isRTL ? "تقيم الطلب" : "Rate Order"}
				description={isRTL ? "شارك تجربتك عن المنتج الذي تمتلكه" : "Share your experience about the product"}
				setIsOpen={() => setRateModal(false)}>
				<RateOrderForm
					closeModal={() => setRateModal(false)}
					order={item}
				/>
			</Modal>
		</div>
	);
};

export default OrderCard;
