"use client";

import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select as SelectPrimitive } from "@/components/ui/select";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

type Props = {
	control: any;
	name: string;
	label: string;
	holder: string;
	options: { label: string; value: string }[];
	notFound?: string;
	getCitiesData?: any;
	withSearch?: boolean;
};

const Select = ({ control, name, label, holder, options, notFound, getCitiesData, withSearch }: Props) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [search, setSearch] = React.useState<string>("");

	const handleSearch = () => {
		const filteredOptions = options.filter((option) => option?.label?.toLowerCase().includes(search.toLowerCase()));

		return filteredOptions;
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<SelectPrimitive
						onValueChange={(value) => {
							field.onChange(value);
							getCitiesData?.(value);
						}}
						value={field.value}
						dir={isRTL ? "rtl" : "ltr"}
						defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="h-[45px] w-full">
								<SelectValue placeholder={holder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className="z-50">
							{withSearch && (
								<Input
									name="search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder={holder}
								/>
							)}
							<div className="h-full max-h-[300px] overflow-y-auto">
								{handleSearch()?.length === 0 ? (
									<div className="text-center">{notFound}</div>
								) : (
									handleSearch()?.map((option) => (
										<SelectItem
											key={option.value}
											className="focus-within:outline-none focus:outline-none focus-visible:outline-none"
											value={option.value}>
											{option.label}
										</SelectItem>
									))
								)}
							</div>
						</SelectContent>
					</SelectPrimitive>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default Select;
