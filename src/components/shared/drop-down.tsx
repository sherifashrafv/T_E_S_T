import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

const GlobalDropdown = ({
	triggerChildren,
	children,
	className,
}: {
	triggerChildren: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerChildren}</DropdownMenuTrigger>
			<DropdownMenuContent className={`${className}`}>{children}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default GlobalDropdown;
