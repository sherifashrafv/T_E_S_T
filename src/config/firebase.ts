import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from "localforage";

// Firebase Configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBGxe2rlefijPS3oZraFJFQ17F6RG-Fd3w",
	authDomain: process.env.FIREBASE_AUTH_DOMAIN || "chique-bouttique.firebaseapp.com",
	projectId: process.env.FIREBASE_PROJECT_ID || "chique-bouttique",
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "chique-bouttique.appspot.com",
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "750877595888",
	appId: process.env.FIREBASE_APP_ID || "1:750877595888:web:404dc44a3a5080c14cca35",
	measurementId: process.env.MEASUREMENT_ID || "G-ZWTBBLWE3E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Create Auth
const auth = getAuth(app);

const firebaseCloudMessaging = {
	init: async () => {
		try {
			const messaging = getMessaging(app);

			const tokenInLocalForage = await localforage.getItem("fcm_token");

			// Returns the token if it exists in local storage
			if (tokenInLocalForage !== null) {
				return tokenInLocalForage;
			}

			// Request notifications permission from the browser
			const status = await Notification.requestPermission();
			if (status && status === "granted") {
				// Get a new registration token from Firebase
				const fcmToken = await getToken(messaging, {
					vapidKey: process.env.VAPID_KEY,
				});

				// Set the token in local storage
				if (fcmToken) {
					await localforage.setItem("fcm_token", fcmToken);
					return fcmToken;
				}
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	},
};

export { firebaseCloudMessaging, auth };
