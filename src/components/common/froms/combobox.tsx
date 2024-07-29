"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type ComboboxFormProps = {
	form: any;
	label: string;
	name: string;
	options: { label: string; value: string }[];
	holder?: string;
	notFound?: string;
	getCitiesData?: any;
};

export function ComboboxForm({ form, label, options = [], name, holder, notFound, getCitiesData }: ComboboxFormProps) {
	const [search, setSearch] = useState<string>("");
	const [open, setOpen] = useState(false);

	const handleSearch = () => {
		const filteredOptions = options.filter((option) => option?.label?.toLowerCase().includes(search.toLowerCase()));

		return filteredOptions;
	};

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Popover
						open={open}
						onOpenChange={() => {
							setOpen(!open);
							setSearch("");
						}}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									onClick={() => setOpen(true)}
									variant="outline"
									role="combobox"
									className={cn("h-[45px] w-full justify-between", !field.value && "text-muted-foreground")}>
									<span>{field.value ? options?.find((option) => option?.value === field?.value)?.label : holder || ""}</span>
									<ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="z-50 flex w-[200px] flex-col gap-y-1 p-1">
							<Input
								name="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder={holder}
							/>
							<div className="h-full max-h-[300px] overflow-y-auto">
								{handleSearch()?.length === 0 ? (
									<div className="text-center">{notFound}</div>
								) : (
									handleSearch()?.map((option) => (
										<div
											className={`w-full cursor-pointer p-2 hover:bg-muted ${option?.value === field?.value ? "bg-muted" : ""}`}
											key={option?.value}
											onClick={() => {
												form?.setValue(name, option?.value);
												setOpen(false);
												getCitiesData(option?.value);
											}}>
											{option?.label}
										</div>
									))
								)}
							</div>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
