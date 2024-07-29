/* eslint-disable react/display-name */
"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface CountdownTimerHandles {
	resetTimer: () => void;
}

const CountdownTimer = forwardRef<CountdownTimerHandles, { time: number; setTime: React.Dispatch<React.SetStateAction<number>> }>(
	({ time, setTime }, ref) => {
		const intervalRef = useRef<any>(null);

		useEffect(() => {
			startTimer();

			return () => clearInterval(intervalRef.current!);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const startTimer = () => {
			clearInterval(intervalRef.current!);
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(intervalRef.current!);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		};

		useImperativeHandle(ref, () => ({
			resetTimer: () => {
				setTime(60);
				startTimer();
			},
		}));

		const formatTime = (seconds: number) => {
			const minutes = Math.floor(seconds / 60);
			const remainingSeconds = seconds % 60;
			return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
		};

		return <div className="text-red-500">{formatTime(time)}</div>;
	}
);

export default CountdownTimer;
