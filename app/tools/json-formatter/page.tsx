"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const JsonFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const formatJson = () => {
        try {
            const json = JSON.parse(input);
            const pretty = JSON.stringify(json, null, 2);
            setOutput(pretty);
            setError("");
        } catch (e) {
            setError("Invalid JSON");
        }
    };

    const minifyJson = () => {
        try {
            const json = JSON.parse(input);
            const minified = JSON.stringify(json);
            setOutput(minified);
            setError("");
        } catch (e) {
            setError("Invalid JSON");
        }
    };

    const copyOutput = async () => {
        await navigator.clipboard.writeText(output);
        toast.remove()
        toast.success("Json Copied Successfully")
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">JSON Formatter</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <textarea
                    className="w-full h-[300px] p-4 bg-gray-800 rounded-lg text-sm font-mono"
                    placeholder="Paste your JSON here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <textarea
                    className="w-full h-[300px] p-4 bg-gray-800 rounded-lg text-sm font-mono"
                    readOnly
                    placeholder="Formatted output will appear here..."
                    value={output}
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex flex-wrap gap-4 mt-6">
                <button
                    onClick={formatJson}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Format
                </button>
                <button
                    onClick={minifyJson}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                    Minify
                </button>
                <button
                    onClick={copyOutput}
                    className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
                >
                    Copy
                </button>
                <button
                    onClick={clearAll}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

export default JsonFormatter