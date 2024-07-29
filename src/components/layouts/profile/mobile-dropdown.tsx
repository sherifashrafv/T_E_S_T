import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteCookiesClientSide, getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useLogoutMutation } from "@/hooks/auth/use-auth-mutations-hooks";
import { ChevronDown, Loader2Icon } from "lucide-react";
import GlobalDropdown from "@/components/shared/drop-down";

type MenuItems = {
	id: number;
	name: string;
	href: string;
	icon: any;
	active: string;
	logout?: boolean;
};

const MobileDropdown = ({ MenuItems }: { MenuItems: MenuItems[] }) => {
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

	const getActive = MenuItems.filter((item) => item.active === item.href?.slice(3));

	return (
		<div className="mb-5 flex h-[64px] w-full items-center justify-center rounded-md bg-card-card2 p-5 md:hidden">
			<GlobalDropdown
				triggerChildren={
					<div className="flex w-full cursor-pointer items-center justify-center gap-3 rounded bg-white py-2">
						<div className="relative size-5">
							<Image
								src={getActive?.[0]?.icon}
								alt={getActive?.[0]?.name}
								fill
								priority
							/>
						</div>
						{getActive?.[0]?.name}
						<ChevronDown />
					</div>
				}>
				{MenuItems.map(({ id, name, href, icon, active, logout }) => {
					return (
						<DropdownMenuItem
							className={`${active === href?.slice(3) ? "bg-card-card2" : ""}`}
							key={id}
							onClick={() => (logout ? mutate({ device_id: device } as any) : null)}>
							{logout && isPending ? (
								<Loader2Icon
									className="animate-spin"
									size={20}
								/>
							) : (
								<Link
									href={href}
									className={`flex size-full items-center justify-start gap-2 ${logout ? "text-red-500" : "text-primary"}`}>
									<div className="relative size-5">
										<Image
											src={icon}
											alt={name}
											fill
											priority
										/>
									</div>
									{name}
								</Link>
							)}
						</DropdownMenuItem>
					);
				})}
			</GlobalDropdown>
		</div>
	);
};

export default MobileDropdown;
