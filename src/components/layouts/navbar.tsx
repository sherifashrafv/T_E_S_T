import Link from "next/link";
import Image from "next/image";

import LocaleSwitcher from "./locale-switcher";
import { icons } from "@/constants";
import MobileNavbar from "./mobile-navbar";
import NavigationLinks from "./navigations";
import TopBar from "./top-bar";
import { Locale } from "@/config/i18n.config";
import { getDictionary } from "@/config/dictionary";

export default async function Navbar({ lang }: { lang: Locale }) {
	const { Navigations } = await getDictionary(lang);

	const Links = [
		{ id: 1, name: Navigations.home, href: `/${lang}` },
		{ id: 2, name: Navigations.about, href: `/${lang}/about` },
		{ id: 3, name: Navigations.store, href: `/${lang}/store` },
		{ id: 4, name: Navigations.sale, href: `/${lang}/sale` },
		{ id: 5, name: Navigations.blog, href: `/${lang}/blogs` },
		{ id: 6, name: Navigations.contact, href: `/${lang}/contact-us` },
	];

	const MenuItems = [
		{ id: 1, name: Navigations.profile, href: `/${lang}/profile` },
		{ id: 2, name: Navigations.terms, href: `/${lang}/terms` },
		{ id: 3, name: Navigations.privacy, href: `/${lang}/privacy` },
		{ id: 4, name: Navigations.logout, href: ``, logout: true },
	];

	return (
		<header className="fixed left-0 top-0 z-50 w-full bg-background shadow-md">
			<TopBar />
			<nav className="container flex h-[83px] items-center justify-between bg-background">
				{/* Sheet */}
				<MobileNavbar Links={Links} />

				{/* Icons */}
				<Link
					href={`/${lang}`}
					className="md:order-none">
					<div className="relative h-[40px] w-[130px] md:block md:h-[40px] md:w-[205px]">
						<Image
							src={icons.logo}
							alt="logo"
							fill
							priority
						/>
					</div>
				</Link>

				{/* Navigation */}
				<div className="hidden w-full lg:block">
					<NavigationLinks Links={Links} />
				</div>

				{/* Buttons */}
				<LocaleSwitcher
					MenuItems={MenuItems}
					lang={lang}
				/>
			</nav>
		</header>
	);
}
