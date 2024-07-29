/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { toast } from "sonner";

import AddressForm from "../pages-components/choose-address/address-form";
import MapContainer from "./Map";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";

const AddressWrapper = ({ closeModal, inAdd }: { closeModal: () => void; inAdd?: boolean }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [map, setMap] = React.useState<{ lat: number; lng: number }>({
		lat: 0,
		lng: 0,
	});

	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setMap({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		} else {
			toast.error(isRTL ? "يرجى تشغيل الموقع" : "Please enable the location");
		}
	}, []);

	return (
		<div className="flex w-full flex-col gap-3 md:gap-5">
			<MapContainer
				center={map}
				setCenter={setMap}
			/>
			<AddressForm
				closeModal={closeModal}
				inAdd={inAdd}
				center={map}
				setCenter={setMap}
			/>
		</div>
	);
};

export default AddressWrapper;
