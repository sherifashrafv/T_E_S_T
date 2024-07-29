import React, { ReactNode, Suspense } from "react";

import { Toaster } from "@/components/ui/sonner";
import { Source_Sans_3 as SourceSans, Cairo } from "next/font/google";

import { Locale } from "@/config/i18n.config";
import QueryProvider from "@/config/providers/QueryProvider";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import Loading from "./loading";
import AxiosInterceptor from "@/config/providers/AxiosInterceptor";
import BottomBar from "@/components/layouts/bottom-bar";

const sourceSans = SourceSans({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

type Props = {
	children: ReactNode;
	params: { lang: Locale };
};

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LocaleLayout({ children, params: { lang } }: Props) {
	return (
		<html
			lang={lang}
			dir={lang === "ar" ? "rtl" : "ltr"}>
			<body className={`${sourceSans.className} ${cairo.className} font-sans`}>
				<Suspense fallback={<Loading />}>
					<AxiosInterceptor>
						<QueryProvider>
							<Navbar lang={lang} />
							<BottomBar lang={lang} />
							{children}
							<Footer lang={lang} />

							<Toaster
								richColors
								position="top-right"
							/>
						</QueryProvider>
					</AxiosInterceptor>
				</Suspense>
			</body>
		</html>
	);
}
