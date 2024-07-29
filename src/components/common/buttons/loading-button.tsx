import React from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({ isLoading, children, ...props }: { isLoading: boolean; children: React.ReactNode; [key: string]: any }) => {
	return <Button {...props}>{isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : children}</Button>;
};

export default LoadingButton;
