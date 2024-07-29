/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFields from "@/components/common/froms/form-field";
import Select from "@/components/common/froms/select";
import { addressFormSchema } from "@/schemas/address-schema";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import LoadingButton from "@/components/common/buttons/loading-button";
import { Button } from "@/components/ui/button";
import { useCountriesQuery } from "@/hooks/cart/use-cart-hooks";
import { updateData } from "@/utils";
import { useAddAddressMutation, useUpdateAddressMutation } from "@/hooks/profile/use-profile-mutation-hooks";
import { useAddFromStore, useCitiesStore, useDetailsIdStore } from "@/store";
import { useShowAddressQuery } from "@/hooks/profile/use-profile-hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useGetCountriesMutation } from "@/hooks/cart/use-cart-mutation-hooks";

type Props = {
	closeModal: () => void;
	inAdd?: boolean;
	center: { lat: number; lng: number };
	setCenter: (value: { lat: number; lng: number }) => void;
};

const AddressForm = ({ closeModal, center, inAdd, setCenter }: Props) => {
	const { detailsId } = useDetailsIdStore();
	const { addFrom, setAddFrom } = useAddFromStore();
	const { cities } = useCitiesStore();
	const router = useRouter();
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";

	const [isDefault, setIsDefault] = React.useState<CheckedState>(false);

	const formSchema = addressFormSchema(isRTL);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			kind: "",
			country_id: "",
			city_id: "",
			postal: "",
			address: "",
		},
	});
	const { data: countries, isPending: isPendingCountries } = useCountriesQuery();
	const updateCountries = updateData(countries?.data, isPendingCountries, "name", "id");
	const { mutate: getCities, isPending: isPendingCities } = useGetCountriesMutation();
	const updateCities = updateData(cities, isPendingCities, "name", "id");
	const { data: showAddress, isFetching: isPendingShow } = useShowAddressQuery({
		id: detailsId as any,
	});

	const { mutate: mutateAdd, isPending } = useAddAddressMutation({
		resetFunction:
			addFrom === "cart"
				? () => {
						closeModal();
						setAddFrom("cart");
						form.reset();
						setIsDefault(false);
					}
				: () => {
						router.replace(`/${isRTL ? "ar" : "en"}/delivery-address`);
						form.reset();
						setIsDefault(false);
					},
	});
	const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateAddressMutation({
		resetFunction:
			addFrom === "cart"
				? () => {
						closeModal();
						setAddFrom("cart");
					}
				: () => router.replace(`/${isRTL ? "ar" : "en"}/delivery-address`),
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const reqData = {
			...data,
			...center,
			nearest_place: "place",
			is_default: isDefault ? 1 : 0,
		};
		detailsId ? mutateUpdate({ id: `${detailsId}`, ...reqData }) : mutateAdd(reqData);
	};

	useEffect(() => {
		if (!isPendingShow && detailsId) {
			const kind = showAddress?.data?.kind_key === "الرئيسية" ? "home" : showAddress?.data?.kind_key;
			form.setValue("kind", kind);
			form.setValue("country_id", `${showAddress?.data?.country_id}`);
			getCities(showAddress?.data?.country_id);
			form.setValue("postal", showAddress?.data?.postal);
			form.setValue("address", showAddress?.data?.address);
			setIsDefault(showAddress?.data?.is_default === 1);
			setCenter({
				lat: showAddress?.data?.lat,
				lng: showAddress?.data?.lng,
			});
		}
	}, [detailsId, isPendingShow, showAddress, form, setIsDefault, setCenter]);
	useEffect(() => {
		if (!isPendingShow && !isPendingCities && detailsId) {
			form.setValue("city_id", `${showAddress?.data?.city_id}`);
		}
	}, [detailsId, showAddress, form, isPendingShow, isPendingCities]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="z-10 space-y-4 md:space-y-6">
				<div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Select
						control={form.control}
						name="kind"
						label={isRTL ? "نوع العنوان" : "Choose Address type"}
						holder={""}
						options={[
							{ label: isRTL ? "المنزل" : "Home", value: "house" },
							{ label: isRTL ? "العمل" : "Work", value: "work" },
							{ label: isRTL ? "غير محدد" : "Other", value: "other" },
						]}
					/>
					<Select
						control={form.control}
						notFound={isRTL ? "لا يوجد بيانات" : "No data found"}
						name="country_id"
						label={isRTL ? "الدولة" : "Country"}
						holder={""}
						options={updateCountries || []}
						getCitiesData={(cityId: any) => getCities(cityId)}
						withSearch={true}
					/>
					<Select
						control={form.control}
						notFound={isRTL ? "لا يوجد بيانات" : "No data found"}
						name="city_id"
						label={isRTL ? "المدينة" : "City"}
						holder={""}
						options={updateCities || []}
						withSearch={true}
					/>
					<FormFields
						control={form.control}
						name="postal"
						label={isRTL ? "الرمز البريدي" : "Postal Code"}
						holder={""}
					/>
				</div>
				<FormFields
					control={form.control}
					name="address"
					label={isRTL ? "الوصف" : "Description"}
					holder={isRTL ? "اكتب وصف العنوان هنا..." : "Write your address description here ..."}
					textarea
					rows={4}
				/>
				<div className="flex items-center gap-x-2">
					<Checkbox
						id="is_default"
						checked={isDefault}
						onCheckedChange={(value) => setIsDefault(value)}
					/>
					<label
						htmlFor="is_default"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{isRTL ? "العنوان الافتراضي" : "Default Address"}
					</label>
				</div>

				<div className={`flex items-center ${inAdd ? "justify-start" : "justify-center"} gap-2`}>
					{!inAdd && (
						<Button
							className="h-[50px] w-full"
							onClick={closeModal}
							variant={"destructive"}>
							<span className="text-lg">{isRTL ? "الغاء" : "Cancel"}</span>
						</Button>
					)}
					<LoadingButton
						isLoading={isPending || isPendingUpdate}
						variant="default"
						className={`${inAdd ? "h-[45px] w-full max-w-[200px]" : "h-[50px] w-full"}`}>
						<span className="text-lg">{isRTL ? "تأكيد" : "Confirm"}</span>
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
};

export default AddressForm;
