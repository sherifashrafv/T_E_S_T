"use client";

import React from "react";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const MapContainer = ({ center, setCenter }: { center: { lat: number; lng: number }; setCenter: any }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyBGrfzw_Qd0p8vzu4ySc5aAZRalrH1EgEY",
		libraries: ["places"],
	});

	if (loadError) {
		return <div>Error loading maps</div>;
	}

	if (!isLoaded) {
		return <div>Loading maps</div>;
	}

	return (
		<GoogleMap
			mapContainerStyle={{ width: "100%", height: "250px" }}
			zoom={10}
			center={center}>
			<Marker position={center} />
		</GoogleMap>
	);
};

export default MapContainer;
