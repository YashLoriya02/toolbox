"use client"

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../components/CustomCard";
import CustomTabs from "../../components/CustomTabs";
import { Copy } from "lucide-react";
// import tzData from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const tabs = ["Current Time", "Convert Timestamp", "Time Difference", "Timezone Converter"];

const TimestampTool = () => {
    const [activeTab, setActiveTab] = useState("Current Time");
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [copySuccess, setCopySuccess] = useState("");

    const [unixInput, setUnixInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedUnix, setConvertedUnix] = useState("");

    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [diffResult, setDiffResult] = useState("");

    const [countdownTarget, setCountdownTarget] = useState("");
    const [countdown, setCountdown] = useState("");

    const [sourceDate, setSourceDate] = useState("");
    const [sourceZone, setSourceZone] = useState("UTC");
    const [targetZone, setTargetZone] = useState("Asia/Kolkata");
    const [convertedZoneTime, setConvertedZoneTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(dayjs()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!countdownTarget) return;
        const interval = setInterval(() => {
            const now = dayjs();
            const target = dayjs.unix(Number(countdownTarget));
            const duration = target.diff(now);
            if (duration <= 0) {
                setCountdown("Time reached!");
            } else {
                const days = Math.floor(duration / (1000 * 60 * 60 * 24));
                const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((duration / (1000 * 60)) % 60);
                const seconds = Math.floor((duration / 1000) % 60);
                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countdownTarget]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 1500);
    };

    return (
        <div className="mt-5">
            <CustomCard>
                <CustomTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "Current Time" && (
                    <div className="text-white space-y-4 mt-4">
                        <h2 className="text-xl font-bold">Current Timestamp</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Unix (Seconds): {currentTime.unix()}</span>
                                <Copy className="cursor-pointer" onClick={() => handleCopy(currentTime.unix().toString())} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Unix (Milliseconds): {currentTime.valueOf()}</span>
                                <Copy className="cursor-pointer" onClick={() => handleCopy(currentTime.valueOf().toString())} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>ISO 8601: {currentTime.toISOString()}</span>
                                <Copy className="cursor-pointer" onClick={() => handleCopy(currentTime.toISOString())} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Local Time: {currentTime.format("YYYY-MM-DD HH:mm:ss")}</span>
                                <Copy className="cursor-pointer" onClick={() => handleCopy(currentTime.format("YYYY-MM-DD HH:mm:ss"))} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>UTC Time: {currentTime.utc().format("YYYY-MM-DD HH:mm:ss")}</span>
                                <Copy className="cursor-pointer" onClick={() => handleCopy(currentTime.utc().format("YYYY-MM-DD HH:mm:ss"))} />
                            </div>
                        </div>
                        {copySuccess && <div className="text-green-400">{copySuccess}</div>}
                    </div>
                )}

                {activeTab === "Convert Timestamp" && (
                    <div className="text-white mt-4 space-y-4">
                        <div>
                            <label>Unix to Human-readable:</label>
                            <CustomInput value={unixInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnixInput(e.target.value)} placeholder="Enter Unix timestamp" />
                            <CustomButton onClick={() => setConvertedDate(dayjs.unix(Number(unixInput)).format("YYYY-MM-DD HH:mm:ss"))}>Convert</CustomButton>
                            <p className="mt-2 mb-6">Result: {convertedDate}</p>
                        </div>
                        <div>
                            <label>Date to Unix:</label>
                            <CustomInput value={dateInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateInput(e.target.value)} placeholder="YYYY-MM-DD HH:mm:ss" />
                            <CustomButton onClick={() => setConvertedUnix(dayjs(dateInput).unix().toString())}>Convert</CustomButton>
                            <p className="mt-2">Result: {convertedUnix}</p>
                        </div>
                    </div>
                )}

                {activeTab === "Time Difference" && (
                    <div className="text-white mt-4 space-y-4">
                        <CustomInput value={date1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate1(e.target.value)} placeholder="Start: YYYY-MM-DD HH:mm:ss" />
                        <CustomInput value={date2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate2(e.target.value)} placeholder="End: YYYY-MM-DD HH:mm:ss" />
                        <CustomButton
                            onClick={() => {
                                const d1 = dayjs(date1);
                                const d2 = dayjs(date2);
                                const diffMs = d2.diff(d1);
                                const duration = {
                                    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
                                    hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
                                    minutes: Math.floor((diffMs / (1000 * 60)) % 60),
                                    seconds: Math.floor((diffMs / 1000) % 60)
                                };
                                setDiffResult(`${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`);
                            }}
                        >
                            Calculate
                        </CustomButton>
                        <p className="mt-2">Difference: {diffResult}</p>
                    </div>
                )}

                {activeTab === "Timezone Converter" && (
                    <div className="text-white mt-4">Coming Soon (can use dayjs.tz)</div>
                )}

                {activeTab === "Epoch Countdown" && (
                    <div className="text-white mt-4 space-y-4">
                        <CustomInput value={countdownTarget} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountdownTarget(e.target.value)} placeholder="Enter future Unix timestamp" />
                        <p className="text-lg">Countdown: {countdown}</p>
                    </div>
                )}
            </CustomCard>
        </div>
    );
};

export default TimestampTool;
