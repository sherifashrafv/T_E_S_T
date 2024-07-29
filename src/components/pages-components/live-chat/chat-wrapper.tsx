"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { icons } from "@/constants";
import { getCookiesClientSide } from "@/utils/Functions/cookies-client-side";
import ChatControll from "./chat-controll";
import { useGetChatsQuery } from "@/hooks/root/use-root-hooks";
import { Loader2Icon } from "lucide-react";
import { handleSendAtDay } from "@/utils";
import MessageCard from "./message-card";

const ChatWrapper = () => {
	const isRTL = getCookiesClientSide("NEXT_LOCALE") === "ar";
	const user = JSON.parse(getCookiesClientSide("user") || "{}");

	const chatRef = useRef<HTMLDivElement>(null);

	const { data: chats, isPending, refetch } = useGetChatsQuery(user?.id);
	const [messagesFromSocket, setMessagesFromSocket] = useState<any[] | any[]>(chats?.data?.messages);

	const handleMessages = (newMessage: any) => {
		setMessagesFromSocket([newMessage, ...messagesFromSocket]);
	};

	useEffect(() => {
		if (!isPending) {
			setMessagesFromSocket(chats?.data?.messages);
		}
	}, [chats?.data?.messages, isPending]);

	const scrollToBottom = () => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	};

	useEffect(scrollToBottom, [messagesFromSocket]);

	return (
		<div className="flex flex-col items-center justify-start gap-4 px-2 py-[20px] md:container">
			<div className="flex w-full items-center justify-start gap-5 border-b border-b-border pb-5">
				<div className="flex size-[60px] items-center justify-center rounded-full shadow">
					<Image
						src={icons.mobileLogo}
						alt="logo"
						width={40}
						height={40}
						priority
						className="size-[40px] object-contain"
					/>
				</div>

				<div>
					<h1 className="text-lg font-[700] text-primary">{isRTL ? "الدعم" : "Live Chat"}</h1>
					<p className="text-sm font-[400] text-secondary-gray">{isRTL ? "هل لديك اي استفسار؟" : "Have any questions?"}</p>
				</div>
			</div>
			<div
				className="h-[500px] w-full overflow-y-auto rounded-md border border-border p-5"
				ref={chatRef}>
				{isPending ? (
					<div className="flex size-full items-center justify-center">
						<Loader2Icon className="animate-spin" />
					</div>
				) : (
					<div className="w-full">
						{handleSendAtDay(messagesFromSocket)
							?.slice()
							?.reverse()
							?.map((message: any) => {
								return (
									<div
										className="flex w-full flex-col gap-5 text-center"
										key={message?.id}>
										<h1 className="text-sm font-[700] text-primary">{message?.day}</h1>
										{message?.messages
											?.slice()
											.reverse()
											.map((chat: any) => {
												return (
													<MessageCard
														key={chat?.id}
														chat={chat}
														chats={chats}
													/>
												);
											})}
									</div>
								);
							})}
					</div>
				)}
			</div>
			<ChatControll
				refetch={refetch}
				handleMessages={handleMessages}
			/>
		</div>
	);
};

export default ChatWrapper;
