"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import CurrentOrders from "./current-orders";
import PastOrders from "./past-orders";

const OrderTabsLayout = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const [activeTab, setActiveTab] = React.useState(0);

	const tabs = [isRTL ? "الطلبات الحالية" : "Current Orders", isRTL ? "الطلبات السابقة" : "Past Orders"];

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center gap-3 md:gap-5">
				{tabs.map((tab, index) => (
					<Button
						key={index}
						variant={"secondary"}
						className={`w-full max-w-[188px] text-sm font-[400] text-primary ${activeTab === index ? "border-b border-primary" : ""}`}
						onClick={() => setActiveTab(index)}>
						{tab}
					</Button>
				))}
			</div>

			{activeTab === 0 ? <CurrentOrders /> : <PastOrders />}
		</div>
	);
};

export default OrderTabsLayout;
