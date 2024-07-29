"use client";

import React from "react";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

type Props = {
	pageName: string;
	breads: { name: string; href: string }[];
	bread?: string;
	title?: string;
	withoutBreadcrumb?: boolean;
};

const PageHeader = ({ pageName, bread, breads, title, withoutBreadcrumb }: Props) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="shape flex min-h-[157px] w-full items-center justify-center overflow-hidden bg-primary px-4 pb-10 pt-[123px] md:pt-[148px]">
			<div className="flex flex-col items-center justify-center gap-4 truncate px-4">
				<h1 className="w-[240px] truncate text-center text-lg font-[700] text-white md:w-full md:text-2xl">{pageName}</h1>
				{title && <p className="truncate text-sm font-[400] text-white/50">{title}</p>}
				{!withoutBreadcrumb && (
					<Breadcrumb>
						<BreadcrumbList className="flex w-full !flex-nowrap items-center justify-center text-center">
							{breads?.map((bread, index) => (
								<React.Fragment key={index}>
									<BreadcrumbItem>
										<BreadcrumbPage className="truncate text-center text-[14px] font-[400] text-secondary-gray hover:text-white">
											<Link href={bread.href}>{bread.name}</Link>
										</BreadcrumbPage>
									</BreadcrumbItem>
									<BreadcrumbSeparator className={`text-secondary-gray ${isRTL ? "rotate-180" : ""}`} />
								</React.Fragment>
							))}
							<BreadcrumbItem className="!block">
								<BreadcrumbPage className="w-[200px] truncate text-[12px] font-[700] text-white md:w-full md:text-[14px]">
									{bread || pageName}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)}
			</div>
		</div>
	);
};

export default PageHeader;
