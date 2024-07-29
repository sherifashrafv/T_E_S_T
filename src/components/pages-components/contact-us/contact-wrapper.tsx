"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../../ui/button";
import { icons } from "@/constants";
import ContactCards from "./contact-cards";
import SectionHeader from "../../shared/section-header";
import ContactForm from "./contact-form";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useContactusQuery } from "@/hooks/root/use-root-hooks";
import Loading from "@/components/shared/loading";

const ContactWrapper = () => {
	const router = useRouter();
	const user: any = JSON.parse(getCookiesClientSide("user") || "{}");
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { data: contactData, isPending } = useContactusQuery();

	if (isPending) return <Loading />;

	const info = [
		{ id: 1, name: isRTL ? "العنوان" : "Address", value: contactData?.data?.address?.join(" - "), icon: icons.store },
		{ id: 2, name: isRTL ? "البريد الالكتروني" : "Email", value: contactData?.data?.email, icon: icons.email },
		{ id: 3, name: isRTL ? "رقم الهاتف" : "Phone", value: contactData?.data?.numbers?.join(" - "), icon: icons.phone },
	];

	return (
		<div className="flex size-full min-h-[600px] flex-col items-center justify-center gap-4">
			<div className="flex size-full flex-col items-start justify-between gap-5 md:flex-row lg:gap-12">
				<div className="flex w-full flex-col gap-5">
					<SectionHeader header={isRTL ? "اتصل بنا" : "Contact us"} />
					<p
						className="text-sm font-[400] text-[#464547] md:text-lg"
						id="text-to-right">
						{isRTL
							? "نحن هنا لتقديم الدعم والإجابة على جميع استفساراتك. لا تتردد في التواصل معنا للحصول على اى مساعدة."
							: "We are here to provide support and answer all your questions. Do not hesitate to contact us for any assistance."}
					</p>
					<ContactForm />
				</div>
				<div className="size-full md:min-h-[600px] md:max-w-[362px]">
					<div className="flex size-full flex-col justify-between gap-4 md:min-h-[600px]">
						<div className="flex size-full flex-col gap-4">
							{info
								.filter((item) => item.value !== "")
								.map(({ id, name, value, icon }) => (
									<ContactCards
										key={id}
										name={name}
										value={value}
										icon={icon}
									/>
								))}
						</div>
						<Button
							onClick={
								user?.is_verified && user?.is_active
									? () => router.push(`/${isRTL ? "ar" : "en"}/live-chat`)
									: () => {
											toast.error(isRTL ? "يرجى تسجيل الدخول أو التسجيل للمتابعة" : "Please login or register to continue");
											router.replace(`/${isRTL ? "ar" : "en"}/sign-in`);
										}
							}
							variant="outline"
							className="order-1 flex w-full items-center justify-center gap-2 md:max-w-[362px]">
							<Image
								src={icons.chat}
								alt="chat"
								width={20}
								priority
								height={20}
							/>
							{isRTL ? "محادثة مباشرة معنا" : "Live Chat with Us"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactWrapper;
