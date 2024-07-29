"use client";

import React, { useState } from "react";

import OrderCard from "@/components/shared/order-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useNewOrdersQuery } from "@/hooks/profile/use-profile-hooks";
import { Pagination } from "@/components/shared/pagination";
import { Loader2Icon } from "lucide-react";
import Empty from "../favourites/empty";
import { OrdersProps } from "@/types";

const CurrentOrders = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [currentPage, setCurrentPage] = useState(1);

	const { data: newOrders, isFetching: isFetchingNew, refetch } = useNewOrdersQuery({ page: 1 });

	return (
		<div className="flex flex-col flex-wrap gap-5">
			{isFetchingNew ? (
				<div className="flex size-full items-center justify-center">
					<Loader2Icon className="mx-auto size-5 animate-spin" />
				</div>
			) : newOrders?.data?.items?.length === 0 ? (
				<Empty pageName={isRTL ? "طلبات" : "Orders"} />
			) : (
				newOrders?.data?.items?.map((item: OrdersProps, index: number) => {
					const inReview = ["pending", "in_the_cart"].includes(item?.status_key);
					return (
						<OrderCard
							inCurrent={true}
							inReview={inReview}
							confirmOrder={item?.status_key === "Waiting_for_customer_confirmation"}
							key={index}
							btnText={item?.status}
							item={item}
							refetch={() => refetch()}
						/>
					);
				})
			)}
			{newOrders?.data?.items?.length > newOrders?.data?.paginate?.per_page && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={newOrders?.data?.paginate?.per_page}
					onPageChange={setCurrentPage}
					totalItems={newOrders?.data?.items?.length}
				/>
			)}
		</div>
	);
};

export default CurrentOrders;
