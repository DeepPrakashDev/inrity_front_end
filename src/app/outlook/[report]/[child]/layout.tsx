"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faAngleRight,
    faDownload,
    faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import MarketTrendChart from "../../../components/MarketTrendChart";
import NewMarketTrendChart, { YearValueData } from "../../../components/NewMarketTrendChart";
import TabSection from "../../../components/TabSection";
import ReportsStatistics from "../../../components/ReportsStatistics";
import MarketOverview from "../../../components/MarketOverview";
import MarketShareChart from "../../../components/MarketShareChart";
import CagrChart from "../../../components/CagrChart";
import RegionalAnalysisCHart from "../../../components/RegionalAnalysisCHart";
import RegionGeoChart from "../../../components/RegionGeoChart";
import CountryMarketChart from "../../../components/CountryMarketChart";
import MarketShareSegmentChart from "../../../components/MarketShareSegmentChart";
import TabSectionTwo from "../../../components/TabSectionTwo";
import CommonAccordion from "../../../components/CommonAccordion";
import PrinterTabs from "../../../components/PrinterTabs";
import api from "@/lib/apiClient";
import { useParams, useRouter, usePathname } from "next/navigation";
import KeyPlayerTable from "../../../components/KeyPlayerTable";
import { replaceShortCodes, getMarketValueByYear } from "../../../../utils/handleShortcode";
import { formatNumberWithCommas } from "../../../../utils/handleFormatting";
import RdCagrChart from "../../../components/NewCagrChart";
import { ReportProvider } from "../ReportContext";

