import React, { useState } from 'react';
import Image from "next/image";

type TabSectionProps = {
    tabs: string[];
    className?: string;
    tabContent: Record<string, React.ReactNode>;
    activeClass?: string;
    inactiveClass?: string;
    navClassName?: string;
    tabContentClass?: string;
};

export default function TabSectionTwo({
    tabs,
    tabContent,
    className = '',
    activeClass = 'bg-[#dee3ff] text-[#000]',
    inactiveClass = 'text-[#667085]',
    navClassName = '',
    tabContentClass = '',
}: TabSectionProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className={`rounded-md ${className}`}>
            <div className="block">
                <nav className={`-mb-px flex flex-wrap items-center justify-between p-1 md:gap-0 gap-2 ${navClassName || ''}`} aria-label="Tabs">
                    <div className="heading-wrap flex items-center">
                        <Image src="/assets/images/market-icon.png" width={40} height={40} alt='icon' />
                        <div className="text-dv ml-3">
                            <h4 className="text-[18px] leading-[1.2] font-semibold">Market By Region</h4>
                            <p className="text-[12px]">Global Printer Market, 2023-2030</p>
                        </div>
                    </div>

                    <div className='flex'>
                        {tabs.map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(tab);
                                }}
                                className={`whitespace-nowrap text-[13px] text-center font-medium flex-1 rounded ${activeTab === tab ? activeClass : inactiveClass
                                    }`}
                                aria-current={activeTab === tab ? 'page' : undefined} >
                                {tab}
                            </a>

                        ))}
                    </div>

                </nav>
            </div>

            <div className={`tab-content ${tabContentClass || ''}`}>
                {tabContent[activeTab] ?? <p>No content available.</p>}
            </div>
        </div>
    );
}