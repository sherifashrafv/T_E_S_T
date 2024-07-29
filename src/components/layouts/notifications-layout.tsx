"use client";

import { getMessaging, onMessage } from "firebase/messaging";
import { useCallback, useEffect } from "react";
import { Toaster, toast } from "sonner";

import useFirebaseMessaging from "@/hooks/useFirebaseMessaging";
import { app } from "@/config/firebase";

function PushNotificationLayout({ children }: any) {
	useFirebaseMessaging();

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/firebase-messaging-sw.js")
				.then((registration) => {
					console.log("Service worker registered with scope:", registration.scope);
				})
				.catch((error) => {
					console.error("Service worker registration failed:", error);
				});
		}
	}, []);

	const messages = useCallback(() => {
		const messaging = getMessaging(app);
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.addEventListener("message", (event) => console.log(event));
		}
		const unsubscribe = onMessage(messaging, (payload) => {
			if (payload?.notification) {
				const notification = (
					<div>
						<h5>{payload?.notification?.title}</h5>
						<h6>{payload?.notification?.body}</h6>
					</div>
				);

				toast(notification, {
					duration: 3000,
					position: "bottom-right",
					icon: "🔔",
					style: {
						color: "black",
						backgroundColor: "white",
						padding: "1rem",
						borderRadius: "0.5rem",
						boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
						cursor: "pointer",
						fontWeight: "bold",
						fontSize: "1.2rem",
					},
				});

				if ("Notification" in window) {
					const notification = new Notification(payload?.notification?.title as string, {
						body: payload?.notification?.body,
					});
					notification.onclick = () => window.focus();
				}
			}
		});
		return () => unsubscribe();
	}, []);
	useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator && Notification.permission === "granted") {
			messages();
		}
	}, [messages]);

	return (
		<>
			<Toaster
				richColors
				position="top-right"
			/>
			{children}
		</>
	);
}

export default PushNotificationLayout;
