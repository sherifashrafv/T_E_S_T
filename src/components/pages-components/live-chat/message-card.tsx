"use client";

import React from "react";
import Image from "next/image";

const MessageCard = ({ chat, chats }: any) => {
	return (
		<div
			key={chat?.id}
			className={`flex h-auto w-full gap-2 rounded-md ${chat?.from_admin ? "items-end justify-end" : "items-start justify-start"}`}>
			<div
				className={`flex h-auto w-4/5 gap-3 rounded-md border p-2 md:w-fit ${chat?.from_admin ? "items-start justify-end border-slate-200 bg-slate-200" : "items-start justify-start border-primary bg-primary"}`}>
				<Image
					src={chat?.from_admin ? chats?.data?.admin_avatar : chats?.data?.user?.avatar}
					alt="avatar"
					width={40}
					height={40}
					priority
					className={`rounded-md ${chat?.from_admin ? "order-2" : "order-none"}`}
				/>
				<div className={`flex w-full flex-col gap-1`}>
					<p className={`text-sm font-[400] capitalize text-white ${chat?.from_admin ? "text-end !text-primary" : "text-start"}`}>
						{chats?.data?.user?.name}
					</p>
					<div className={`flex w-full flex-col ${chat?.from_admin ? "justify-end" : "justify-start"}`}>
						{chat?.message_type === "text" && (
							<p className={`text-sm font-[400] text-white ${chat?.from_admin ? "text-end !text-primary" : "text-start"}`}>
								{chat?.message}
							</p>
						)}
						{chat?.message_type === "image" && (
							<div className={`flex ${chat?.from_admin ? "justify-end" : "justify-start"}`}>
								<Image
									src={chat?.message}
									alt="image"
									width={200}
									height={200}
									priority
									className={`rounded-md`}
								/>
							</div>
						)}
						<p className={`text-xs font-[400] ${chat?.from_admin ? "text-start text-primary" : "text-end text-white"}`}>
							{chat?.send_at?.slice(11)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageCard;
