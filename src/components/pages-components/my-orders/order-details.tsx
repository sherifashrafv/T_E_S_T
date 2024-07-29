"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDetailsIdStore, useOrderTypeStore } from "@/store";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useOrderDetailsQuery, useOrderStatusQuery } from "@/hooks/profile/use-profile-hooks";
import CartHeader from "@/components/shared/cart-header";
import OrderCard from "@/components/shared/order-card";
import StatusProgress from "@/components/shared/status-progress";
import { convertedArray, getStatusesUpToActive } from "@/utils";
import CartProductCard from "../cart/product-card";
import AddressCard from "@/components/shared/address-card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/common/modals/modal";
import CancelForm from "./cancel-form";
import RateOrderForm from "./rate-order-form";
import { Loader2Icon } from "lucide-react";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useConfirmOrderMutation, useReOrderMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import ConfirmModal from "./confirm-modal/confirm-modal";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";

const OrderDetailsComp = ({ lang }: { lang: string }) => {
	const { detailsId } = useDetailsIdStore();
	const { setClientSecret } = useOrderTypeStore();
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	if (!detailsId) router.push(`/${lang}/my-orders`);
	const [cancelModal, setCancelModal] = React.useState(false);
	const [confirmModal, setConfirmModal] = React.useState(false);
	const [rateModal, setRateModal] = React.useState(false);

	const { refetch: getCart } = useCartOrdersQuery();
	const { data: orderStatus, isPending: isPendingStatus, refetch } = useOrderStatusQuery();
	const newStatus: any = convertedArray(orderStatus?.data, isPendingStatus);
	const { data: orderDetails, isFetching, refetch: refetchDetails } = useOrderDetailsQuery({ id: detailsId as number, inReturn: false });
	const activeStatuses = getStatusesUpToActive(newStatus, isPendingStatus, orderDetails?.data?.status_key);
	const { mutate: confirm, isPending: confirmPending } = useConfirmOrderMutation({
		resetFunction: (response) => {
			setConfirmModal(true);
			setClientSecret(response?.data?.payment_url?.client_secret);
		},
	});
	const { mutate: reOrder, isPending: reOrderPending } = useReOrderMutation({
		resetFunction: () => getCart(),
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
						<CartHeader title={isRTL ? "تفاصيل الطلب" : "Order Details"} />
						<OrderCard
							btnText={orderDetails?.data?.status}
							item={orderDetails?.data}
						/>

						<StatusProgress
							steps={newStatus?.slice(4, -1)}
							activeSteps={activeStatuses}
						/>
					</div>
					<div className="flex w-full flex-col gap-5">
						<CartHeader title={isRTL ? "المنتجات" : "Products"} />
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
							{orderDetails?.data?.items?.map((product: any) => {
								return (
									<CartProductCard
										fromDetails
										key={product.id}
										product={product}
										refetch={() => {}}
									/>
								);
							})}
						</div>
					</div>
					<div className="flex w-full flex-col gap-5">
						<CartHeader title={isRTL ? "عنوان التوصيل" : "Delivery Address"} />
						<AddressCard
							fromDetails
							fromProfile
							active={false}
							address={orderDetails?.data?.address}
							refetch={() => {}}
						/>
					</div>

					<div className="flex flex-col items-center gap-4 md:flex-row">
						{orderDetails?.data?.status_key === "Waiting_for_customer_confirmation" && (
							<div className="flex flex-wrap gap-2">
								<LoadingButton
									isLoading={false}
									onClick={() => setCancelModal(true)}
									variant={"default"}
									className="h-[40px] w-full border-red-500 bg-red-500 text-white hover:border-red-500 hover:text-red-500 md:w-[160px]">
									{isRTL ? "رفض الطلب" : "Reject Order"}
								</LoadingButton>
								<LoadingButton
									isLoading={confirmPending}
									onClick={() => confirm({ id: orderDetails?.data?.id })}
									variant={"default"}
									className="h-[40px] w-full border-emerald-500 bg-emerald-500 text-white hover:border-emerald-500 hover:text-emerald-500 md:w-[160px]">
									{isRTL ? "تأكيد الطلب" : "Confirm "}
								</LoadingButton>
							</div>
						)}
						{getStatusesUpToActive(newStatus?.slice(2), isPendingStatus, "in_review")?.includes(orderDetails?.data?.status_key)
							? ""
							: // <Button
								//   onClick={() => setCancelModal(true)}
								//   variant={"outline"}
								//   className="h-[40px] w-full border-destructive text-destructive hover:text-destructive md:w-[160px]"
								// >
								//   {isRTL ? "الغاء الطلب" : "Cancel Order"}
								// </Button>
								orderDetails?.data?.status_key === "delivered" && (
									<>
										<Button
											onClick={() => setRateModal(true)}
											variant={"outline"}
											className="h-[40px] w-full md:w-[160px]">
											{isRTL ? "تقييم الطلب" : "Rate Order"}
										</Button>
										<LoadingButton
											isLoading={reOrderPending}
											onClick={() => reOrder(orderDetails?.data?.id)}
											variant={"default"}
											className="h-[40px] w-full bg-primary md:w-[160px]">
											{isRTL ? "إعادة الطلب" : "Reorder"}
										</LoadingButton>
									</>
								)}
					</div>
				</div>
			)}

			<Modal
				isOpen={cancelModal}
				title={isRTL ? "تأكيد الغاء الطلب" : "Confirm Cancel Order"}
				description={isRTL ? "هل تريد تأكيد الغاء الطلب؟" : "Are you sure you want to cancel the order?"}
				setIsOpen={() => setCancelModal(false)}>
				<CancelForm
					closeModal={() => {
						setCancelModal(false);
						refetch();
						refetchDetails();
					}}
					orderId={orderDetails?.data?.id}
				/>
			</Modal>
			<ConfirmModal
				isOpen={confirmModal}
				setIsOpen={() => {
					refetch();
					refetchDetails();
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
					order={{ id: detailsId }}
				/>
			</Modal>
		</div>
	);
};

export default OrderDetailsComp;
