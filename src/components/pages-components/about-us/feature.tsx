import React from "react";
import Image from "next/image";

import { AboutusDataProps } from "@/types";

const Feature = ({ features }: { features: AboutusDataProps[] }) => {
	return (
		<div className="flex items-center justify-center bg-primary py-[50px]">
			<div className="container grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
				{features.map(({ id, image, title, description }) => (
					<div
						key={id}
						className="flex w-full max-w-[314px] flex-col gap-5">
						<div className="flex size-[48px] items-center justify-center rounded-full bg-white">
							<Image
								src={image}
								alt={title}
								width={32}
								height={32}
								priority
								quality={100}
								loading="eager"
								className="size-[32px] rounded-full object-contain"
							/>
						</div>
						<h3 className="text-lg font-[700] text-white">{title}</h3>
						<p
							className="whitespace-pre-wrap text-sm font-[400] text-gray-300"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Feature;
