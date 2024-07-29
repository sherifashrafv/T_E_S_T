"use client";

import Image from "next/image";
import React from "react";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutusDataProps } from "@/types";

const Mission = ({ mission }: { mission: AboutusDataProps[] }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const [activeImage, setActiveImage] = React.useState(mission[0]?.image);

	const tabDetails = [
		{
			id: 1,
			value: "mission",
			header: mission[0]?.title,
			description: mission[0]?.description,
			image: mission[0]?.image,
		},
		{
			id: 2,
			value: "values",
			header: mission[1]?.title,
			description: mission[1]?.description,
			image: mission[1]?.image,
		},
		{
			id: 3,
			value: "message",
			header: mission[2]?.title,
			description: mission[2]?.description,
			image: mission[2]?.image,
		},
	];

	return (
		<div
			className="flex items-center justify-center px-4 py-[50px] md:container"
			dir="ltr">
			<div className="flex w-full flex-col items-start justify-center gap-5 lg:flex-row">
				<div className="flex w-full items-center justify-center">
					<div className="relative h-[317px] w-[325px] rounded-[20px] bg-primary md:h-[514px] md:w-[485px]">
						<Image
							src={activeImage}
							alt="about2"
							fill={true}
							priority
							className="rounded-[20px] object-center"
						/>
					</div>
				</div>

				<Tabs
					defaultValue="mission"
					dir={isRTL ? "rtl" : "ltr"}
					className="size-full lg:h-[514px] lg:w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger
							value="mission"
							onClick={() => setActiveImage(mission[0]?.image)}>
							{isRTL ? "مهمتنا" : "Our Mission"}
						</TabsTrigger>
						<TabsTrigger
							value="values"
							onClick={() => setActiveImage(mission[1]?.image)}>
							{isRTL ? "قيمنا" : "Our Values"}
						</TabsTrigger>
						<TabsTrigger
							value="message"
							onClick={() => setActiveImage(mission[2]?.image)}>
							{isRTL ? "رسالتنا" : "Our Message"}
						</TabsTrigger>
					</TabsList>
					{tabDetails.map((tab) => (
						<TabsContent
							value={tab.value}
							key={tab.id}>
							<div className="flex w-full flex-col gap-4">
								<h1 className="text-lg font-[700] text-primary md:text-2xl">{tab.header}</h1>
								<p
									className="whitespace-pre-wrap text-sm font-[400] tracking-wider md:text-[16px]"
									dangerouslySetInnerHTML={{ __html: tab.description }}
								/>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
};

export default Mission;
