import React from "react";

const CustomCard = ({ children }: any) => (
    <div className="bg-gray-900 min-h-screen p-6 rounded-lg shadow-lg border border-gray-700">
        {children}
    </div>
);

export default CustomCard;
