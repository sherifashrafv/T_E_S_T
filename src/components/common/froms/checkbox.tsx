import React from "react";

import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";

type Props = {
	id: string;
	checked: boolean;
	onChange: (event: any) => void;
	label: string;
	value: string;
};

const Checkbox = ({ id, checked, onChange, label, value }: Props) => {
	return (
		<div className="flex items-center gap-x-2">
			<CheckboxComponent
				value={value}
				checked={checked}
				id={id}
				onChange={onChange}
			/>
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
