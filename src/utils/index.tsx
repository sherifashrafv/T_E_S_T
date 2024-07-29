/* eslint-disable array-callback-return */
export function sumErrors(errorObject: any) {
	let errorArray: string[] = [];

	// Iterate through each key in the errorObject
	for (const key in errorObject) {
		// Concatenate the error messages for each key to the errorArray
		errorArray = errorArray.concat(errorObject[key]);
	}

	return errorArray;
}

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formattedDate = (currentDate: Date) =>
	currentDate.toLocaleString("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

export const updateData = (data: any[], isPending: boolean, labelKey: string, valueKey: string) => {
	if (isPending) {
		return [];
	}

	return (
		data?.map((item: any) => ({
			label: item[labelKey],
			value: `${item[valueKey]}`,
		})) ?? []
	);
};

export const convertedArray = (data: any, isPending: boolean) => {
	return (
		!isPending &&
		Object.entries(data).map(([key, value]) => ({
			key,
			value,
		}))
	);
};

export const getStatusesUpToActive = (data: any[], isPendingStatus: boolean, activeKey: string) => {
	if (isPendingStatus) {
		return [];
	}

	const result = [];
	for (const item of data) {
		result.push(item.key);
		if (item.key === activeKey) break;
	}
	return result;
};

export const showProduct = (isRTL: boolean) => {
	return [
		{ id: 1, title: isRTL ? "جميع المنتجات" : "All Products", value: "0" },
		{ id: 2, title: isRTL ? "العروض فقط" : "Offers only", value: "1" },
	];
};

export const prices = (isRTL: boolean) => {
	return [
		{ id: 1, title: isRTL ? "السعر ( من الأقل إلى الأعلى )" : "Price ( Low to High )", value: "price_asc" },
		{ id: 2, title: isRTL ? "السعر ( من الأعلى إلى الأقل )" : "Price ( High to Low )", value: "price_desc" },
		{ id: 3, title: isRTL ? "ابجدي ( من أ الي ي )" : "Alphabetically ( From A to Z )", value: "a-z" },
		{ id: 4, title: isRTL ? "ابجدي ( من ي الي أ )" : "Alphabetically ( From Z to A )", value: "z-a" },
		{ id: 5, title: isRTL ? "التاريخ ( من الأقدم إلى الأحدث )" : "Newest to oldest", value: "latest" },
		{ id: 6, title: isRTL ? "التاريخ ( من الأحدث إلى الأقدم )" : "Oldest to newest", value: "oldest" },
	];
};

export const handleSendAtDay = (messages: any) => {
	const newMessages: any = messages?.map((message: any) => {
		// sum all the messages from the same day together
		if (message?.send_at) {
			const sendAt: any = new Date(message?.send_at?.slice(0, 10));

			const day = sendAt.toLocaleDateString();

			const dayMessages = messages
				.filter((msg: any) => new Date(msg?.send_at?.slice(0, 10)).toLocaleDateString() === day)
				.map((msg: any) => msg);
			return {
				day,
				messages: dayMessages,
			};
		}
	});
	// remove any duplicate days or Invalid dates
	const uniqueDays = newMessages?.filter((item: any, index: any, self: any) => {
		return index === self.findIndex((t: any) => t?.day === item?.day);
	});
	return uniqueDays;
};
// Debounce function
export const debounce = (callback: Function, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
