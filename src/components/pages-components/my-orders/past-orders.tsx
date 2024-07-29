"use client";

import React from "react";

import OrderCard from "@/components/shared/order-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useOldOrdersQuery } from "@/hooks/profile/use-profile-hooks";
import { Pagination } from "@/components/shared/pagination";
import Empty from "../favourites/empty";
import { Loader2Icon } from "lucide-react";
import { OrdersProps } from "@/types";

const PastOrders = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [currentPage, setCurrentPage] = React.useState(1);

	const { data: oldOrders, isFetching: isFetchingOld, refetch } = useOldOrdersQuery({ page: 1 });

	return (
		<div className="flex flex-col gap-5">
			{isFetchingOld ? (
				<div className="flex size-full items-center justify-center">
					<Loader2Icon className="mx-auto size-5 animate-spin" />
				</div>
			) : oldOrders?.data?.items?.length === 0 ? (
				<Empty pageName={isRTL ? "طلبات" : "Orders"} />
			) : (
				oldOrders?.data?.items?.map((item: OrdersProps, index: number) => (
					<OrderCard
						inPast={true}
						inDelevered={item?.status_key !== "Cancelled"}
						key={index}
						btnText={item?.status}
						item={item}
						refetch={refetch}
					/>
				))
			)}
			{oldOrders?.data?.items?.length > oldOrders?.data?.paginate?.per_page && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={oldOrders?.data?.paginate?.per_page}
					onPageChange={setCurrentPage}
					totalItems={oldOrders?.data?.items?.length}
				/>
			)}
		</div>
	);
};

export default PastOrders;
