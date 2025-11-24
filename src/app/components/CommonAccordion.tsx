"use client";
import React, { useState } from "react";

type AccordionItem = {
    title: React.ReactNode;
    content: React.ReactNode;
};

type CommonAccordionProps = {
    items: AccordionItem[];
    className?: string;
};

const CommonAccordion: React.FC<CommonAccordionProps> = ({ items, className = "" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`mx-auto mt-10 ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                    {/* Header */}
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-[14px] text-left p-4 flex justify-between items-center font-medium bg-white hover:bg-[#e9e9e986]">
                        {item.title}
                        <span>{openIndex === index ? "−" : "+"}</span>
                    </button>

                    {/* Content */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden transform ${openIndex === index
                            ? "max-h-40 opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 -translate-y-2"}`}>
                        <div className="p-4 text-gray-700 bg-white">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommonAccordion;
