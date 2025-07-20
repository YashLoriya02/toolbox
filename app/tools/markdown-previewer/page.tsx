"use client"

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import toast from "react-hot-toast";
import { Check, Copy } from "lucide-react";

export default function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(`### Start Writing Markdown

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Link]()
- Lists like this:
  - Item 1
  - Item 2
> Blockquotes, tables, and more also work!
`);

    const [copied, setCopied] = useState(false)

    const copyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toast.remove()
            toast.success("Markdown Copied Successfully")
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const copyParsedMarkdown = async () => {
        setCopied(true)

        try {
            const hiddenElement = document.getElementById("hidden-plain-text");
            if (!hiddenElement) {
                toast.remove()
                toast.error("Failed to find parsed content");
                return;
            }

            const plainText = hiddenElement.innerText;
            await navigator.clipboard.writeText(plainText);
            toast.remove()
            toast.success("Parser Markdown Copied Successfully");
        } catch (err) {
            toast.remove()
            toast.error("Copy failed");
            console.error("Copy failed:", err);
        }

        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    const clearMarkdown = () => {
        setMarkdown("");
    };

    const downloadMD = () => {
        try {
            const element = document.createElement("a");
            const file = new Blob([markdown], { type: 'text/markdown' });
            element.href = URL.createObjectURL(file);
            element.download = `Markdown_${new Date().getTime()}.md`;
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            URL.revokeObjectURL(element.href);
            
            toast.remove()
            toast.success("Markdown file downloaded successfully!");
        } catch (err) {
            console.error('Failed to download markdown:', err);
            toast.error("Failed to download markdown file");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-5">Markdown Previewer</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2 text-gray-300">Markdown Input</label>
                    <textarea
                        className="w-full h-[500px] resize-y p-4 bg-gray-800 border border-gray-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-400"
                        placeholder="Write your markdown here..."
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2 text-gray-300">Preview Output</label>
                    <div className="w-full relative h-[500px] overflow-y-auto p-3 bg-gray-800 border border-gray-700 rounded-lg prose prose-invert max-w-none">
                        {
                            copied ? <Check className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                                : <Copy onClick={copyParsedMarkdown} className="h-5 w-5 cursor-pointer absolute top-3 right-3" />
                        }

                        <div id="hidden-plain-text">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    h1: ({ children, ...props }) => (
                                        <h1 className="text-3xl font-bold mt-6 mb-4 text-white border-b border-gray-600 pb-2" {...props}>
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children, ...props }) => (
                                        <h2 className="text-2xl font-semibold text-yellow-400 mt-5 mb-3" {...props}>
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children, ...props }) => (
                                        <h3 className="text-xl font-medium mt-4 mb-2" {...props}>
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children, ...props }) => (
                                        <h4 className="text-lg font-medium text-blue-400 mt-3 mb-2" {...props}>
                                            {children}
                                        </h4>
                                    ),
                                    p: ({ children, ...props }) => (
                                        <p className="text-gray-300 mb-4 leading-relaxed" {...props}>
                                            {children}
                                        </p>
                                    ),
                                    a: ({ children, ...props }) => (
                                        <a
                                            className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    ),
                                    ul: ({ children, ...props }) => (
                                        <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-gray-300 [&_ul]:list-[square] [&_ul]:mt-2" {...props}>
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children, ...props }) => (
                                        <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-gray-300" {...props}>
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children, ...props }) => (
                                        <li className="text-gray-300 mb-2" {...props}>
                                            <div className="ml-2">
                                                {children}
                                            </div>
                                        </li>
                                    ),
                                    code: ({ className, children, ...props }) => {
                                        const codeProps = props as any;
                                        const isInline = !codeProps.inline === false && !className?.includes('language-');

                                        if (isInline) {
                                            return (
                                                <code
                                                    className="!bg-gray-600 !text-gray-100 !px-2 !py-1 !rounded !text-sm !font-mono !border-none"
                                                    style={{
                                                        backgroundColor: '#4B5563',
                                                        color: '#F3F4F6',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '0.25rem',
                                                        fontSize: '0.875rem',
                                                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                                                    }}
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }
                                        return (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    pre: ({ children, ...props }) => (
                                        <pre className="bg-black text-white p-4 rounded-md overflow-auto my-4 text-sm border border-gray-700" {...props}>
                                            {children}
                                        </pre>
                                    ),
                                    table: ({ children, ...props }) => (
                                        <div className="overflow-x-auto my-4">
                                            <table className="table-auto w-full border border-gray-700 text-sm text-left rounded-lg overflow-hidden" {...props}>
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    thead: ({ children, ...props }) => (
                                        <thead className="bg-gray-700" {...props}>
                                            {children}
                                        </thead>
                                    ),
                                    th: ({ children, ...props }) => (
                                        <th className="border border-gray-600 px-4 py-3 text-white font-semibold" {...props}>
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children, ...props }) => (
                                        <td className="border border-gray-600 px-4 py-3 text-gray-300" {...props}>
                                            {children}
                                        </td>
                                    ),
                                    hr: ({ ...props }) => (
                                        <hr className="border-t border-gray-600 my-6" {...props} />
                                    ),
                                    blockquote: ({ children, ...props }) => (
                                        <blockquote className="border-l-4 border-blue-400 pl-4 my-2 !bg-gray-800 text-gray-300 italic" {...props}>
                                            {children}
                                        </blockquote>
                                    ),
                                    strong: ({ children, ...props }) => (
                                        <strong className="text-white font-bold" {...props}>
                                            {children}
                                        </strong>
                                    ),
                                    em: ({ children, ...props }) => (
                                        <em className="italic" {...props}>
                                            {children}
                                        </em>
                                    ),
                                }}
                            >
                                {markdown}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
                <button
                    onClick={copyMarkdown}
                    className="bg-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                    Copy Markdown
                </button>
                <button
                    onClick={downloadMD}
                    className="bg-[#8924e7] px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                    Download as .MD
                </button>
                <button
                    onClick={clearMarkdown}
                    className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}