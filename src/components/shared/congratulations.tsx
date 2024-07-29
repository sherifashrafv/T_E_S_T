import React from "react";
import Link from "next/link";
import Image from "next/image";

import { icons } from "@/constants";
import { Button } from "../ui/button";

type Props = {
	isRTL: boolean;
	lang: string;
	btnName: string;
	href: string;
	inRegister?: boolean;
};

const Congratulations = ({ isRTL, lang, btnName, href, inRegister }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center space-y-10">
			<Image
				src={icons.congrats}
				alt="congratulations"
				width={124}
				height={124}
				priority
			/>

			<div className="space-y-4">
				<h1 className="text-center text-2xl font-[700] text-primary">{isRTL ? "مبروك" : "Congratulations"}</h1>
				<p className="text-center text-[15px] font-[400] leading-6 text-[#464547]">
					{inRegister
						? isRTL
							? "تم تسجيل حسابك بنجاح"
							: "Your Account has been created successfully."
						: isRTL
							? "تم تغيير كلمة المرور الخاصة بك بنجاح."
							: "Your password has been successfully reset."}
				</p>
			</div>

			<Link href={href}>
				<Button className="h-[40px] w-[150px]">{btnName}</Button>
			</Link>
		</div>
	);
};

export default Congratulations;
