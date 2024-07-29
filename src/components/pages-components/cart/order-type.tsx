"use client";

import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Textarea } from "@/components/ui/textarea";
import { useOrderTypeStore } from "@/store";

const OrderType = () => {
	const { orderNote, orderType, setOrderNote, setOrderType } = useOrderTypeStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex w-full flex-col items-start justify-start gap-5 md:flex-row md:gap-10">
			<div className="flex w-full max-w-[115px] flex-row gap-5 md:flex-col">
				<div className="flex items-start gap-2">
					<Checkbox
						id="gift"
						value={"Gift"}
						className="peer border border-border checked:border checked:border-primary"
						onCheckedChange={() => setOrderType(orderType === "Gift" ? "Buying" : "Gift")}
						checked={orderType === "Gift"}
					/>
					<label
						htmlFor="gift"
						className="text-sm font-medium leading-none peer-checked:font-[700] peer-checked:text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{isRTL ? "هدية" : "Gift"}
					</label>
				</div>
			</div>
			{orderType === "Gift" && (
				<div className="flex w-full flex-col gap-3">
					<label
						htmlFor="message"
						className="text-sm font-medium leading-none">
						{isRTL ? "اكتب رسالتك" : "Write your message"}
					</label>
					<Textarea
						rows={4}
						className="w-full resize-none"
						id="message"
						value={orderNote}
						onChange={(e) => setOrderNote(e.target.value)}
					/>
				</div>
			)}
		</div>
	);
};

export default OrderType;
