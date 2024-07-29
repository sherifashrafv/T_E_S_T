"use client";

import React from "react";

import { ChevronUp, ChevronDown, Loader2Icon } from "lucide-react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useQueryParams } from "@/utils/Functions/use-query-params";
import { useCategoriesQuery } from "@/hooks/root/use-root-hooks";

const Category = ({ inMobile }: { inMobile?: boolean }) => {
	const { category, setCategory } = useQueryParams();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [isOpen, setIsOpen] = React.useState(true);

	const { data, isPending } = useCategoriesQuery();
	const updatedCategories = [
		{
			id: "all",
			name: isRTL ? "كل المنتجات" : "All Product",
			products: data?.data?.items?.reduce((acc: number, item: any) => acc + item.products, 0) || 0,
		},
		...(data?.data?.items?.map(({ id, name, products }: any) => ({ id, name, products })) || []),
	];

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-full space-y-2 border-b pb-2">
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-[700] text-primary">{isRTL ? "تصنيفات" : "Categories"}</h4>
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
				{isPending ? (
					<div className="flex size-full items-center justify-center">
						<Loader2Icon className="animate-spin" />
					</div>
				) : (
					updatedCategories?.map(({ id, name, products }: any) => (
						<div
							key={id}
							className={`flex cursor-pointer items-center justify-between space-x-4 px-4`}
							onClick={() => setCategory(id)}>
							<h2 className={`text-sm ${category === `${id}` ? "font-[700] text-primary" : "font-[400] text-secondary-gray"}`}>
								{name}
							</h2>
							<p className={`text-sm ${category === `${id}` ? "font-[700] text-primary" : "font-[400] text-secondary-gray"}`}>
								{products}
							</p>
						</div>
					))
				)}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Category;
