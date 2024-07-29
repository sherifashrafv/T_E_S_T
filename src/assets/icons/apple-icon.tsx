import React from "react";

const AppleIcon = ({ fill, className }: { fill?: string; className?: string }) => {
	return (
		<svg
			viewBox="0 0 25 30"
			fill="none"
			className="size-[20px] md:size-[30px]"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.6493 15.5042C20.6154 11.8381 23.7281 10.0545 23.8704 9.97144C22.1076 7.46553 19.3753 7.12314 18.4151 7.09584C16.1203 6.86038 13.8943 8.43468 12.7253 8.43468C11.5329 8.43468 9.73277 7.11859 7.79261 7.15726C5.29594 7.1948 2.96027 8.60416 1.67927 10.7927C-0.964394 15.2551 1.00727 21.8128 3.54011 25.4198C4.80711 27.1864 6.28761 29.1588 8.22544 29.0894C10.1213 29.0132 10.8294 27.9109 13.1173 27.9109C15.3841 27.9109 16.0491 29.0894 18.0254 29.045C20.0601 29.0132 21.3411 27.2705 22.5638 25.4881C24.0279 23.4633 24.6159 21.4693 24.6393 21.3669C24.5914 21.351 20.6878 19.8984 20.6493 15.5042Z"
				fill={fill}
				className={className}
			/>
			<path
				d="M16.9159 4.72301C17.9356 3.47973 18.6333 1.78826 18.4396 0.0717773C16.9638 0.135477 15.1181 1.06709 14.0553 2.28308C13.1149 3.3546 12.2749 5.1109 12.4919 6.76255C14.1498 6.88313 15.8519 5.94696 16.9159 4.72301Z"
				fill={fill}
				className={className}
			/>
		</svg>
	);
};

export default AppleIcon;
