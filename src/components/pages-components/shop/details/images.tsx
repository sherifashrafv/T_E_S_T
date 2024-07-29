"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import Fancybox from "@/components/common/Fancybox";
import { Lightbox } from "react-modal-image";
import { useDetailsImagesStore } from "@/store";
import { PlayCircle } from "lucide-react";

const Images = ({ getShopDetails }: { getShopDetails: any }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const { images } = useDetailsImagesStore();

	const videoRefs = React.useRef<any>([]);
	const [openBox, setOpenBox] = React.useState({
		isOpen: false,
		image: "",
	});
	const [width, setWidth] = React.useState(window.innerWidth);
	const [api, setApi] = React.useState<CarouselApi | null>(null);
	const [activeIndex, setActiveIndex] = React.useState<number>(0);
	const [[x, y], setXY] = React.useState([0, 0]);
	const [[imgWidth, imgHeight], setSize] = React.useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = React.useState(false);

	// Handle play event
	const handlePlay = (index: number) => {
		videoRefs.current.forEach((video: any, i: number) => {
			if (i !== index && video) {
				video.pause();
			} else if (i === index && video) {
				video.play();
			}
		});
	};

	useEffect(() => {
		if (!api) return;
		const scrollSnapList = api.scrollSnapList();
		setActiveIndex(scrollSnapList.indexOf(api.selectedScrollSnap()) + 1);
		api.on("select", () => {
			setActiveIndex(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex w-full flex-col gap-5 lg:w-[544px] lg:flex-row">
			<Carousel
				ref={api as any}
				setApi={setApi}
				className="w-full"
				opts={{ direction: isRTL ? "rtl" : "ltr" }}>
				<CarouselContent ref={api as any}>
					{images.map((image: any, index: number) => {
						return (
							<CarouselItem key={index}>
								{image?.type === "image" ? (
									<Fancybox
										options={{
											Carousel: {
												infinite: false,
											},
										}}>
										<div className="relative h-[374.5px] w-full lg:h-[584px]">
											<Image
												src={image?.src}
												alt={getShopDetails?.name}
												fill
												priority
												className="rounded-md object-cover"
												onClick={() => setOpenBox({ isOpen: true, image: image?.src })}
												onMouseEnter={(e) => {
													// update image size and turn-on magnifier
													const elem = e.currentTarget;
													const { width, height } = elem.getBoundingClientRect();
													setSize([width, height]);
													setShowMagnifier(true);
												}}
												onMouseMove={(e) => {
													// update cursor position
													const elem = e.currentTarget;
													const { top, left } = elem.getBoundingClientRect();

													// calculate cursor position on the image
													const x = e.pageX - left - window.pageXOffset;
													const y = e.pageY - top - window.pageYOffset;
													setXY([x, y]);
												}}
												onMouseLeave={() => {
													// close magnifier
													setShowMagnifier(false);
												}}
											/>
											<div
												className="tablet:!hidden"
												style={{
													display: showMagnifier ? "" : "none",
													position: "absolute",

													// prevent maginier blocks the mousemove event of img
													pointerEvents: "none",
													// set size of magnifier
													height: `${300}px`,
													width: `${300}px`,
													// move element center to cursor pos
													top: `${y - 300 / 2}px`,
													left: `${x - 300 / 2}px`,
													opacity: "1", // reduce opacity so you can verify position
													border: "1px solid lightgray",
													backgroundColor: "white",
													backgroundImage: `url('${image?.src}')`,
													backgroundRepeat: "no-repeat",

													// calculate zoomed image size
													backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,

													// calculete position of zoomed image.
													backgroundPositionX: `${-x * 1.5 + 300 / 2}px`,
													backgroundPositionY: `${-y * 1.5 + 300 / 2}px`,
												}}></div>
										</div>
									</Fancybox>
								) : (
									<video
										ref={(el: any) => (videoRefs.current[index] = el)}
										className="h-[374.5px] w-full lg:h-[584px]"
										controls
										onPlay={() => handlePlay(index)}>
										<source
											src={image?.src}
											type="video/mp4"
										/>
									</video>
								)}
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>

			<div className="flex items-center justify-center">
				<Carousel
					className="flex w-full flex-col"
					orientation={width <= 1019 ? "horizontal" : "vertical"}
					opts={{ direction: isRTL ? "rtl" : "ltr" }}>
					<CarouselContent className={width <= 1019 ? "-ml-4" : "-ml-4 h-[500px]"}>
						{images.map((image: any, index: number) => {
							return (
								<CarouselItem
									key={index}
									className="basis-1/3 pl-4 pt-4 md:basis-1/3">
									<div className={`${activeIndex === index + 1 ? "opacity-100" : "opacity-50"}`}>
										{image?.type === "image" ? (
											<Image
												onClick={() => {
													api?.scrollTo(index);
													handlePlay(index);
												}}
												src={image?.src}
												alt={getShopDetails?.name}
												width={124}
												height={160}
												priority
												className="h-[160px] w-[124px] rounded-md object-cover"
											/>
										) : (
											<div className="relative">
												<video
													onClick={() => {
														api?.scrollTo(index);
														handlePlay(index);
													}}
													className="h-[160px] w-[124px] rounded-md object-cover">
													<source
														src={image?.src}
														type="video/mp4"
													/>
												</video>

												<PlayCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
											</div>
										)}
									</div>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselNext className="hidden size-10 rounded-md bg-card-card2 md:flex" />
					<CarouselPrevious className="hidden size-10 rounded-md bg-card-card2 md:flex" />
				</Carousel>
			</div>

			{/* @ts-ignore */}
			{openBox?.isOpen && (
				<Lightbox
					small={openBox?.image}
					medium={openBox?.image}
					large={openBox?.image}
					alt="image"
					// @ts-ignore
					onClose={() => setOpenBox({ isOpen: false, image: "" })}
				/>
			)}
		</div>
	);
};

export default Images;
