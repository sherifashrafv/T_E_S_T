import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider_ = new GoogleAuthProvider();

// Auth With Google
export const googleProvider = async (PostSocialLogin: any) => {
	try {
		const result = await signInWithPopup(auth, googleProvider_);
		const user = result as any;

		const registerData = await PostSocialLogin({
			social_token: user._tokenResponse.oauthAccessToken,
			social: "google",
		}).unwrap();

		return registerData;
	} catch (error) {
		console.error("Error signing in with Google:", error);
	}
};
