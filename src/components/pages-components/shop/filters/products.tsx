"use client";

import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { showProduct } from "@/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParamsStore } from "@/store";

const Products = ({ inMobile }: { inMobile?: boolean }) => {
	const { params, setParams } = useParamsStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [isOpen, setIsOpen] = React.useState(true);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-full space-y-2 border-b pb-2">
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-[700] text-primary">{isRTL ? "عرض المنتجات" : "Show Products"}</h4>
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
				{showProduct(isRTL).map(({ id, title, value }) => (
					<div
						className="flex items-center gap-2"
						key={id}>
						<Checkbox
							id={value}
							value={value}
							checked={params?.show === value}
							onClick={() => {
								setParams({ ...params, show: value, favourites: id === 3 ? value : "" });
							}}
							className={`${params?.show === value || params?.favourites === value ? "text-primary" : "border border-border text-secondary-gray"}`}
						/>
						<label
							htmlFor={value}
							onClick={() => {
								setParams({ ...params, show: value, favourites: id === 3 ? value : "" });
							}}
							className={`cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${params?.show === value || params?.favourites === value ? "text-primary" : "text-secondary-gray"}`}>
							{title}
						</label>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Products;
