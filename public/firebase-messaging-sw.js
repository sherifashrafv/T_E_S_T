/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
	apiKey: "AIzaSyBYHe_gPGgwuiAv1VvmEUp44hZsoj7KYLQ",
	authDomain: "t-closet-eae05.firebaseapp.com",
	projectId: "t-closet-eae05",
	storageBucket: "t-closet-eae05.appspot.com",
	messagingSenderId: "714829433158",
	appId: "1:714829433158:web:55d86fb30b56b71c837d47",
	measurementId: "G-X92YB2EJFL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log("[firebase-messaging-sw.js] Received background message ", payload);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
