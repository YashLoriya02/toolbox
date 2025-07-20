"use client"

import { Check, Copy } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const JWT = () => {
    const [token, setToken] = useState('');
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const copyDecodedPayload = async () => {
        if (payload) {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 3000);

            try {
                await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                toast.remove()
                toast.success("Decoded Payload Copied Successfully")
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    }

    const base64UrlDecode = (str: string) => {
        try {
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            return decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        } catch (e) {
            console.error("Base64Url decoding failed:", e);
            return null;
        }
    };

    const handleDecode = useCallback(() => {
        setError('');
        setPayload(null);

        if (!token.trim()) {
            setError('Please enter a JWT token.');
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. The token must have three parts separated by dots.');
            }

            const payloadB64 = parts[1];
            if (!payloadB64) {
                throw new Error('Invalid JWT format. The payload part is missing.');
            }

            const decodedPayloadJson = base64UrlDecode(payloadB64);
            if (!decodedPayloadJson) {
                throw new Error('Failed to decode the JWT payload. It might be malformed.');
            }

            const parsedPayload = JSON.parse(decodedPayloadJson);
            setPayload(parsedPayload);
        } catch (e: any) {
            console.error("Decoding Error:", e);
            setError(e.message || 'An unexpected error occurred while decoding the token.');
            setPayload(null);
        }
    }, [token]);

    return (
        <>
            <main className="bg-gray-900 min-h-screen px-20 flex justify-center text-white p-4">
                <div className="w-full mt-10 mx-auto">
                    <div className="flex justify-around gap-10">
                        <div className='w-1/2'>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">JWT Payload Decoder</h1>
                            </div>

                            <div className="flex w-full flex-col gap-4">
                                <textarea
                                    id="jwt-input"
                                    rows={10}
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Paste your JWT token here to see the decoded payload"
                                    className="w-full p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none transition-all duration-300 resize-none text-gray-300 placeholder-gray-500"
                                />
                                <button
                                    onClick={handleDecode}
                                    className="w-1/4 mx-auto mt-4 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-transform duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                                >
                                    Decode Token
                                </button>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col items-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">Decoded Payload</h1>
                            <div className="bg-gray-900 w-full relative p-4 rounded-lg border-2 min-h-[275px] border-gray-700">
                                {
                                    payload && (
                                        copied ? <Check color='#FFFFFF66' className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                                            : <Copy color='#FFFFFF66' onClick={copyDecodedPayload} className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                                    )
                                }
                                <pre className="text-sm md:text-base text-green-300 whitespace-pre-wrap break-all">
                                    {payload ? JSON.stringify(payload, null, 2) : ""}
                                </pre>
                            </div>
                        </div>
                    </div>


                    {error && (
                        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}


export default JWT;