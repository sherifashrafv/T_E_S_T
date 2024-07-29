import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "admin.chique.technoraft.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "admin.chiquebouttique.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.wallpapersden.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "testoraft.chiquebouttique.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default MillionLint.next({
	rsc: true,
})(nextConfig);
