import React from "react";

import OurStory from "./our-story";
import Feature from "./feature";
import Wardrobe from "./wardrobe";
import Mission from "./mission";
import ContactWrapper from "../contact-us/contact-wrapper";
import { AboutusDataProps } from "@/types";

type Props = {
	ourStory: AboutusDataProps;
	feature: AboutusDataProps[];
	mission: AboutusDataProps[];
	appUrls: { apple: string; google: string };
};

const AboutusWrapper = ({ ourStory, feature, mission, appUrls }: Props) => {
	return (
		<div>
			<OurStory
				ourStory={ourStory}
				appUrls={appUrls}
			/>
			<Feature features={feature} />
			<Mission mission={mission} />
			<Wardrobe appUrls={appUrls} />
			<div className="flex items-center justify-center px-4 py-[50px] md:container lg:py-[100px]">
				<ContactWrapper />
			</div>
		</div>
	);
};

export default AboutusWrapper;
