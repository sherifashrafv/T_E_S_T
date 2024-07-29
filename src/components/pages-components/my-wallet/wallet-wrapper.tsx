"use client";

import React from "react";
import Image from "next/image";

import CartHeader from "@/components/shared/cart-header";
import { Button } from "@/components/ui/button";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { icons } from "@/constants";
import { useWalletQuery } from "@/hooks/profile/use-profile-hooks";
import { Loader2Icon } from "lucide-react";
import WalletModal from "./wallet-modal";

const WalletWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [open, setOpen] = React.useState(false);

	const { data: wallet, isFetching, refetch } = useWalletQuery();

	return (
		<div className="flex w-full flex-col gap-5">
			<CartHeader title={isRTL ? "محفظتي" : "My Wallet"} />
			<div className="flex size-full flex-col items-center justify-center gap-5">
				<div className="flex h-[233px] w-full max-w-[593px] flex-col items-center justify-center gap-3 bg-card-card2">
					<div className="relative size-[64px]">
						<Image
							src={icons.wallet}
							alt="wallet"
							fill
							priority
						/>
					</div>
					{isFetching ? (
						<div className="flex items-center justify-center">
							<Loader2Icon className="mx-auto size-5 animate-spin" />
						</div>
					) : (
						<h1 className="text-lg font-[700] text-primary">{wallet?.data?.wallet || 0}</h1>
					)}
				</div>
				<Button
					className="w-full max-w-[266px]"
					onClick={() => setOpen(true)}>
					{isRTL ? "اشحن المحفظة" : "Charge Your Wallet"}
				</Button>
				<WalletModal
					isOpen={open}
					setIsOpen={setOpen}
					refetch={refetch}
				/>
			</div>
		</div>
	);
};

export default WalletWrapper;
