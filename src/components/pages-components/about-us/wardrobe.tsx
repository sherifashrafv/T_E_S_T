"use client";

import React from "react";

import AppButton from "@/components/common/buttons/app-button";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { icons } from "@/constants";

const Wardrobe = ({ appUrls }: { appUrls: { apple: string; google: string } }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<div className="flex items-center justify-center bg-primary py-[50px]">
			<div className="container flex flex-col items-center justify-center gap-5">
				<h2 className="text-center text-lg font-[700] text-white md:text-3xl">
					{isRTL ? "قم بترقية خزانة ملابسك اليوم!" : "Upgrade Your Wardrobe Today!"}
				</h2>
				<p className="w-full max-w-[1170px] text-center text-sm font-[400] text-gray-300 md:text-lg">
					{isRTL
						? " هل أنت مستعد للارتقاء بأسلوبك؟ استكشف أحدث مجموعتنا واكتشف قطعك المفضلة الجديدة. سواء كنت تبحث عن ملابس يومية غير رسمية أو شيء خاص لمناسبة خاصة، لدينا ما يناسب كل الأذواق والميزانيات. ابدأ التسوق الآن واطلق العنان لإمكانياتك الكاملة في مجال الموضة مع"
						: "Ready to elevate your style? Explore our latest collection and discover your new favorite pieces. Whether you're looking for casual everyday wear or something special for a special occasion, we have something for every style and budget. Start shopping nowand unlock your full fashion potential with "}
					<span className="font-[700] text-white"> Chique Bouttique</span>
				</p>
				<div className="flex gap-3 pb-4">
					<AppButton
						title={isRTL ? "تحميل على" : "Download on the"}
						img={icons.apple}
						text="App Store"
						bg="white"
						href={appUrls.apple || ""}
						animation="to-black"
						useComponent
					/>
					<AppButton
						title={isRTL ? "احصل عليه من" : "Get it on"}
						img={icons.google}
						text="Google Play"
						bg="white"
						href={appUrls.google || ""}
						animation="to-black"
					/>
				</div>
			</div>
		</div>
	);
};

export default Wardrobe;
