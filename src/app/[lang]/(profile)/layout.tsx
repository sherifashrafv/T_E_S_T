import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Locale } from "@/config/i18n.config";

export default function ProfileLayouts({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
	const token = cookies().get("token")?.value;

	if (!token) return redirect(`/${params.lang}/`);

	return <>{children}</>;
}
