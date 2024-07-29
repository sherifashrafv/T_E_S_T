"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteCookiesClientSide, getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useLogoutMutation } from "@/hooks/auth/use-auth-mutations-hooks";
import { Loader2Icon } from "lucide-react";

type Props = {
	item: {
		id: number;
		name: string;
		href: string;
		icon: any;
		active: string;
		logout?: boolean;
	};
};

const SideItems = ({ item }: Props) => {
	const device = getCookiesClientSide("device_id");
	const router = useRouter();

	const { mutate, isPending } = useLogoutMutation({
		redirect: () => {
			deleteCookiesClientSide("user");
			deleteCookiesClientSide("token");
			deleteCookiesClientSide("device_id");

			router.push("/");
			router.refresh();
		},
	});

	return (
		<Link
			className={`flex h-[40px] items-center justify-start gap-3 rounded px-2 py-1 hover:bg-card-card2 hover:text-primary ${item.active === item.href?.slice(3) && "bg-card-card2 text-primary"}`}
			onClick={() => (item.logout ? mutate({ device_id: device } as any) : null)}
			href={item.href}>
			{item.logout && isPending ? (
				<Loader2Icon
					className="animate-spin"
					size={20}
				/>
			) : (
				<>
					<div className="relative size-[24px]">
						<Image
							src={item.icon}
							alt={item.name}
							fill
							priority
						/>
					</div>
					<span className={`${item.logout ? "text-red-400" : ""}`}>{item.name}</span>
				</>
			)}
		</Link>
	);
};

export default SideItems;