export default function ReportLayout({ children, params }: any) {
    const [basicData, setbasicData] = useState<any>({
        report_id: "",
        url: "",
        short_title: "",
        short_description: "",
        rd_keyword_name: "",
        location: "",
        is_report_type: "",
        default_location: "",
        data_tree: {
            category_name: "",
            category_count: "",
            sub_category_name: "",
            sub_category_count: ""
        },
        market_value: [],
        other_info: {}
    });

    const [reportId, setReportId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<YearValueData[]>([]);
    const searchParams = useParams();

    console.log("search params ", searchParams);
    const reportslug = searchParams?.report ?? null;
    const childslug = searchParams?.child ?? null;
    const subchildslug = searchParams?.subchild ?? null;
    const pathname = usePathname();

    const fetchBasicReport = async (): Promise<void> => {
        try {
            const res = await api.post("report/basic-report-detail", {
                url: reportslug,
                suburl: childslug,
                chuldurl: subchildslug,
            });

            // ✅ check if API returned 404
            /*  if (res?.data?.statusCode === 404) {
               router.push("/404"); // redirect to 404 page
               return;
             }*/

            const basic_rd_data = res?.data?.data;

            const historical_end_obj = getMarketValueByYear(basic_rd_data?.other_info?.historical_period_end, basic_rd_data?.market_value);
            const forecast_end_obj = getMarketValueByYear(basic_rd_data?.other_info?.forecast_period_end, basic_rd_data?.market_value);

            setbasicData({
                report_id: basic_rd_data?.report_id,
                url: basic_rd_data?.url,
                short_title: basic_rd_data?.short_title,
                short_description: basic_rd_data?.short_description,
                rd_keyword_name: basic_rd_data?.rd_keyword_name,
                location: basic_rd_data?.location,
                is_report_type: basic_rd_data?.is_report_type,
                default_location: basic_rd_data?.default_location,
                data_tree: {
                    category_name: basic_rd_data?.data_tree?.category_name,
                    category_count: basic_rd_data?.data_tree?.category_count,
                    sub_category_name: basic_rd_data?.data_tree?.sub_category_name,
                    sub_category_count: basic_rd_data?.data_tree?.sub_category_count,
                },
                market_value: basic_rd_data?.market_value,
                other_info: basic_rd_data?.other_info,
                historical_end_revenue: historical_end_obj?.markety_price ?? null,
                historical_end_unit: historical_end_obj?.unit ?? null,
                historical_end_currency: historical_end_obj?.currency ?? null,
                forecast_end_revenue: forecast_end_obj?.markety_price ?? null,
                forecast_end_unit: forecast_end_obj?.unit ?? null,
                forecast_end_currency: forecast_end_obj?.currency ?? null,

            });
            setReportId(res?.data?.data?.report_id);
        } catch (err) {
            console.error("API failed for Industry:", err);
        }
    };

    useEffect(() => {
        console.log("reportId ", reportId);

        if (reportslug) {
            //fetchData();
            fetchBasicReport();
        }
        // if (reportId) {
        //     fetchRegionalReportData();
        //     fetchCountryReportData(); // ✅ call when pizza, ice cream chocolate, momos steam veg, kitkat, pepsi, reportId is available
        //     fetchTocData();
        // }
    }, [reportslug]);

    const short_codes = basicData?.other_info;
    const market_values = basicData?.market_value;
    const basic_trend_data = [
        { "historical_end_revenue": basicData?.historical_end_revenue },
        { "historical_end_unit": basicData?.historical_end_unit },
        { "historical_end_currency": basicData?.historical_end_currency },
        { "forecast_end_revenue": basicData?.forecast_end_revenue },
        { "forecast_end_unit": basicData?.forecast_end_unit },
        { "forecast_end_currency": basicData?.forecast_end_currency },
    ];

    const sharedData = {
        // reportSlug,
        reportId,
        short_codes,
        market_values,
        basic_trend_data,
        // metadata,
        // loading,
        // error,
        // refresh: fetchReportDetails,
        // setReportId,
    };


    // Extract slug for building tab URLs
    // const parts = pathname.split("/").filter(Boolean); // ["outlook", "industrial-market", "statistics"]
    // console.log("parts :", parts);
    // const baseSlug = parts.slice(1).join("/"); // "industrial-market" OR "industrial-market/more"

    let rdURL = [
        "/outlook",
        reportslug,
        childslug,
        subchildslug || null
    ].filter(Boolean).join("/");

    if (basicData?.is_report_type === "statistics") {
        rdURL = [
            "/outlook",
            reportslug,
            basicData?.default_location,
            subchildslug || null
        ].filter(Boolean).join("/");
    } 

    const tabs = [
        { key: "market-overview-tab", label: "Market Overview", href: rdURL },
        { key: "report-statistics-tab", label: "Report Statistics", href: `${rdURL}/statistics` },
        { key: "report-store", label: "Report Store", href: `${rdURL}/store` },
        { key: "toc-tab", label: "Table of Content", href: `${rdURL}/toc` },
        { key: "key-players-tab", label: "Key Players", href: `${rdURL}/companies` },
    ];

    return (
        // <div className="w-full">

        //     {/* TOP STATIC SECTION  */}
        //     <div className="p-6">
        //         {/* Banner + Title */}
        //         <div className="flex items-start gap-6">
        //             <img
        //                 src="/placeholder-banner.jpg"
        //                 className="w-56 h-56 rounded object-cover"
        //                 alt="Report Banner"
        //             />

        //             <div>
        //                 <h1 className="text-3xl font-bold">
        //                     Global Industrial Filtration Market Size & Share Outlook, 2018–2032
        //                 </h1>

        //                 <div className="flex gap-4 mt-2 text-gray-600">
        //                     <span>Historical Period: 2018–2024</span>
        //                     <span>Forecast Period: 2025–2032</span>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Revenue Cards + Chart */}
        //         <div className="grid grid-cols-3 gap-6 mt-6">
        //             <div className="p-4 border rounded shadow-sm">
        //                 USD 1,300 ton (2024)
        //             </div>

        //             <div className="p-4 border rounded shadow-sm">
        //                 USD 1,879 ton (2032)
        //             </div>

        //             <div className="p-4 border rounded shadow-sm h-32 bg-orange-50">
        //                 {/* You can place your chart here */}
        //                 Chart placeholder
        //             </div>
        //         </div>
        //     </div>

        //     {/* TABS SECTION */}
        //     <div className="border-b flex gap-4 px-6 bg-white">
        //         {tabs.map((tab) => {
        //             const isActive = pathname === tab.href;

        //             return (
        //                 <Link
        //                     key={tab.label}
        //                     href={tab.href}
        //                     className={
        //                         isActive
        //                             ? "px-4 py-2 bg-primary-light text-primary-dark rounded-t"
        //                             : "px-4 py-2 text-gray-600 hover:text-primary-dark"
        //                     }
        //                 >
        //                     {tab.label}
        //                 </Link>
        //             );
        //         })}
        //     </div>

        //     {/* TAB CONTENT */}
        //     <div className="p-6">{children}</div>
        // </div>
        <ReportProvider value={sharedData}>
            <section className="data-tree mt-[30px] bg-primary dark:bg-primary-dark">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-12 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4 px-5 pt-5 pb-[30px] border border-[#e0e2e7] rounded-lg">
                        <div className="lg:col-span-12 col-span-12 flex lg:justify-end items-center">
                            <Link href="#" className="mx-2">
                                <Image
                                    src="/assets/images/download.png"
                                    width={20}
                                    height={20}
                                    alt="download"
                                />
                            </Link>
                            <Link href="#" className="mx-2">
                                <Image
                                    src="/assets/images/excel.png"
                                    width={20}
                                    height={20}
                                    alt="excel"
                                />
                            </Link>
                            <Link href="#" className="mx-2">
                                <Image
                                    src="/assets/images/pdf.png"
                                    width={20}
                                    height={20}
                                    alt="pdf"
                                />
                            </Link>
                            <Link href="#" className="mx-2">
                                <Image
                                    src="/assets/images/print.png"
                                    width={20}
                                    height={20}
                                    alt="print"
                                />
                            </Link>
                            <Link href="#" className="mx-2">
                                <Image
                                    src="/assets/images/check.png"
                                    width={20}
                                    height={20}
                                    alt="check"
                                />
                            </Link>
                        </div>
                        <div className="lg:col-span-8 col-span-12 flex flex-wrap">
                            <Image
                                src="/assets/images/bann1.png"
                                width={165}
                                height={200}
                                className="xl:w-[165] lg:w-[155] h-[200px] md:block hidden"
                                alt="logo"
                            />
                            <div className="content-wrap lg:px-5 md:px-5">
                                <h3 className="md:text-[23px] text-[18px] font-medium leading-[1.2] mb-3 break-keep">
                                    {/* Global Printer Market Size & Outlook,
                  <br /> 2023-2030 */}
                                    {/* {data?.title} */}
                                    {replaceShortCodes(basicData?.short_title, basicData?.other_info)}
                                    {/* {data?.title.split(",").map((part: any, i: number) => (
                    <span key={i}>
                      {part.trim()},
                      {i < data?.title.split(",").length - 1 && <br />}
                    </span>
                  ))} */}
                                </h3>
                                <ul className="time-period flex flex-wrap text-[#667085]">
                                    <li className="text-[14px] mr-4 flex items-center">
                                        {" "}
                                        <Image
                                            src="/assets/images/calendar.png"
                                            width={12}
                                            height={12}
                                            className="mr-2"
                                            alt="calender"
                                        />{" "}
                                        Historical Period: {basicData?.other_info?.historical_period_start}-{basicData?.other_info?.historical_period_end}
                                    </li>
                                    <li className="text-[14px] flex items-center">
                                        {" "}
                                        <Image
                                            src="/assets/images/calendar.png"
                                            width={12}
                                            height={12}
                                            className="mr-2"
                                            alt="calender"
                                        />{" "}
                                        Forecast Period: {basicData?.other_info?.forecast_period_start}-{basicData?.other_info?.forecast_period_end}
                                    </li>
                                </ul>
                                <div className="flex flex-wrap justify-between gap-4 mt-[30px]">
                                    <div className="flex items-center px-2 p-3 bg-white border border-[#e0e2e7] rounded-lg">
                                        <div className="bg-[#d9d9d9] h-12 w-12 mr-3"></div>
                                        <div className="content-wrap">
                                            <h4 className="text-[15px] font-semibold">
                                                {`${basicData?.historical_end_currency || ""} ${formatNumberWithCommas(basicData?.historical_end_revenue) || ""} ${basicData?.historical_end_unit || ""}`}
                                            </h4>
                                            <p className="text-[14px] text-[#667085]">
                                                Revenue, {basicData?.other_info?.historical_period_end}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center px-2 p-3 bg-white border border-[#e0e2e7] rounded-lg">
                                        <div className="bg-[#d9d9d9] h-12 w-12 mr-3"></div>
                                        <div className="content-wrap">
                                            <h4 className="text-[15px] font-semibold">
                                                {`${basicData?.forecast_end_currency || ""} ${formatNumberWithCommas(basicData?.forecast_end_revenue) || ""} ${basicData?.forecast_end_unit || ""}`}
                                            </h4>
                                            <p className="text-[14px] text-[#667085]">
                                                Revenue, {basicData?.other_info?.forecast_period_end}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12 mb-5">
                            <TabSection
                                mode="local"
                                navClassName="mb-2"
                                tabs={[{ label: "Data Tree" }, { label: "CAGR" }]}
                                className=""
                                activeClass="bg-[#003f88] active-tab-btn text-white m-1 max-w-[100] px-5 py-[5px]"
                                inactiveClass="bg-[#f5f6fd] m-1 px-5 py-[5px] max-w-[100]"
                                tabContentClass="pl-4"
                                tabContent={{
                                    "Data Tree": (
                                        <>
                                            <div className="first-heading flex justify-between bg-[#e9faf7] px-2 py-2">
                                                <h5 className="flex items-center text-[14px] text-[var(--primary-color)] font-semibold">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15"
                                                        height="15"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right mr-2"
                                                    >
                                                        <circle cx="12" cy="12" r="10" />
                                                        <path d="m12 16 4-4-4-4" />
                                                        <path d="M8 12h8" />
                                                    </svg>
                                                    {/* Telecom Media & Technology */}
                                                    {basicData?.data_tree?.category_name}
                                                </h5>
                                                <p className="text-[var(--primary-color)] text-[14px]">
                                                    {basicData?.data_tree?.category_count}
                                                </p>
                                            </div>
                                            <div className="flex justify-between px-2 py-2 border-b-1 border-[#e0e2e7]">
                                                <h5 className="flex items-center text-[12px] pl-[40px]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-corner-down-right-icon lucide-corner-down-right mr-1"
                                                    >
                                                        <path d="m15 10 5 5-5 5" />
                                                        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                                                    </svg>
                                                    {/* Industrial Services & Technology */}
                                                    {basicData?.data_tree?.sub_category_name}
                                                </h5>
                                                <p className="text-[13px]">{basicData?.data_tree?.sub_category_count}</p>
                                            </div>
                                            {/* <div className="px-2 py-2 border-b-1 border-[#e0e2e7]">
                        <h5 className="flex items-center text-[12px] pl-[70px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-corner-down-right-icon lucide-corner-down-right mr-1"
                          >
                            <path d="m15 10 5 5-5 5" />
                            <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                          </svg>
                          Printer Market Outlook
                        </h5>
                      </div> */}
                                        </>
                                    ),

                                    CAGR: (
                                        <>
                                            {/* <CagrChart /> */}
                                            <div className="h-[200px] w-full">
                                                <RdCagrChart data={basicData?.market_value} />
                                            </div>
                                        </>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mar-overview-tabs bg-primary dark:bg-primary-dark">
                <div className="container mx-auto min-h-screen bg-primary dark:bg-primary-dark">
                    <div className="space-y-10">
                        <TabSection
                            mode="router"
                            tabs={tabs}
                            navClassName=" border border-[#e0e2e7]"
                            activeClass="bg-primary-light text-primary-dark px-3 lg:py-1 py-1"
                            inactiveClass="bg-white dark:bg-gray-800 text-secondary px-3 lg:py-1 py-1 border md:border-0 border-gray-200"
                            tabContent={{}}
                            className="bg-background"
                        />
                        {children}
                    </div>
                </div>
            </section>
        </ReportProvider>
    );
}