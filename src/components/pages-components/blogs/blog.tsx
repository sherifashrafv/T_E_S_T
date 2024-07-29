"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { useDetailsIdStore } from "@/store";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useBlogsQuery } from "@/hooks/root/use-root-hooks";
import Loading from "@/components/shared/loading";
import { BlogsProps } from "@/types";
import Empty from "@/components/shared/empty";

const Blog = () => {
	const { setDetailsId } = useDetailsIdStore();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [currentPage, setCurrentPage] = useState(1);

	const { data, isPending } = useBlogsQuery(currentPage);

	if (isPending) return <Loading />;
	const { items, paginate } = data?.data;

	const blogsPerPage: BlogsProps[] = items?.slice(
		(currentPage - 1) * paginate?.per_page,
		(currentPage - 1) * paginate?.per_page + paginate?.per_page
	);

	return (
		<div className="container flex w-full flex-col gap-5 md:gap-10">
			{blogsPerPage?.length === 0 ? (
				<div className="flex w-full items-center justify-center">
					<Empty />
				</div>
			) : (
				<div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
					{blogsPerPage.map((blog) => {
						return (
							<div
								className="group flex h-[382px] flex-col shadow-sm"
								key={blog.id}>
								<div className="relative h-[200px] w-full overflow-hidden rounded-xl">
									<Image
										src={blog.image}
										alt="image"
										fill
										priority
										className="h-full rounded-md  object-contain transition-all duration-300 group-hover:scale-110"
									/>
								</div>
								<span className="p-3 text-sm font-[400] text-foreground">{blog.date}</span>
								<h1 className="h-[60px] overflow-hidden break-words p-3 text-lg font-[700] text-primary">{blog.title}</h1>
								<Link
									className="p-3"
									href={`/${isRTL ? "ar" : "en"}/blogs/${blog.title}`}
									onClick={() => setDetailsId(blog.id)}>
									<Button className="h-[40px] w-[150px] p-2">{isRTL ? "مشاهدة المزيد" : "See More"}</Button>
								</Link>
							</div>
						);
					})}
				</div>
			)}
			{items?.length > paginate?.per_page && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={paginate?.per_page}
					onPageChange={setCurrentPage}
					totalItems={items?.length}
				/>
			)}
		</div>
	);
};

export default Blog;
