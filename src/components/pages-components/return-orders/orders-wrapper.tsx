"use client";

import React from "react";

import CartHeader from "@/components/shared/cart-header";
import OrderCard from "@/components/shared/order-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useReturnOrderQuery } from "@/hooks/profile/use-profile-hooks";
import Empty from "../favourites/empty";
import { Pagination } from "@/components/shared/pagination";
import { Loader2Icon } from "lucide-react";

const ReturnOrdersWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [currentPage, setCurrentPage] = React.useState(1);

	const { data: returnOrders, isFetching } = useReturnOrderQuery({ page: 1 });

	return (
		<div className="flex flex-col gap-5">
			<CartHeader title={isRTL ? "الطلبات المرتجعة" : "Return Orders"} />

			<div className="flex flex-col gap-5">
				{isFetching ? (
					<div className="flex size-full items-center justify-center">
						<Loader2Icon className="mx-auto size-5 animate-spin" />
					</div>
				) : returnOrders?.data?.items?.length === 0 ? (
					<Empty pageName={isRTL ? "طلبات" : "Orders"} />
				) : (
					returnOrders?.data?.items?.map((item: any, index: number) => (
						<OrderCard
							item={item}
							inReturn={true}
							fromReturn={true}
							key={index}
							btnText={item?.status}
						/>
					))
				)}
				{returnOrders?.data?.items?.length > returnOrders?.data?.paginate?.per_page && (
					<Pagination
						currentPage={currentPage}
						itemsPerPage={returnOrders?.data?.paginate?.per_page}
						onPageChange={setCurrentPage}
						totalItems={returnOrders?.data?.items?.length}
					/>
				)}
			</div>
		</div>
	);
};

export default ReturnOrdersWrapper;
