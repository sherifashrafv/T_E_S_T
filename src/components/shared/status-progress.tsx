import React from "react";

const StatusProgress = ({ steps, activeSteps }: { steps: { key: string; value: string }[]; activeSteps: string[] }) => {
	const isActive = (step: string) => activeSteps.includes(step);
	return (
		<div className="flex h-[85px] w-full items-start justify-between ps-14">
			{steps.map((step, index) => (
				<div
					key={index}
					className="flex flex-1 shrink-0 items-center">
					<div className="relative flex flex-col items-center">
						<div className={`size-4 rounded-full md:size-6 ${isActive(step.key) ? "bg-black" : "bg-gray-300"}`}></div>
						<div
							className={`absolute top-5 text-center text-[10px] md:top-8 md:text-xs ${isActive(step.key) ? "font-bold text-black" : "text-gray-500"} capitalize md:w-[70px]`}>
							{step.value}
						</div>
					</div>
					{index !== steps.length - 1 && <div className="h-[5px] grow bg-gray-300"></div>}
				</div>
			))}
		</div>
	);
};

export default StatusProgress;
