"use client"

import { Check, Copy, Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const Base64Tool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const copyOutput = async () => {
        if (outputText) {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 3000);

            try {
                await navigator.clipboard.writeText(outputText);
                toast.remove()
                toast.success("Output Copied Successfully")
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    }

    const handleEncode = () => {
        setError('');
        if (!inputText) {
            setOutputText('');
            return;
        }
        try {
            const encoded = btoa(unescape(encodeURIComponent(inputText)));
            setOutputText(encoded);
        } catch (e) {
            setError('Could not encode text. Ensure it is valid UTF-8.');
            setOutputText('');
        }
    };

    const handleDecode = () => {
        setError('');
        if (!inputText) {
            setOutputText('');
            return;
        }
        try {
            const decoded = decodeURIComponent(escape(atob(inputText)));
            setOutputText(decoded);
        } catch (e) {
            setError('Could not decode. Input is not a valid Base64 string.');
            setOutputText('');
        }
    };

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            setInputText(e.target?.result as string);
            setError('');
        };
        reader.onerror = () => {
            setError('Failed to read the selected file.');
        };
        reader.readAsText(file);
    };

    const triggerUpload = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="flex flex-col min-h-screen items-center bg-gray-900 px-10 gap-4">
            <div className="flex flex-col w-1/2">
                <h1 className="text-cyan-500 my-10 text-center text-4xl">Enter text to encode or decode from Base64.</h1>
                <div className="relative w-full">
                    {
                        inputText === '' &&
                        <>
                            <div onClick={triggerUpload} className="absolute gap-2 flex items-center cursor-pointer bg-[#2a32418e] px-5 py-1.5 rounded-xl bottom-9 right-3">
                                <h2>Upload</h2>
                                <Upload className="h-5 w-5" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={uploadFile}
                                className="hidden"
                                accept=".txt,.text,application/json,text/markdown"
                            />
                        </>
                    }
                    <textarea
                        rows={6}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text or Base64 here..."
                        className="w-full no-scrollbar p-4 mb-4 bg-gray-900 border-2 border-gray-700 focus:outline-none rounded-lg transition-all duration-300 resize-none text-gray-300 placeholder-gray-500"
                    />
                </div>
                <div className={`grid mx-4 ${error ? "mb-2" : "mb-12"} grid-cols-1 sm:grid-cols-2 gap-4`}>
                    <button onClick={handleEncode} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                        Encode to Base64
                    </button>
                    <button onClick={handleDecode} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-gray-500/50">
                        Decode from Base64
                    </button>
                </div>

                {error && (
                    <div className="mb-8 mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                        <p>{error}</p>
                    </div>
                )}

                <div className="relative">
                    {
                        outputText && (
                            copied ? <Check color='#FFFFFF66' className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                                : <Copy color='#FFFFFF66' onClick={copyOutput} className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                        )
                    }
                    <textarea
                        readOnly
                        rows={6}
                        value={outputText}
                        placeholder="Result..."
                        className="w-full no-scrollbar p-4 bg-gray-900 border-2 border-gray-700 focus:outline-none rounded-lg resize-none text-green-300 placeholder-gray-500"
                    />
                </div>
            </div>
        </div>
    );
};


export default Base64Tool