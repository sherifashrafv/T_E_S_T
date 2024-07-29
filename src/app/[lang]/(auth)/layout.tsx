import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Locale } from "@/config/i18n.config";

export default function AuthLayouts({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
	const isVerified = JSON.parse(cookies().get("user")?.value || "{}")?.is_verified;
	const token = cookies().get("token")?.value;

	if (token && isVerified) return redirect(`/${params.lang}/`);

	return <>{children}</>;
}
