"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import LoadingButton from "@/components/common/buttons/loading-button";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { useCancelOrderMutation } from "@/hooks/profile/use-profile-mutation-hooks";

const CancelForm = ({ closeModal, orderId }: { closeModal: () => void; orderId: number }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const formSchema = z.object({
		reason: z.string().min(1, isRTL ? "السبب مطلوب" : "Reason is required"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			reason: "",
		},
	});

	const { mutate, isPending } = useCancelOrderMutation({
		resetFunction: () => {
			closeModal();
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({ id: orderId, reason: data.reason } as any);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-8">
				<FormFields
					control={form.control}
					name="reason"
					label={isRTL ? "السبب" : "Reason"}
					holder={""}
					textarea
					rows={4}
				/>

				<LoadingButton
					disabled={form.getValues("reason") === ""}
					isLoading={isPending}
					variant={"destructive"}
					className="h-[50px] w-full">
					{isRTL ? "الغاء الطلب" : "Cancel Order"}
				</LoadingButton>
			</form>
		</Form>
	);
};

export default CancelForm;
