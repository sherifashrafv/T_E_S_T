import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
	icon: LucideIcon;
	lang: string;
	iconAction?: () => void;
	parentClass?: string;
	isPassword?: boolean;
	[key: string]: any;
};

const InputWithIcon = ({ icon: Icon, lang, iconAction, isPassword, parentClass, ...props }: Props) => {
	return (
		<div className={`flex w-full items-center py-4 ${parentClass} relative`}>
			{!isPassword && (
				<Icon
					className={`relative ${lang === "ar" ? "right-7" : "left-7"} size-5`}
					onClick={iconAction}
				/>
			)}
			<Input {...props} />
			{isPassword && (
				<Icon
					className={`absolute ${lang === "ar" ? "left-5" : "right-5"} size-5 cursor-pointer`}
					onClick={iconAction}
				/>
			)}
		</div>
	);
};

export default InputWithIcon;
