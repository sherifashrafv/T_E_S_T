"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MenuItems } from "@/types";
import { deleteCookiesClientSide, getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useLogoutMutation } from "@/hooks/auth/use-auth-mutations-hooks";

type Props = {
	MenuItems: MenuItems[];
};

const AfterLoginDropdown = ({ MenuItems }: Props) => {
	const user = JSON.parse(getCookiesClientSide("user") || "{}");
	const device = getCookiesClientSide("device_id");
	const router = useRouter();

	const [open, setOpen] = React.useState(false);

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
		<div>
			<DropdownMenu
				open={open}
				onOpenChange={setOpen}>
				<DropdownMenuTrigger>
					<div
						className="z-50 flex cursor-pointer items-center gap-2"
						onClick={() => setOpen(!open)}>
						<Avatar className="size-[30px]">
							<AvatarImage
								src={user?.avatar}
								alt="@ms"
							/>
							<AvatarFallback className="text-sm font-[400]">{user.name}</AvatarFallback>
						</Avatar>
						<div className="flex items-center gap-1">
							<span className="text-sm font-[500]">{user.name}</span>
							<ChevronDownIcon className="z-20 size-4" />
						</div>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{MenuItems.map(({ id, name, href, logout }) => {
						return (
							<DropdownMenuItem
								key={id}
								onClick={
									logout
										? () => {
												mutate({ device_id: device } as any);
											}
										: () => {
												setOpen(false);
											}
								}>
								{logout && isPending ? (
									<Loader2Icon
										className="z-30 animate-spin"
										size={20}
									/>
								) : (
									<Link
										href={href}
										className={`flex size-full items-center justify-start gap-2`}>
										{name}
									</Link>
								)}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default AfterLoginDropdown;
