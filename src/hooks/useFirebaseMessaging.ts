import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app as firebaseApp } from "@/config/firebase";

const useFirebaseMessaging = () => {
	useEffect(() => {
		const messaging = getMessaging(firebaseApp);

		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				console.log("Notification permission granted.");

				getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY })
					.then((currentToken) => {
						if (currentToken) {
							localStorage.setItem("fcm_token-store", currentToken);
							localStorage.setItem("fcm_token", currentToken);
							// ...send the token to your server to subscribe the user to notifications
						} else {
							console.log("No registration token available. Request permission to generate one.");
						}
					})
					.catch((err) => {
						console.log("An error occurred while retrieving token. ", err);
					});
			} else {
				// Ask the user for permission
				Notification.requestPermission();
				console.log("Unable to get permission to notify.");
			}
		});
	}, []);
};

export default useFirebaseMessaging;
