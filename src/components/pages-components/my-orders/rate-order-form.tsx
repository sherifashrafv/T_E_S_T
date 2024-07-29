"use client";

import React, { useState } from "react";

import CartProductCard from "../cart/product-card";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Loader2Icon, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/common/buttons/loading-button";
import { useRateOrderMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import { useOrderDetailsQuery } from "@/hooks/profile/use-profile-hooks";

const RateOrderForm = ({ closeModal, order }: { closeModal: () => void; order: any }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [message, setMessage] = useState("");

	const { data: orderDetails, isFetching } = useOrderDetailsQuery({ id: order?.id as number, inReturn: false });
	const { mutate, isPending } = useRateOrderMutation({ resetFunction: closeModal });

	return (
		<div className="flex w-full flex-col items-center justify-center gap-5">
			{isFetching ? (
				<div className="flex w-full items-center justify-center">
					<Loader2Icon className="animate-spin" />
				</div>
			) : (
				orderDetails?.data?.items?.map((product: any) => {
					return (
						<CartProductCard
							inRate
							key={product.id}
							product={product}
							refetch={() => {}}
						/>
					);
				})
			)}
			<div className="flex space-x-1">
				{[...Array(5)].map((_, index) => {
					const ratingValue = index + 1;

					return (
						<button
							key={index}
							type="button"
							className="focus:outline-none"
							onClick={() => setRating(ratingValue)}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(rating)}>
							<Star
								className={`size-10 ${ratingValue <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
								fill={ratingValue <= (hover || rating) ? "currentColor" : "none"}
							/>
						</button>
					);
				})}
			</div>

			<div className="flex w-full flex-col gap-3">
				<label
					htmlFor="message"
					className="text-sm font-medium leading-none">
					{isRTL ? "شارك تجربتك معنا" : "Share your experience with us"}
				</label>
				<Textarea
					rows={4}
					className="w-full resize-none"
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</div>

			<div className="flex w-full items-center justify-center gap-5">
				<LoadingButton
					onClick={() => mutate({ id: order.id, message, value: rating })}
					isLoading={isPending}
					disabled={message === "" || rating === 0}
					variant={"default"}
					className="h-[50px] w-full bg-primary">
					{isRTL ? "تأكيد" : "Confirm"}
				</LoadingButton>
				<Button
					onClick={closeModal}
					variant={"outline"}
					className="h-[50px] w-full">
					{isRTL ? "رجوع" : "Back"}
				</Button>
			</div>
		</div>
	);
};

export default RateOrderForm;
