"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; href?: string };

type TabSectionProps = {
    tabs: Tab[];
    mode?: "local" | "router";
    className?: string;
    tabContent: Record<string, React.ReactNode>;
    activeClass?: string;
    inactiveClass?: string;
    navClassName?: string;
    tabContentClass?: string;
};

export default function TabSection({
    tabs,
    mode = "local",
    tabContent = {},
    className = '',
    activeClass = 'bg-[#dee3ff] text-[#000]',
    inactiveClass = 'text-[#667085]',
    navClassName = '',
    tabContentClass = '',
}: TabSectionProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].label);
    const pathname = usePathname();
    const isRouterMode = mode === "router";
    return (
        <div className={`rounded-md ${className}`}>
            <div className="block">
                <nav className={`-mb-px flex flex-wrap p-1 md:gap-0 gap-2 ${navClassName || ''}`} aria-label="Tabs">
                    {tabs.map((tab) => {
                        const isActive = isRouterMode
                            ? pathname === tab.href
                            : activeTab === tab.label;

                        const classes = isActive ? activeClass : inactiveClass;

                        // 🚀 ROUTER MODE (use <Link>)
                        if (isRouterMode && tab.href) {
                            return (
                                <Link
                                    key={tab.label}
                                    href={tab.href}
                                    className={`whitespace-nowrap text-[13px] font-medium flex-1 text-center rounded ${classes}`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        }

                        // 🎯 LOCAL TAB MODE (internal switching)
                        return (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`whitespace-nowrap text-[13px] font-medium flex-1 text-center rounded ${classes}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}

                </nav>
            </div>

            {/* Only show tab content for LOCAL mode */}
            {!isRouterMode && (
                <div className={`tab-content ${tabContentClass}`}>
                    {tabContent[activeTab] ?? <p>No content available.</p>}
                </div>
            )}
        </div>
    );
}


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';

// type TabSectionProps = {
//     tabs: string[];
//     className?: string;
//     tabContent: Record<string, React.ReactNode>;
//     activeClass?: string;
//     inactiveClass?: string;
//     navClassName?: string;
//     tabContentClass?: string;
// };

// export default function TabSection({
//     tabs,
//     tabContent,
//     className = '',
//     activeClass = 'bg-[#dee3ff] text-[#000]',
//     inactiveClass = 'text-[#667085]',
//     navClassName = '',
//     tabContentClass = '',
// }: TabSectionProps) {
//     const router = useRouter();
//     const pathname = usePathname();

//     const segments = pathname.split('/').filter(Boolean);

//     // Convert tab label → slug
//     const tabToSlug = (tab: string) => tab.toLowerCase().replace(/\s+/g, '-');

//     // Convert slug → tab label
//     const slugToTab = (slug: string | undefined) =>
//         tabs.find((t) => tabToSlug(t) === slug) || tabs[0];

//     console.log("slugToTab :", slugToTab);
//     // Detect current slug from URL
//     const lastSegment = segments[segments.length - 1];
//     const [activeTab, setActiveTab] = useState(slugToTab(lastSegment));
//     console.log("lastSegment ", lastSegment, activeTab);

//     // Sync when URL changes (back/forward)
//     useEffect(() => {
//         setActiveTab(slugToTab(lastSegment));
//     }, [pathname]);

//     // const handleTabChange = (tab: string) => {
//     //     setActiveTab(tab);
//     //     const slug = tabToSlug(tab);

//     //     // Build base path dynamically (everything except last segment)
//     //     const basePath =
//     //         segments.length > 1 ? '/' + segments.slice(0, -1).join('/') : '';

//     //     const newPath = `${basePath}/${slug}`;
//     //     router.replace(newPath, { scroll: false });
//     // };

//     const handleTabChange = (tab: string) => {
//         setActiveTab(tab);
//         const slug = tab.toLowerCase().replace(/\s+/g, '-'); // tab → slug

//         // Preserve everything except the last segment if it's already a tab slug
//         let baseSegments = segments;

//         // Check if last segment is already a tab slug
//         if (tabs.map(tabToSlug).includes(lastSegment)) {
//             baseSegments = segments.slice(0, -1); // remove old tab slug
//         }

//         // Build new path: existing segments + new tab slug
//         const newPath = '/' + [...baseSegments, slug].join('/');

//         router.replace(newPath, { scroll: false });
//     };

//     return (
//         <div className={`rounded-md ${className}`}>
//             <nav className={`-mb-px flex flex-wrap p-1 gap-2 ${navClassName}`}>
//                 {tabs.map((tab) => (
//                     <a
//                         key={tab}
//                         href="#"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             handleTabChange(tab);
//                         }}
//                         className={`whitespace-nowrap text-[13px] text-center font-medium flex-1 rounded ${activeTab === tab ? activeClass : inactiveClass
//                             }`}
//                         aria-current={activeTab === tab ? 'page' : undefined}
//                     >
//                         {tab}
//                     </a>
//                 ))}
//             </nav>

//             <div className={`tab-content ${tabContentClass}`}>
//                 {tabContent[activeTab] ?? <p>No content available.</p>}
//             </div>
//         </div>
//     );
// }