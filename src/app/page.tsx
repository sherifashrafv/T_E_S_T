import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
	const isRTL = cookies().get("NEXT_LOCALE")?.value === "ar";
	redirect(isRTL ? "/ar" : "/en");
}
