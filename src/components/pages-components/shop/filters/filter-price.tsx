"use client";

import React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMaxPriceQuery } from "@/hooks/root/use-root-hooks";
import { useParamsStore } from "@/store";

const FilterPrice = ({ inMobile }: { inMobile?: boolean }) => {
	const { params, setParams } = useParamsStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [isOpen, setIsOpen] = React.useState(true);

	const { data: maxPrice, isFetching } = useMaxPriceQuery();

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-full space-y-2">
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-[700] text-primary">{isRTL ? "فرز حسب السعر" : "Filter By Price"}</h4>
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
			<CollapsibleContent className="space-y-2">
				{isFetching ? null : (
					<Slider
						dir={isRTL ? "rtl" : "ltr"}
						className="w-full"
						min={0}
						max={parseFloat(maxPrice?.data)}
						defaultValue={[10, maxPrice?.data]}
						minStepsBetweenThumbs={1}
						onValueCommit={(e) => {
							setParams({ ...params, maxPrice: e[1], minPrice: e[0] });
						}}
					/>
				)}
				<div className="flex items-center justify-between">
					<p>{params.minPrice}$</p>
					<p>{isFetching ? "..." : parseInt(maxPrice?.data) || params.maxPrice}$</p>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default FilterPrice;
