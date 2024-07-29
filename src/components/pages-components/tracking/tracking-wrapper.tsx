"use client";

import React from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { icons } from "@/constants";
import { Button } from "@/components/ui/button";
import { useDetailsIdStore } from "@/store";
import { useOrderDetailsQuery, useOrderStatusQuery } from "@/hooks/profile/use-profile-hooks";
import StatusProgress from "@/components/shared/status-progress";
import { convertedArray, getStatusesUpToActive } from "@/utils";
import OrderCard from "@/components/shared/order-card";
import { Loader2Icon } from "lucide-react";

const TrackingWrapper = ({ lang }: { lang: string }) => {
	const router = useRouter();
	const isRTL = lang === "ar";
	const { detailsId, setDetailsId } = useDetailsIdStore();

	const { data: orderStatus, isPending: isPendingStatus } = useOrderStatusQuery();
	const { data: orderDetails, isFetching } = useOrderDetailsQuery({ id: detailsId as number, inReturn: false });
	if (!detailsId) return redirect(`/${lang}/my-orders`);
	const newStatus: any = convertedArray(orderStatus?.data, isPendingStatus);
	const activeStatuses = getStatusesUpToActive(newStatus, isPendingStatus, orderDetails?.data?.status_key);

	return (
		<div className="flex w-full max-w-[812px] flex-col items-center gap-5 md:gap-10">
			<Image
				src={icons.packageIcon}
				alt="packageIcon"
				width={141}
				height={120}
				priority
				className="mb-10"
			/>
			<div className="flex w-full flex-col items-center justify-center gap-5">
				<div className="flex w-full max-w-[379px] flex-col items-center justify-center gap-4 text-center">
					<h1 className="text-lg font-[700] text-primary md:text-2xl">{isRTL ? "شكرا لتسويقك معنا" : "Thank you for shopping with us"}</h1>
					<h3 className="text-primary/80 text-sm font-[400]">
						{isRTL
							? "تم تقديم طلبك بنجاح وتتم مراجعته مؤقتا من قبل المدير"
							: "Your order has been successfully placed and is now under review."}
					</h3>
				</div>
			</div>
			{isFetching ? (
				<div className="flex w-full items-center justify-center">
					<Loader2Icon className="animate-spin" />
				</div>
			) : (
				<div className="flex w-full flex-col gap-4">
					<OrderCard
						btnText={orderDetails?.data?.status}
						item={orderDetails?.data}
					/>

					<StatusProgress
						steps={newStatus?.slice(4, -1)}
						activeSteps={activeStatuses}
					/>
				</div>
			)}
			<Button
				className="mt-6 w-[166px]"
				onClick={() => {
					setDetailsId(orderDetails?.data?.id);
					router.push(`/${lang}/my-orders/${orderDetails?.data?.id}`);
				}}>
				{isRTL ? "تفاصيل الطلب" : "Go To Order Details"}
			</Button>
		</div>
	);
};

export default TrackingWrapper;
