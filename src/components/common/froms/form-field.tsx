import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputWithIcon from "./Input";
import { Eye, EyeOff } from "lucide-react";

type Props = {
	control: any;
	name: string;
	label?: string;
	holder?: string;
	textarea?: boolean;
	isPassword?: boolean;
	setShow?: (value: boolean) => void;
	show?: boolean;
	lang?: string;
	rows?: number;
};

const FormFields = ({ control, name, label, holder, rows, textarea, isPassword, setShow = () => {}, show, lang }: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{textarea ? (
							<Textarea
								placeholder={holder}
								rows={rows || 6}
								className="w-full resize-none"
								{...field}
							/>
						) : isPassword ? (
							<InputWithIcon
								icon={show ? Eye : EyeOff}
								iconAction={() => setShow(!show)}
								lang={lang!}
								className={`${lang === "ar" ? "pl-8" : "pr-8"} h-[45px] w-full`}
								isPassword
								placeholder={holder}
								parentClass="!py-0"
								type={show ? "text" : "password"}
								{...field}
							/>
						) : (
							<Input
								className="h-[45px] w-full"
								placeholder={holder}
								{...field}
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormFields;
