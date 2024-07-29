import { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

type Props = {
	children: ReactNode;
};

export const metadata: Metadata = {
	title: "Chique Bouttiqe",
	description: "Online Store for Premium Dresses, Evening Gowns, Abayas, Jumpsuits & Kaftans.",
	icons: {
		icon: "./favicon.ico",
		shortcut: "./favicon.ico",
		apple: "./favicon.ico",
	},
	creator: "Technoraft Software Solutions",
	other: {
		"image/avif": "./favicon.ico",
		"theme-color": "#ffffff",
		"color-scheme": "light only",
		"twitter:image": "./favicon.ico",
		"twitter:card": "Online Store for Premium Dresses, Evening Gowns, Abayas, Jumpsuits & Kaftans.",
		"og:url": "https://chiquebouttique.com/",
		"og:image": "./favicon.ico",
		"og:type": "website",
		"og:title": "Chique Bouttiqe",
		"og:description": "Online Store for Premium Dresses, Evening Gowns, Abayas, Jumpsuits & Kaftans.",
		"og:site_name": "Chique Bouttiqe",
		"og:locale": "en_US",
		"og:image:alt": "Chique Bouttiqe",
		"og:image:type": "image/avif",
	},
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
	return children;
}
