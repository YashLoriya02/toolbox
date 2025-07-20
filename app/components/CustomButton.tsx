import React from "react";

const CustomButton = ({ onClick, children }: any) => (
    <button
        onClick={onClick}
        className="px-4 mt-2 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
    >
        {children}
    </button>
);

export default CustomButton;
