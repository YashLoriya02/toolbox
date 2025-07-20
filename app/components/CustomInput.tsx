import React from "react";

const CustomInput = ({ value, onChange, placeholder }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}) => (
    <input
        type="text"
        className="w-full p-2 rounded bg-[#1e1e2f] text-white border border-gray-600 placeholder-gray-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default CustomInput;
