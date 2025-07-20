import React from "react";
import { Code, Clock, Key, FileText, Eye, Wrench } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "Base64 Encoder/Decoder",
    description: "Convert text to/from Base64 format.",
    icon: <Code className="w-6 h-6" />,
    path: "/tools/base64",
  },
  {
    name: "JSON Formatter",
    description: "Beautify or compact your JSON data.",
    icon: <FileText className="w-6 h-6" />,
    path: "/tools/json-formatter",
  },
  {
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens with ease.",
    icon: <Key className="w-6 h-6" />,
    path: "/tools/jwt-decoder",
  },
  {
    name: "Markdown Previewer",
    description: "Live preview markdown content as you type.",
    icon: <Eye className="w-6 h-6" />,
    path: "/tools/markdown-previewer",
  },
  {
    name: "Timestamp Toolkit",
    description: "Convert, compare, and explore date-time formats.",
    icon: <Clock className="w-6 h-6" />,
    path: "/tools/timestamps",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1e1e1e] to-[#141414] text-white px-6 py-10 font-sans">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Wrench className="h-10 w-10 text-purple-500 animate-spin-slow" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight">Mini Toolbox</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          The ultimate collection of tiny but powerful developer tools. All in one place. Fast, free, and forever useful.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.path}>
            <div className="group bg-[#202020] hover:border-purple-500 transition-all duration-300 p-5 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:shadow-purple-700/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-purple-400 bg-[#2a2a2a] p-2 rounded-lg group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold">{tool.name}</h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
