import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<LoaderCircle className="size-10 animate-spin" />
		</div>
	);
};

export default Loading;
