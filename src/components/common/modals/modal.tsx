import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
	children: React.ReactNode;
	title: string;
	description?: string;
	className?: string;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

export function Modal({ children, title, description, className, isOpen, setIsOpen }: Props) {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogContent className={`sm:max-w-[425px] ${className}`}>
				<DialogHeader className="flex items-center justify-between">
					<DialogTitle className="text-lg font-[700]">{title}</DialogTitle>
					<DialogDescription className="text-center text-sm font-[400]">{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
