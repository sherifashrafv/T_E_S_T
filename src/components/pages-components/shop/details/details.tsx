"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { icons } from "@/constants";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Modal } from "@/components/common/modals/modal";
import SizeCharts from "./size-charts";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useAddToCartMutation, useFavouriteMutation } from "@/hooks/root/use-root-mutation";
import { useCartOrdersQuery } from "@/hooks/cart/use-cart-hooks";
import { ChevronRight, Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { useDetailsImagesStore, useRefetchWhenFavouriteStore } from "@/store";

type Props = {
	getShopDetails: any;
	refetch: () => void;
};

const Details = ({ getShopDetails, refetch }: Props) => {
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const token = getCookiesClientSide("token");
	const { setImages } = useDetailsImagesStore();
	const { setFavouriteRefetch } = useRefetchWhenFavouriteStore();

	const [colorState, setColorState] = React.useState({
		name: "",
		active: "",
	});
	const [sizeState, setSizeState] = React.useState<{ sizes: any[]; active: string }>({
		sizes: [],
		active: "",
	});
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [quantity, setQuantity] = React.useState(1);
	const [prices, setPrices] = React.useState({
		price: 0,
		discounted_price: 0,
	});

	const { refetch: refetchCart } = useCartOrdersQuery();
	// Mutations
	const { mutate, isPending } = useFavouriteMutation({
		resetFunction: () => {
			router.refresh();

			refetch();
		},
	});
	const { mutate: mutateAddToCart, isPending: isPendingAddToCart } = useAddToCartMutation({
		resetFunction: () => {
			setQuantity(1);
			router.refresh();

			refetchCart();
		},
	});

	const handleFavourite = () => {
		if (!token) {
			router.push(`/${isRTL ? "ar" : "en"}/sign-in`);
			toast.error(
				`${isRTL ? "يرجى تسجيل الدخول أو التسجيل لإضافة المنتج الى المفضلة" : "Please Login or register to add product to favourite"}`
			);
		} else {
			setFavouriteRefetch(true);
			mutate({ product_id: getShopDetails?.id });
		}
	};

	const handleAddToCart = () => {
		if (!token) {
			router.push(`/${isRTL ? "ar" : "en"}/sign-in`);
			toast.error(`${isRTL ? "يرجى تسجيل الدخول أو التسجيل لإضافة المنتج الى السله" : "Please Login or register to add product to cart"}`);
		} else {
			mutateAddToCart({
				id: sizeState?.active,
				quantity,
				all_quantity: 0,
			});
		}
	};
	const handleClickColor = (color: any) => {
		const imageUrls = color?.images
			?.map((image: { id: number; url: string }) => image.url)
			?.map((item: string) => {
				return {
					type: "image",
					src: item,
				};
			});
		const videoUrls = color?.videos
			?.map((video: { id: number; url: string }) => video.url)
			?.map((item: string) => {
				return {
					type: "video",
					src: item,
				};
			});

		setColorState({
			name: color?.name,
			active: color?.id,
		});
		setSizeState({
			sizes: color?.sizes,
			active: color?.sizes?.find((size: any) => size?.quantity > 0)?.id,
		});
		setImages([...imageUrls, ...videoUrls]);
		setPrices({ price: color?.price, discounted_price: color?.price_after_discount });
	};
	useEffect(() => {
		if (!getShopDetails?.colors) return;

		const { colors } = getShopDetails;
		const [firstColor] = colors;
		const { name: colorName, id: colorId, sizes, images, videos, price, price_after_discount: discounted } = firstColor;
		const [firstSize] = sizes;
		const { id: sizeId, quantity } = firstSize;
		const imageUrls = images
			.map((image: { id: number; url: string }) => image.url)
			?.map((item: string) => {
				return {
					type: "image",
					src: item,
				};
			});
		const videoUrls = videos
			.map((video: { id: number; url: string }) => video.url)
			?.map((item: string) => {
				return {
					type: "video",
					src: item,
				};
			});

		setColorState({ name: colorName, active: colorId });
		setSizeState({ sizes, active: quantity === 0 ? "" : sizeId });
		setImages([...imageUrls, ...videoUrls]);
		setPrices({ price, discounted_price: discounted });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getShopDetails?.colors]);

	return (
		<div className="order-2 flex w-full flex-col gap-5 md:order-none md:max-w-[546px] md:gap-10">
			<h4 className="flex items-center justify-start text-sm font-[400] text-primary">
				{isRTL ? "المتجر" : "Shop"}{" "}
				<ChevronRight
					size={18}
					className="text-secondary-gray"
				/>{" "}
				<span className="font-[700]">{getShopDetails?.name}</span>
			</h4>
			<div className="flex flex-col gap-5">
				<h1 className="text-lg font-[700] text-primary md:text-2xl">{getShopDetails?.name}</h1>
				<p
					className="text-sm font-[400] text-secondary-gray"
					dangerouslySetInnerHTML={{ __html: getShopDetails?.description }}
				/>
				<div className="flex flex-col gap-5">
					<h2 className="text-[16px] font-[400] leading-[24px] text-primary">
						{isRTL ? "اختر اللون" : "Choose Color"} : {colorState?.name}
					</h2>
					<div className="flex gap-2">
						{getShopDetails?.colors?.map((color: any) => {
							return (
								<div
									key={color?.id}
									onClick={() => handleClickColor(color)}
									className={`flex size-[32px] cursor-pointer items-center justify-center rounded-full border ${color?.id === colorState?.active ? "border-primary" : "border-[#EEEEEE]"}`}>
									<div
										className="size-[26px] rounded-full"
										style={{ backgroundColor: color?.hex }}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<h3 className="flex items-center justify-start gap-2 text-[16px] font-[400] leading-[24px] text-primary">
						{isRTL ? "اختر المقاس" : "Choose Size"} :{" "}
						<span
							className="flex cursor-pointer gap-1 text-[13px] underline"
							onClick={() => setIsOpen(true)}>
							{isRTL ? "جدول المقاسات" : "Size Chart"}{" "}
							<Image
								src={icons.chart}
								alt="chart"
								width={16}
								height={16}
								priority
							/>
						</span>
					</h3>
					<div className="flex flex-wrap gap-1 md:gap-3">
						{sizeState?.sizes?.map((size: any) => (
							<div
								key={size.id}
								onClick={
									size.quantity > 0
										? () =>
												setSizeState((prevState) => ({
													...prevState,
													active: size.id,
												}))
										: () => {}
								}
								className={`flex h-[35px] w-[45px] items-center justify-center rounded px-3 py-1 ${size.id === sizeState?.active ? "bg-primary text-white" : ""} ${size.quantity > 0 ? "cursor-pointer bg-card-card2" : "relative cursor-not-allowed bg-slate-50 text-secondary-foreground before:absolute before:-left-1 before:bottom-4 before:h-[2px] before:w-full before:-rotate-45 before:bg-secondary-gray"}`}>
								<span className="text-xs font-[400] leading-[24px] text-inherit">{size.name}</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-start gap-5">
					<div className="flex items-center justify-center gap-2">
						<span className="text-[16px] font-[400] leading-[24px] text-primary">{isRTL ? "الكمية:" : "Qty:"}</span>
						<div className="flex h-[40px] w-[94px] items-center justify-center gap-[10px] rounded border">
							<Minus
								size={16}
								className="cursor-pointer"
								onClick={() => quantity > 0 && setQuantity(quantity - 1)}
							/>
							<span className="text-[16px] font-[400] leading-[24px] text-primary">{quantity}</span>
							<Plus
								size={16}
								className="cursor-pointer"
								onClick={() => setQuantity(quantity + 1)}
							/>
						</div>
					</div>
					<h2 className="text-[16px] font-[400] leading-[24px] text-primary">
						{isRTL ? "السعر" : "Price"}:{" "}
						<span className="font-[700]">
							{prices?.discounted_price ? prices?.discounted_price : prices?.price} {getShopDetails?.currency}
						</span>
					</h2>
				</div>
			</div>
			<div className="flex w-full items-center justify-center gap-3 md:gap-5">
				<LoadingButton
					disabled={quantity === 0 || sizeState?.active === (undefined || null || "")}
					onClick={() => handleAddToCart()}
					isLoading={isPendingAddToCart}
					className="flex w-[245px] max-w-[486px] items-center justify-center gap-3 md:w-full">
					<ShoppingCartIcon size={18} />
					{isRTL ? "اضافة الى السلة" : "Add To Cart"}
				</LoadingButton>
				<LoadingButton
					isLoading={isPending}
					onClick={() => handleFavourite()}
					variant="outline">
					<Image
						src={getShopDetails?.is_favoured ? icons.heartBlod : icons.heart}
						alt={getShopDetails?.is_favoured ? "heart" : "unheart"}
						width={18}
						height={18}
						priority
					/>
				</LoadingButton>
			</div>

			<Modal
				isOpen={isOpen}
				setIsOpen={(open) => setIsOpen(open)}
				className="max-h-[70vh] overflow-auto md:max-w-[600px]"
				title={isRTL ? "جدول المقاسات" : "Size Chart"}>
				<SizeCharts />
			</Modal>
		</div>
	);
};

export default Details;
