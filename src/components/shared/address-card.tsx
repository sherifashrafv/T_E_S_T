"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loader2Icon, MapPin, Trash2 } from "lucide-react";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Checkbox } from "@/components/ui/checkbox";
import { icons } from "@/constants";
import { AddressProps } from "@/types";
import { useDetailsIdStore, useOrderSummaryStore, useOrderTypeStore } from "@/store";
import { useDeleteAddressMutation, useUpdateAddressMutation } from "@/hooks/profile/use-profile-mutation-hooks";

type Props = {
	address: AddressProps;
	refetch: () => void;
	fromProfile?: boolean;
	fromDetails?: boolean;
	active: boolean;
	findValue?: (items: any[], count: number) => string | number;
	updateGrandTotal?: (shipping: number | any) => void;
};

const AddressCard = ({ active, address, refetch, fromDetails, fromProfile, findValue, updateGrandTotal }: Props) => {
	const isActive = fromProfile ? active : false;
	const { setDetailsId } = useDetailsIdStore();
	const { items, setShippingFees } = useOrderSummaryStore();
	const { setAddressId, addressId } = useOrderTypeStore();

	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const { mutate: deleteAddress, isPending } = useDeleteAddressMutation({
		resetFunction: () => refetch(),
	});
	const { mutate: updateAddress, isPending: isPendingUpdate } = useUpdateAddressMutation({
		resetFunction: () => refetch(),
	});

	const handleUpdate = () => {
		const data: any = { ...address, id: address?.id, is_default: 1 };
		delete data.name;

		updateAddress(data);
	};

	return (
		<div
			className={`flex min-h-[128px] w-full flex-col items-start justify-between gap-3 rounded border border-border p-4 md:flex-row ${(isActive || addressId === address?.id) && "border-primary"}`}>
			<div className="flex w-full items-center justify-start gap-5 sm:justify-between md:w-fit">
				<div className="flex size-20 items-center justify-center rounded bg-primary">
					<MapPin
						size={40}
						color="white"
					/>
				</div>
				<div className="flex flex-1 flex-col gap-3">
					<div className="flex w-full items-center justify-between">
						<h1 className="text-lg font-[700] capitalize text-primary">
							{address?.kind === "الرئيسية"
								? isRTL
									? "الرئيسية"
									: "Home"
								: address?.kind === "other"
									? isRTL
										? "اخر"
										: "Other"
									: address?.kind}
						</h1>
						{!fromDetails && (
							<Checkbox
								onClick={() => {
									setAddressId(address?.id === addressId ? null : address?.id);
									const results = findValue?.(address?.shipping_fees, items);
									setShippingFees(results);
									updateGrandTotal?.(typeof results === "string" ? 0 : results);
								}}
								value={address?.id}
								id={address?.kind}
								checked={isActive || address?.id === addressId}
								className="peer block size-5 border border-border checked:border checked:border-primary md:hidden"
							/>
						)}
					</div>
					<div>
						<h4 className="text-[12px] font-[400] text-secondary-gray">{address?.country}</h4>
						<span className="text-[12px] font-[400] text-secondary-gray">
							{address?.country}, {address?.city}, {address?.postal}
						</span>
					</div>
				</div>
			</div>
			{!fromDetails && (
				<div className="hidden flex-col gap-2 md:flex">
					<div className="flex items-center justify-end gap-2">
						<Checkbox
							onClick={() => {
								setAddressId(address?.id === addressId ? null : address?.id);
								const results = findValue?.(address?.shipping_fees, items);
								setShippingFees(results);
								updateGrandTotal?.(typeof results === "string" ? 0 : results);
							}}
							disabled={fromProfile && !isActive}
							value={address?.id}
							id={address?.kind}
							checked={isActive || address?.id === addressId}
							className="peer size-5 border border-primary checked:border checked:border-primary disabled:cursor-not-allowed disabled:border-border"
						/>
						<label
							htmlFor={!fromProfile && !isActive ? address?.kind : ""}
							className="text-sm font-medium leading-none peer-checked:font-[700] peer-checked:text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							{isRTL ? "اختر عنوان" : "Choose Address"}
						</label>
					</div>
					<div className="flex items-center justify-end gap-2">
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Trash2
								onClick={() => deleteAddress({ id: address?.id })}
								size={20}
								color="red"
								className="cursor-pointer"
							/>
						)}
						<Image
							onClick={() => {
								setDetailsId(address?.id);
								router.push(`/${isRTL ? "ar" : "en"}/delivery-address/add`);
							}}
							src={icons.edit}
							alt="edit"
							width={20}
							priority
							height={20}
							className="cursor-pointer"
						/>
					</div>
					<p
						className={`text-xs font-[400] text-secondary-gray ${!active && "cursor-pointer underline"} text-end`}
						onClick={() => !active && handleUpdate()}>
						{isPendingUpdate ? (
							<Loader2Icon className="animate-spin" />
						) : active ? (
							isRTL ? (
								"العنوان الافتراضي"
							) : (
								"Default Address"
							)
						) : isRTL ? (
							"تعيين كعنوان افتراضي"
						) : (
							"Set As A Default Address "
						)}
					</p>
				</div>
			)}
			{!fromDetails && (
				<div className="flex items-center justify-start gap-2 md:hidden">
					<div className="flex items-center justify-end gap-2">
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Trash2
								onClick={() => deleteAddress({ id: address?.id })}
								size={20}
								color="red"
								className="cursor-pointer"
							/>
						)}
						<Image
							onClick={() => {
								setDetailsId(address?.id);
								router.push(`/${isRTL ? "ar" : "en"}/delivery-address/add`);
							}}
							src={icons.edit}
							alt="edit"
							width={16}
							priority
							height={16}
							className="cursor-pointer"
						/>
					</div>
					<p
						className={`text-xs font-[400] text-secondary-gray ${!active && "cursor-pointer underline"} text-end`}
						onClick={() => !active && updateAddress({ ...address, id: address?.id, is_default: 1 })}>
						{isPendingUpdate ? (
							<Loader2Icon className="animate-spin" />
						) : active ? (
							isRTL ? (
								"العنوان الافتراضي"
							) : (
								"Default Address"
							)
						) : isRTL ? (
							"تعيين كعنوان افتراضي"
						) : (
							"Set As A Default Address "
						)}
					</p>
				</div>
			)}
		</div>
	);
};

export default AddressCard;
