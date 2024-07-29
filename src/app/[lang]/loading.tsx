import React from "react";

import { LoaderCircle } from "lucide-react";

const Loading = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<LoaderCircle className="size-10 animate-spin" />
		</div>
	);
};

export default Loading;
