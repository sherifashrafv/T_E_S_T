/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import InputWithIcon from "../common/froms/Input";
import { useProductsInSearchQuery } from "@/hooks/root/use-root-hooks";
import { Loader2Icon, Search } from "lucide-react";
import { useDebounce } from "@/hooks/debounce-hook";

const GlobalSearch = ({ inMobile, lang }: { inMobile?: boolean; lang: string }) => {
	const [search, setSearch] = React.useState("");
	const [isFocused, setIsFocused] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const debouncedSearch = useDebounce(search, 500);

	const { data: products, isPending } = useProductsInSearchQuery({ name: debouncedSearch });

	// onClick out side class mobile search close
	React.useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (!open) return;
			if (event.target.closest("#mobile")) return;
			setOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<>
			{!inMobile && (
				<div className="relative hidden md:block">
					<InputWithIcon
						lang={lang}
						icon={Search}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						value={search}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
						placeholder={lang === "ar" ? "بحث في المنتجات ..." : "Search for product ..."}
						className={`h-[45px] w-[150px] xl:w-[264px] ${lang === "ar" ? "pr-8" : "pl-8"}`}
					/>

					<div
						className={`absolute left-5 h-[300px] w-full overflow-y-auto rounded-md border bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-150 ${isFocused && search ? "visible opacity-100" : "invisible opacity-0"}`}>
						{isPending ? (
							<div className="flex size-full items-center justify-center">
								<Loader2Icon className="size-6 animate-spin" />
							</div>
						) : (
							products?.data?.items?.map((item: any) => (
								<Link
									href={`/${lang}/store/${item.id}/${item.name}`}
									key={item.id}>
									<div className="flex w-full cursor-pointer items-center justify-start gap-2 border-b border-b-border p-2 hover:bg-border">
										<Image
											src={item.image}
											alt={item.name}
											width={30}
											height={30}
											priority
											className="size-[30px] rounded-full object-cover"
										/>
										{item.name}
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			)}

			{inMobile && (
				<div
					className="relative block md:hidden"
					id="mobile">
					<Search
						onClick={() => setOpen(!open)}
						strokeWidth={1.5}
						className="size-[19px] cursor-pointer"
					/>
					<div
						className={`absolute ${lang === "ar" ? "-left-10" : "-right-5"} top-2 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
						<div className="relative">
							<InputWithIcon
								lang={lang}
								icon={Search}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								value={search}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
								placeholder={lang === "ar" ? "بحث في المنتجات ..." : "Search for product ..."}
								className={`h-[45px] w-[200px] ${lang === "ar" ? "pr-8" : "pl-8"}`}
							/>

							<div
								className={`absolute left-5 h-[300px] w-full overflow-y-auto rounded-md border bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-150 ${isFocused && search ? "visible opacity-100" : "invisible opacity-0"}`}>
								{isPending ? (
									<div className="flex size-full items-center justify-center">
										<Loader2Icon className="size-6 animate-spin" />
									</div>
								) : (
									products?.data?.items?.map((item: any) => (
										<Link
											href={`/${lang}/store/${item.id}/${item.name}`}
											key={item.id}>
											<div className="flex w-full cursor-pointer items-center justify-start gap-2 border-b border-b-border p-2 hover:bg-border">
												<Image
													src={item.image}
													alt={item.name}
													width={30}
													height={30}
													priority
													className="size-[30px] rounded-full object-cover"
												/>
												{item.name}
											</div>
										</Link>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default GlobalSearch;
