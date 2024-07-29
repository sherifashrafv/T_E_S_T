"use client";

import React from "react";

import { Modal } from "../common/modals/modal";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import AddressWrapper from "./address-wrapper";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	refetch: () => void;
};

const AddressModal = ({ isOpen, setIsOpen, refetch }: Props) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			className="max-h-[650px] overflow-y-auto md:max-w-[800px]"
			title={isRTL ? "اضافة عنوان جديد" : "Add New Address"}>
			<AddressWrapper
				closeModal={() => {
					setIsOpen(false);
					refetch();
				}}
				inAdd={false}
			/>
		</Modal>
	);
};

export default AddressModal;
