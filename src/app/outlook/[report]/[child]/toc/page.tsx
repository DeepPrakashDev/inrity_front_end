"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReport } from "../../ReportContext";
import api from "@/lib/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faAngleRight,
  faDownload,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import ReportsStatistics from "@/app/components/ReportsStatistics";

export default function Tableofcontent() {
  const { reportId } = useReport();
  const [tocData, setTocData] = useState<any[]>([]);

  const fetchTocData = async (): Promise<void> => {
    try {
      const res = await api.post("report/toc-scope", { id: reportId });
      console.log("TOC data check :", res);
      const scopeList = res?.data?.data || [];
      setTocData(scopeList);
    } catch (err) {
      console.error("Failed to load TOC Data:", err);
    }
  };

  useEffect(() => {
    console.log("reportId ", reportId);
    if (reportId) {
      fetchTocData();
    }
  }, [reportId]);


  const ScopeList = ({ items, depth = 0 }: { items: any[]; depth?: number }) => {
    return (
      <ul className={depth === 0 ? "ml-[15px]" : "pl-5"}>
        {items.map((element: any) => (
          <li
            key={element.scope_id}
            className={
              depth === 0
                ? "text-[15px] mb-[20px] font-bold"
                : "relative pl-5 text-[15px] font-normal before:content-['•'] before:absolute before:left-0 before:top-0 before:text-[18px] before:leading-[1]"
            }
          >
            {depth === 0 ? (
              <span className="flex gap-[8px] items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={12}
                  className="mt-1"
                  fill="var(--primary-color)"
                  viewBox="0 0 256 512"
                >
                  <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                </svg>
                {element.scope_name}
              </span>
            ) : (
              element.scope_name
            )}

            {element.children?.length > 0 && (
              <ScopeList items={element.children} depth={depth + 1} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="p-5">
        <div className="container mx-auto">
          <div className="heading-wrap flex items-center mb-4">
            <Image
              src="/assets/images/market-icon.png"
              width={40}
              height={40}
              alt="icon"
            />
            <div className="text-dv ml-3">
              <h4 className="text-[18px] leading-[1.2] font-semibold">
                Market Overview
              </h4>
              <p className="text-[12px]">Global Printer Market, 2023-2030</p>
            </div>
          </div>
          <p className="text-[15px] mb-[20px]">
            The printer industry worldwide is expected to reach a projected
            revenue of US$ 71,039.3 million by 2030. A compound annual growth
            rate of 4.5% is expected of the worldwide printer industry from 2024
            to 2030.
          </p>
          {/* {data?.scopeData.map((element: any, index: number) => {
                       return (
                         <ul className="ml-[15px]">
                           <li className="text-[15px] mb-[20px] font-bold">
                             <span className="flex gap-[8]">
                               <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width={15}
                                 height={12}
                                 className="mt-1"
                                 fill="var(--primary-color)"
                                 viewBox="0 0 256 512"
                               >
                                 <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                               </svg>
                              {element?.scope_name}
                             </span>
                             <ul className="text-[15px] font-normal pl-5">
                               <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                                 Multi-functional Printers
                               </li>
                               <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                                 Standalone Printers
                               </li>
                             </ul>
                           </li>
                         </ul>
                       );
                     })} */}
          <ScopeList items={tocData} />
          {/* <ul className="ml-[15px]">
                       <li className="text-[15px] mb-[20px] font-bold">
                         <span className="flex gap-[8]">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             width={15}
                             height={12}
                             className="mt-1"
                             fill="var(--primary-color)"
                             viewBox="0 0 256 512"
                           >
                             <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                           </svg>
                           Printer Type Outlook
                         </span>
                         <ul className="text-[15px] font-normal pl-5">
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Multi-functional Printers
                           </li>
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Standalone Printers
                           </li>
                         </ul>
                       </li> */}
          {/* <li className="text-[15px] mb-[20px] font-bold">
                         <span className="flex gap-[8]">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             width={15}
                             height={12}
                             className="mt-1"
                             fill="var(--primary-color)"
                             viewBox="0 0 256 512"
                           >
                             <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                           </svg>
                           Printer Type Outlook
                         </span>
                         <ul className="text-[15px] font-normal pl-5">
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Multi-functional Printers
                           </li>
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Standalone Printers
                           </li>
                         </ul>
                       </li>
                       <li className="text-[15px] mb-[20px] font-bold">
                         <span className="flex gap-[8]">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             width={15}
                             height={12}
                             className="mt-1"
                             fill="var(--primary-color)"
                             viewBox="0 0 256 512"
                           >
                             <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                           </svg>
                           Printer Type Outlook
                         </span>
                         <ul className="text-[15px] font-normal pl-5">
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Multi-functional Printers
                           </li>
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Standalone Printers
                           </li>
                         </ul>
                       </li>
                       <li className="text-[15px] mb-[20px] font-bold">
                         <span className="flex gap-[8]">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             width={15}
                             height={12}
                             className="mt-1"
                             fill="var(--primary-color)"
                             viewBox="0 0 256 512"
                           >
                             <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                           </svg>
                           Printer Type Outlook
                         </span>
                         <ul className="text-[15px] font-normal pl-5">
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Multi-functional Printers
                           </li>
                           <li className="pl-5 relative before:absolute before:content-['.'] before:left-0 before:bottom-[-4px] before:text-[35px]">
                             Standalone Printers
                           </li>
                         </ul>
                       </li> */}
          {/* </ul> */}
        </div>
      </div>
      <ReportsStatistics />
    </>
  );
}