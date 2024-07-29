/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React from "react";
import EmojiPicker from "emoji-picker-react";
import { io } from "socket.io-client";

import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Send, SmilePlusIcon, Trash2 } from "lucide-react";
import { formattedDate } from "@/utils";
import { useLiveSendChatMutation } from "@/hooks/root/use-root-mutation";

const ChatControll = ({ refetch, handleMessages }: { refetch: Function; handleMessages?: (newMessage: any) => void }) => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const token = getCookiesClientSide("token");
	const user = JSON.parse(getCookiesClientSide("user") || "{}");

	const [socket, setSocket] = React.useState<any>("");
	const [openEmoji, setOpenEmoji] = React.useState(false);
	const ref = React.useRef<any>();
	const [messageWithEmoji, setMessageWithEmoji] = React.useState("");
	const [file, setFile] = React.useState<any>({
		newFile: {},
		url: "",
	});

	const handleEmojiClick = (emoji: string) => {
		setMessageWithEmoji((prev: any) => prev + emoji);
	};

	const { mutate, isPending } = useLiveSendChatMutation({
		resetFunction: () => {
			refetch();
			setMessageWithEmoji("");
			setFile({ newFile: {}, url: "" });
			setOpenEmoji(false);
		},
	});
	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];
	// 	if (!file) return;
	// 	setFile({ newFile: file, url: URL.createObjectURL(file) });
	// };

	React.useEffect(() => {
		const socketInstance = io(`wss://socket.chiquebouttique.com?user_id=${user?.id}&token=${token}`);

		setSocket(socketInstance);
		socketInstance.on("receiveAdminMessage", (data: any) => {
			const updateData =
				data?.message_type === "image"
					? { ...data, message: `data:image/png;base64,${Buffer.from(data?.message).toString("base64")}` }
					: data;

			handleMessages && handleMessages(updateData);

			refetch();

			setMessageWithEmoji("");
			setFile({ newFile: {}, url: "" });
			setOpenEmoji(false);
		});

		return () => {
			socketInstance?.disconnect();
		};
	}, [token, user?.id, handleMessages]);

	const handleSubmit = (type: string) => {
		const messageContent = `${messageWithEmoji}`;
		const dataSend: any = {
			timestamp: +new Date(),
			user_id: user?.id,
			message_type: type,
			message: messageContent,
			file: type === "image" ? file.newFile : null,
		};
		type === "text" ? delete dataSend.file : delete dataSend.message;

		socket?.emit("sendAdminMessage", {
			user_id: user?.id,
			message: messageContent,
			file: type === "image" ? file.newFile : null,
			from_admin: false,
			user: {
				id: user?.id,
				name: user?.name,
				avatar: user?.avatar,
			},
			send_at: formattedDate(new Date()),
			message_type: type,
		});

		mutate(dataSend as any);
	};

	return (
		<div className="flex h-[60px] w-full items-center gap-3 rounded-md border border-border px-2">
			<div className="relative flex items-center justify-center gap-3">
				{/* <label>
					<CameraIcon className="size-[20px] cursor-pointer" />
					<input
						type="file"
						className="hidden"
						onChange={handleFileChange}
						accept="image/*"
						hidden
						ref={ref}
					/>
				</label> */}
				<SmilePlusIcon
					className="size-[20px] cursor-pointer"
					onClick={() => setOpenEmoji(!openEmoji)}
				/>
				<EmojiPicker
					lazyLoadEmojis
					open={openEmoji}
					onEmojiClick={(e: any) => {
						handleEmojiClick(e.emoji);
					}}
				/>
				<div
					className={`absolute left-0 top-[-310px] size-[300px] rounded-md border border-border bg-white shadow-md transition-all duration-200 ${file.url ? "visible opacity-100" : " invisible opacity-0"}`}>
					<Image
						src={file.url}
						alt="image"
						width={300}
						height={80}
						priority
						className="h-[85%] w-full rounded-md object-cover"
					/>
					<div className="flex h-[47px] items-center justify-between px-2">
						<Trash2
							className="cursor-pointer text-red-500"
							onClick={() => {
								setFile({ newFile: {}, url: "" });
								ref.current.value = "";
							}}
						/>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Send
								className="cursor-pointer text-primary"
								onClick={() => handleSubmit("image")}
							/>
						)}
					</div>
				</div>
			</div>
			<Input
				placeholder={isRTL ? "الرسالة" : "Message"}
				className="flex-1"
				value={messageWithEmoji}
				onChange={(e: any) => setMessageWithEmoji(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						handleSubmit("text");
					}
				}}
			/>
			<div
				className={`flex size-[40px] cursor-pointer items-center justify-center rounded-md border bg-primary text-white transition-colors ${!messageWithEmoji ? "opacity-50" : "opacity-100 hover:bg-transparent hover:text-primary"}`}
				onClick={() => messageWithEmoji && handleSubmit("text")}>
				{isPending ? <Loader2Icon className="animate-spin" /> : <Send className="size-[20px] text-inherit" />}
			</div>
		</div>
	);
};

export default ChatControll;
