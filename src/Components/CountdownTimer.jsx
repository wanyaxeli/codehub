import { useState, useEffect } from "react";
import React from "react";
const CountdownTimer = ({ startingTime,timeLeft ,setTimeLeft}) => {

    useEffect(() => {
        if (!startingTime) return;
        console.log('start',startingTime)
        const eventTime = new Date(startingTime).getTime();
        let interval;  

        const updateCountdown = () => {
            const now = new Date().getTime();
            const remainingTime = eventTime - now;

            if (remainingTime <= 0) {
                setTimeLeft("Event has started!");
                clearInterval(interval);
            } else {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            }
        };

        updateCountdown();
        interval = setInterval(updateCountdown, 1000);  // ✅ Assign after declaration

        return () => clearInterval(interval);
    }, [startingTime]);

    return <div>{timeLeft ? `${timeLeft}` : "Loading..."}</div>;
};

export default CountdownTimer;