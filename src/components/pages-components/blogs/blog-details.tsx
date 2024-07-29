/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import PageHeader from "@/components/shared/page-header";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useDetailsIdStore, useSocialMediaStore } from "@/store";
import { icons } from "@/constants";
import { useBlogQuery } from "@/hooks/root/use-root-hooks";
import Loading from "@/components/shared/loading";

const BlogDetails = ({ lang }: { lang: string }) => {
	const { detailsId } = useDetailsIdStore();
	if (!detailsId) return redirect(`/${lang}/blogs`);
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const { socialMedia } = useSocialMediaStore();
	const { data, isPending } = useBlogQuery(`${detailsId}`);

	if (isPending) return <Loading />;
	const { title, description, image, date } = data?.data;

	const social = [
		{ id: 2, icon: icons.facebook2, href: socialMedia?.facebook || "" },
		{ id: 3, icon: icons.whatsapp2, href: `https://wa.me/${socialMedia?.whatsapp}` || "" },
		{ id: 4, icon: icons.twitter2, href: socialMedia?.twitter || "" },
		{ id: 6, icon: icons.instagram2, href: socialMedia?.instegram || "" },
	];

	return (
		<>
			<PageHeader
				pageName={title as string}
				breads={[{ name: isRTL ? "المدونة" : "Blog", href: `/${lang}/blogs` }]}
			/>

			<div className="container flex w-full flex-col items-center justify-center gap-5 py-[50px] md:flex-row md:gap-9 lg:gap-20 lg:py-[100px]">
				<div className="order-2 flex w-full flex-col gap-8 md:w-[666px]">
					<h1 className="break-words text-lg font-[700] text-primary md:text-2xl">{title}</h1>
					<div className="flex flex-col gap-2">
						<h3 className="break-words text-sm font-[400] text-secondary-gray md:text-lg">{title}</h3>
						<div className="flex w-fit items-center gap-3 rounded-md bg-secondary p-3">
							<Image
								src={icons.calender}
								alt="calender"
								width={16}
								priority
								height={16}
							/>
							<h4 className="text-xs font-[400] text-primary">{isRTL ? "تاريخ النشر :" : "Date :"}</h4>
							<p className="text-xs font-[400] text-primary">{date}</p>
						</div>
					</div>
					<p
						className="break-words text-xs font-[400] text-primary md:text-sm"
						dangerouslySetInnerHTML={{ __html: description }}
					/>

					<div className="flex h-[80px] w-full items-center justify-center gap-5 bg-primary px-2 md:h-[104px] md:gap-10">
						<h3 className="text-sm font-[700] text-white md:text-lg">{isRTL ? "مشاركة المدونة :" : "Share the Article :"}</h3>
						<div className="flex items-center justify-center gap-2 md:gap-5">
							{social.map((item) => (
								<Link
									key={item.id}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer">
									<Image
										src={item.icon}
										alt="icon"
										width={20}
										priority
										height={20}
									/>
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className="relative order-1 h-[346.58px] w-[315px] overflow-hidden md:order-2 md:h-[620px] md:w-[424px]">
					<Image
						src={image || ""}
						alt="image"
						fill
						priority
						className="rounded-md object-cover"
					/>
				</div>
			</div>
		</>
	);
};

export default BlogDetails;
