"use client";

import React from "react";
import Image from "next/image";

import CartHeader from "@/components/shared/cart-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { icons } from "@/constants";
import ProfileForm from "./profile-form";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useProfileQuery } from "@/hooks/profile/use-profile-hooks";
import { Loader2Icon } from "lucide-react";

const ProfileWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [newImage, setNewImage] = React.useState<{ newFile: File | {}; url: string }>({
		newFile: {},
		url: "",
	});

	const { data: profile, isPending, refetch } = useProfileQuery();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setNewImage({ newFile: file, url: URL.createObjectURL(file) });
	};

	return (
		<div className="flex h-full flex-col gap-5">
			<CartHeader title={isRTL ? "إعدادات الحساب" : "Account Settings"} />
			{isPending ? (
				<div className="flex size-full items-center justify-center">
					<Loader2Icon className="size-10 animate-spin" />
				</div>
			) : (
				<>
					<div className="relative mb-5 w-fit">
						<Avatar className="size-[76px]">
							<AvatarImage
								src={newImage?.url || profile?.data?.user?.avatar}
								alt="@ms"
							/>
							<AvatarFallback className="text-sm font-[400]">{profile?.data?.user?.name}</AvatarFallback>
						</Avatar>

						<div className="absolute -bottom-2 left-3 cursor-pointer">
							<label className="flex size-[27px] cursor-pointer items-center justify-center rounded-full bg-primary">
								<div className="relative size-[16px]">
									<Image
										src={icons.editG}
										alt="edit"
										fill
										priority
									/>
								</div>

								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleFileChange}
								/>
							</label>
						</div>
					</div>

					<ProfileForm
						newAvatar={newImage?.newFile}
						user={profile?.data?.user}
						refetch={refetch}
					/>
				</>
			)}
		</div>
	);
};

export default ProfileWrapper;
