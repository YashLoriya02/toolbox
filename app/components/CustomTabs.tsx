import React from "react";

const CustomTabs = ({ tabs, activeTab, setActiveTab }: any) => (
    <div className="flex space-x-4 pb-3 border-b border-gray-700 mb-4">
        {tabs.map((tab: string) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 cursor-pointer rounded-xl ${activeTab === tab
                        ? 'bg-purple-800 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default CustomTabs;
