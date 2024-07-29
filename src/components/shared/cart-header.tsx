import React from "react";

const CartHeader = ({ title }: { title: string }) => {
	return (
		<div className="border-b border-b-border pb-2">
			<h1 className="text-lg font-[700] text-primary">{title}</h1>
		</div>
	);
};

export default CartHeader;
