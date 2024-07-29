import Image from "next/image";
import React from "react";

type Props = {
	name: string;
	value: string;
	icon: any;
};

const ContactCards = ({ name, value, icon }: Props) => {
	return (
		<div
			className="order-2 flex max-h-[173px] w-full flex-1 flex-col items-center justify-center gap-3 rounded-md bg-card-card2 py-5 md:order-1">
			<Image
				src={icon}
				alt={name}
				width={24}
				priority
				height={24}
			/>
			<h3 className="text-lg font-[400] text-[#464547]">{name}</h3>
			<h4 className="max-w-full break-words text-center text-lg font-[700] text-primary">{value}</h4>
		</div>
	);
};

export default ContactCards;
