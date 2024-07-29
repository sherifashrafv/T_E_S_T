"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { prices } from "@/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParamsStore } from "@/store";

const Sorted = ({ inMobile }: { inMobile?: boolean }) => {
	const { params, setParams } = useParamsStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [isOpen, setIsOpen] = React.useState(true);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className={`w-full space-y-2 border-b pb-2 ${inMobile ? "border-b-0" : ""}`}>
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-[700] text-primary">{isRTL ? "ترتيب المنتجات" : "Sorted Products"}</h4>
				{!inMobile && (
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="w-9">
							{isOpen ? <ChevronUp className="size-6" /> : <ChevronDown className="size-6" />}
							<span className="sr-only">Toggle</span>
						</Button>
					</CollapsibleTrigger>
				)}
			</div>
			<CollapsibleContent className="space-y-4">
				{prices(isRTL).map(({ id, title, value }) => (
					<div
						className="flex items-center gap-2"
						key={id}>
						<Checkbox
							id={value}
							value={value}
							onClick={() => {
								setParams({ ...params, price: value });
							}}
							checked={params?.price === value}
							className={`${params?.price === value ? "text-primary" : "border border-border text-secondary-gray"}`}
						/>
						<label
							htmlFor={value}
							onClick={() => {
								setParams({ ...params, price: value });
							}}
							className={`cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${params?.price === value ? "text-primary" : "text-secondary-gray"}`}>
							{title}
						</label>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Sorted;
