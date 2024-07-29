"use client";

import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

type Props = {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	onPageChange: (page: number) => void;
};

export function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }: Props) {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;

	const isFirstItem = currentPage === 1;
	const isLastItem = currentPage === lastPage + 1;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<PaginationComponent>
			<PaginationContent dir={isRTL ? "rtl" : "ltr"}>
				{isRTL ? (
					<PaginationItem>
						<PaginationNext
							onClick={
								isFirstItem
									? () => {}
									: () => {
											onPageChange(currentPage - 1);
											scrollToTop();
										}
							}
							className={isFirstItem ? "cursor-not-allowed text-secondary-gray" : "flex items-center justify-center bg-card-card2"}
						/>
					</PaginationItem>
				) : (
					<PaginationItem>
						<PaginationPrevious
							onClick={
								isFirstItem
									? () => {}
									: () => {
											onPageChange(currentPage - 1);
											scrollToTop();
										}
							}
							className={isFirstItem ? "cursor-not-allowed text-secondary-gray" : "flex items-center justify-center bg-card-card2"}
						/>
					</PaginationItem>
				)}
				{[...Array(lastPage + 1)]?.map((_, index) => {
					return (
						<PaginationItem key={index}>
							<PaginationLink
								onClick={() => {
									onPageChange(index + 1);
									scrollToTop();
								}}
								className={currentPage === index + 1 ? "bg-primary text-white" : "bg-card-card2 text-secondary-gray"}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				{isRTL ? (
					<PaginationItem>
						<PaginationPrevious
							onClick={
								isLastItem
									? () => {}
									: () => {
											onPageChange(currentPage + 1);
											scrollToTop();
										}
							}
							className={isLastItem ? "cursor-not-allowed text-secondary-gray" : "flex items-center justify-center bg-card-card2"}
						/>
					</PaginationItem>
				) : (
					<PaginationItem>
						<PaginationNext
							onClick={
								isLastItem
									? () => {}
									: () => {
											onPageChange(currentPage + 1);
											scrollToTop();
										}
							}
							className={isLastItem ? "cursor-not-allowed text-secondary-gray" : "flex items-center justify-center bg-card-card2"}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</PaginationComponent>
	);
}
