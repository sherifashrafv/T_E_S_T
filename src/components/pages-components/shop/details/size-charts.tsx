import React from "react";

const SizeCharts = () => {
	const sizes = [
		{ id: 1, size: "XS", size2: "25-27", size3: "35-38" },
		{ id: 2, size: "S", size2: "28-30", size3: "35-38", color: true },
		{ id: 3, size: "M", size2: "31-33", size3: "35-38" },
		{ id: 4, size: "L", size2: "34-36", size3: "35-38", color: true },
		{ id: 5, size: "XL", size2: "37-39", size3: "35-38" },
		{ id: 6, size: "XS/S", size2: "24-27", size3: "35-38", color: true },
		{ id: 7, size: "S/M", size2: "26-31", size3: "35-38" },
		{ id: 8, size: "M/L", size2: "31-36", size3: "35-38", color: true },
		{ id: 9, size: "L/XL", size2: "36-39", size3: "35-38" },
		{ id: 10, size: "1X", size2: "42-44", size3: "35-38", color: true },
		{ id: 11, size: "2X", size2: "44-46", size3: "35-38" },
		{ id: 12, size: "3X", size2: "25-27", size3: "35-38", color: true },
		{ id: 13, size: "1X/2X", size2: "25-27", size3: "35-38" },
		{ id: 14, size: "2X/3X", size2: "25-27", size3: "35-38", color: true },
		{ id: 15, size: "3X/4X", size2: "25-27", size3: "35-38" },
		{ id: 16, size: "4X", size2: "25-27", size3: "35-38", color: true },
	];

	return (
		<div className="flex w-full flex-col items-center justify-center">
			{sizes.map((size) => (
				<div
					key={size.id}
					className={`flex w-full flex-row items-center justify-center gap-2 rounded-md p-3 ${size.color ? "bg-card-card2" : ""}`}>
					<p className="flex-1 text-center text-[16px] font-[400] leading-[24px] text-primary">{size.size}</p>
					<p className="flex-1 text-center text-[16px] font-[400] leading-[24px] text-primary">{size.size2}</p>
					<p className="flex-1 text-center text-[16px] font-[400] leading-[24px] text-primary">{size.size3}</p>
				</div>
			))}
		</div>
	);
};

export default SizeCharts;
