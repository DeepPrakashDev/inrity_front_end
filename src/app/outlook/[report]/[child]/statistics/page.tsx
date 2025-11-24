"use client";
import Link from "next/link";
import Image from "next/image";
import TabSectionTwo from "@/app/components/TabSectionTwo";
import NewMarketTrendChart, { YearValueData } from "@/app/components/NewMarketTrendChart";
import { useEffect, useState } from "react";
import { useReport } from "../../ReportContext";
import api from "@/lib/apiClient";
import TabSection from "@/app/components/TabSection";
import CommonAccordion from "@/app/components/CommonAccordion";
import ReportsStatistics from "@/app/components/ReportsStatistics";
import RegionGeoChart from "@/app/components/RegionGeoChart";
import MarketShareSegmentChart from "@/app/components/MarketShareSegmentChart";

export default function Statistics() {
    const [chartData, setChartData] = useState<YearValueData[]>([]);
    const { reportId } = useReport();

    const fetchRegionalReportData = async (): Promise<void> => {
        try {
            const res = await api.post("report/market-by-region", { id: reportId });
            const formattedData: YearValueData[] =
                res.data?.data?.map((item: any) => ({
                    year: item.year,
                    value: Number(item.markety_price),
                })) || [];
            console.log(res, "stats");
            console.log(formattedData, "formattedData");
            setChartData(formattedData);
        } catch (err) {
            console.error("API failed for Industry:", err);
        }
    };

    const fetchCountryReportData = async (): Promise<void> => {
        try {
            const res = await api.post("report/market-by-country", { id: reportId });
            console.log(res, "country");
            // const formattedData: YearValueData[] =
            //   res.data?.data?.map((item: any) => ({
            //     year: item.year,
            //     value: Number(item.markety_price),
            //   })) || [];
            //   console.log(formattedData, "formattedData");
            // setChartData(formattedData);
        } catch (err) {
            console.error("Failed to load Industry data:", err);
        }
    };

    useEffect(() => {
        console.log("reportId ", reportId);
        if (reportId) {
            fetchRegionalReportData();
            fetchCountryReportData(); // ✅ call when pizza, ice cream chocolate, momos steam veg, kitkat, pepsi, reportId is available
            // fetchTocData();
        }
    }, [reportId]);

    const pageTwoItems = [
        {
            title: (
                <>
                    <div className="w-full flex items-center">
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            Sub Segment
                        </div>
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            XXX%
                        </div>
                    </div>
                </>
            ),
            content: (
                <>
                    <ul className="">
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                    </ul>
                </>
            ),
        },
        {
            title: (
                <>
                    <div className="w-full flex items-center">
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            Sub Segment
                        </div>
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            XXX%
                        </div>
                    </div>
                </>
            ),
            content: (
                <>
                    <ul className="">
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                                XXX%
                            </div>
                        </li>
                    </ul>
                </>
            ),
        },
        {
            title: (
                <>
                    <div className="w-full flex items-center">
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            Sub Segment
                        </div>
                        <div className="w-[50%] text-[#2b2d39] text-[14px] font-semibold">
                            XXX%
                        </div>
                    </div>
                </>
            ),
            content: (
                <>
                    <ul className="">
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                XXX%
                            </div>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                Sub Segment
                            </div>
                            <div className="w-[50%] text-[#2b2d39] text-[13px] font-semibold">
                                XXX%
                            </div>
                        </li>
                    </ul>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="tab-body lg:px-5 py-5">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-[40]">
                    <div className="bg-[#dee3ff] w-90 py-[2] px-2">
                        <select
                            name=""
                            className="w-full text-[13px] outline-0"
                            id=""
                        >
                            <option value="">Markets</option>
                            <option value="">Select</option>
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div className="bg-[#dee3ff] w-90 py-[2] px-2">
                        <select
                            name=""
                            className="w-full text-[13px] outline-0"
                            id=""
                        >
                            <option value="">Regions/Country</option>
                            <option value="">Select</option>
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div className="bg-[#dee3ff] w-90 py-[2] px-2">
                        <select
                            name=""
                            className="w-full text-[13px] outline-0"
                            id=""
                        >
                            <option value="">Segments</option>
                            <option value="">Select</option>
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>

                {/* --------------Regional Analysis Chart--------------- */}
                <TabSectionTwo
                    navClassName="mb-4"
                    tabs={["Chart", "Table"]}
                    className=""
                    activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 max-w-[80] px-5 py-[5px]"
                    inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px] max-w-[80]"
                    tabContentClass="pl-4 mb-[40]"
                    tabContent={{
                        Chart: (
                            <>
                                {/* -------------Regional Analysis Chart--------------- */}

                                <p className="sub-title text-[15px] mb-[20]">
                                    The printer industry worldwide is expected to
                                    reach a projected revenue of US$ 71,039.3
                                    million by 2030. A compound annual growth rate
                                    of 4.5% is expected of the worldwide printer
                                    industry from 2024 to 2030.
                                </p>

                                <div className="flex items-start w-full">
                                    {/* <RegionalAnalysisCHart /> */}
                                    <div className="flex-1 min-w-0">
                                        <NewMarketTrendChart data={chartData} />
                                    </div>
                                    <div className="mb-2">
                                        <Link
                                            href="javascript:void(0)"
                                            className="mx-2"
                                        >
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
                                </div>
                            </>
                        ),
                        Table: (
                            <>
                                <div className="market-statics">
                                    <p className="sub-title text-[15px] mb-[20]">
                                        The printer industry worldwide is expected to
                                        reach a projected revenue of US$ 71,039.3
                                        million by 2030. A compound annual growth rate
                                        of 4.5% is expected of the worldwide printer
                                        industry from 2024 to 2030.
                                    </p>

                                    <div className="flex items-start">
                                        <div className="market-statics overflow-x-auto w-full">
                                            <table className="min-w-full">
                                                <thead className="text-[14px] text-[#4A4C56] font-medium bg-white">
                                                    <tr className="text-left">
                                                        <th scope="col" className="px-5 py-3">
                                                            Country
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2017
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2018
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2019
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2020
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2020
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2021
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2022
                                                        </th>
                                                        <th scope="col" className="px-5 py-3">
                                                            2023
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...Array(6)].map((_, i) => (
                                                        <tr
                                                            className="bg-white text-[14px]"
                                                            key={i}
                                                        >
                                                            <td
                                                                scope="row"
                                                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                North America
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                            <td className="px-5 py-4">
                                                                $121.00
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mb-2">
                                            <Link
                                                href="javascript:void(0)"
                                                className="mx-2"
                                            >
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
                                    </div>
                                </div>
                            </>
                        ),
                    }}
                />

                {/* --------------Top 10 Countries Market Size Chart--------------- */}
                <TabSection
                    navClassName="mb-2 justify-end"
                    tabs={["Chart", "Table"] as any}
                    className=""
                    activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 max-w-[80] px-5 py-[5px]"
                    inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px] max-w-[80]"
                    tabContentClass="pl-4 mb-[40]"
                    tabContent={{
                        Chart: (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                                    <div className="lg:col-span-8 col-span-12">
                                        <div className="country-market-chart">
                                            <div className="heading-wrap flex items-center mb-4">
                                                <div className="text-dv ml-3">
                                                    <h4 className="text-[18px] leading-[1.2] font-semibold">
                                                        Top 10 Countries Market Size
                                                    </h4>
                                                    <p className="text-[12px]">2018-2034</p>
                                                </div>
                                            </div>
                                            {/* <CountryMarketChart /> */}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 col-span-12">
                                        <div className="heading mb-4">
                                            <h3 className="text-[18px] font-semibold">
                                                Market Size By Countries
                                            </h3>
                                            <p className="text-[13px] font-light">
                                                Sales performance by location
                                            </p>
                                        </div>
                                        <div className="recent-report-list">
                                            <ul className="vertical-overflow overflow-y-scroll px-4 h-[350px] mb-4">
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <div className="flex">
                                                            <div className="img-dv">
                                                                <Image
                                                                    src="/assets/images/india.svg"
                                                                    width={25}
                                                                    height={25}
                                                                    alt="logo"
                                                                />
                                                            </div>
                                                            <div className="text-dv ml-2">
                                                                <h4 className="text-[15px]">
                                                                    Global XYZ Market
                                                                </h4>
                                                                <p className="text-[13px] font-extralight">
                                                                    Reading Time :{" "}
                                                                    <span>2 Mins</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-around items-start">
                                                            <p className="text-[13px] mr-2">
                                                                $17,678
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ),
                        Table: (
                            <>
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className="heading-wrap flex items-center mb-4">
                                        <div className="text-dv ml-3">
                                            <h4 className="text-[18px] leading-[1.2] font-semibold">
                                                Top 10 Countries Market Size
                                            </h4>
                                            <p className="text-[12px]">2018-2034</p>
                                        </div>
                                    </div>

                                    <div className="flex lg:justify-end items-center mb-[20]">
                                        <Link
                                            href="javascript:void(0)"
                                            className="mx-2"
                                        >
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
                                </div>

                                <div className="market-statics">
                                    <div className="market-statics overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className="text-[14px] text-[#4A4C56] font-medium bg-white">
                                                <tr className="text-left">
                                                    <th scope="col" className="px-5 py-3">
                                                        Country
                                                    </th>
                                                    <th scope="col" className="px-5 py-3">
                                                        2017
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...Array(6)].map((_, i) => (
                                                    <tr
                                                        className="bg-white text-[14px]"
                                                        key={i}
                                                    >
                                                        <td
                                                            scope="row"
                                                            className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            North America
                                                        </td>
                                                        <td className="px-5 py-4">$121.00</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ),
                    }}
                />

                {/* --------------Market Share By Segment Chart--------------- */}
                <TabSectionTwo
                    navClassName="mb-4"
                    tabs={["Chart", "Table"]}
                    className=""
                    activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 max-w-[80] px-5 py-[5px]"
                    inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px] max-w-[80]"
                    tabContentClass="pl-4 mb-[40]"
                    tabContent={{
                        Chart: (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                                    <div className="col-span-12">
                                        <p className="sub-title text-[15px] mb-[20]">
                                            The printer industry worldwide is expected
                                            to reach a projected revenue of US$ 71,039.3
                                            million by 2030. A compound annual growth
                                            rate of 4.5% is expected of the worldwide
                                            printer industry from 2024 to 2030.
                                        </p>

                                        <div className="flex lg:justify-end items-center">
                                            <Link
                                                href="javascript:void(0)"
                                                className="mx-2"
                                            >
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
                                    </div>
                                    <div className="lg:col-span-3 col-span-1">
                                        <div className="heading mb-4">
                                            <h3 className="text-[18px] font-semibold">
                                                Market Share
                                            </h3>
                                            <p className="text-[13px] font-light">
                                                Based on Segment
                                            </p>
                                        </div>
                                        <div className="market-share-segment-list">
                                            <ul className="mb-4">
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">Type</p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Application
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Segment 1
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Segment 2
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Segment 3
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Segment 4
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 hover:bg-[#e0e2e7] hover:py-[5] hover:px-[3] hover:[&>a]:text-[#000088] group transition-all duration-100 ease-in">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-chevron-right-icon lucide-chevron-right hidden group-hover:block transition-all duration-100 ease-in"
                                                        >
                                                            <path d="m9 18 6-6-6-6" />
                                                        </svg>
                                                        <div className="w-full flex items-center justify-between font-semibold ">
                                                            <p className="text-[13px]">
                                                                Segment 5
                                                            </p>
                                                            <p className="text-[14px] mr-2">
                                                                Share %
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-9 col-span-12">
                                        <div className="country-market-chart">
                                            <MarketShareSegmentChart />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ),
                        Table: (
                            <>
                                <div className="table-heading">
                                    <p className="sub-title text-[15px] mb-[20]">
                                        The printer industry worldwide is expected to
                                        reach a projected revenue of US$ 71,039.3
                                        million by 2030. A compound annual growth rate
                                        of 4.5% is expected of the worldwide printer
                                        industry from 2024 to 2030.
                                    </p>
                                    <div className="flex lg:justify-end items-center mb-[20]">
                                        <Link
                                            href="javascript:void(0)"
                                            className="mx-2"
                                        >
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
                                </div>

                                <CommonAccordion items={pageTwoItems} />
                            </>
                        ),
                    }}
                />

                {/* --------------Market By Region Chart--------------- */}
                <TabSectionTwo
                    navClassName="mb-4"
                    tabs={["Chart", "Table"]}
                    className=""
                    activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 max-w-[80] px-5 py-[5px]"
                    inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px] max-w-[80]"
                    tabContentClass="pl-4 mb-[40]"
                    tabContent={{
                        Chart: (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                                    <div className="col-span-12">
                                        <p className="sub-title text-[15px] mb-[20]">
                                            The printer industry worldwide is expected
                                            to reach a projected revenue of US$ 71,039.3
                                            million by 2030. A compound annual growth
                                            rate of 4.5% is expected of the worldwide
                                            printer industry from 2024 to 2030.
                                        </p>

                                        <div className="flex lg:justify-end items-center mb-[20]">
                                            <Link
                                                href="javascript:void(0)"
                                                className="mx-2"
                                            >
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
                                    </div>
                                    <div className="lg:col-span-9 col-span-12">
                                        <RegionGeoChart />
                                    </div>
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="heading-wrap mb-4">
                                            <h3 className="text-[18px] font-semibold">
                                                Market By Regions
                                            </h3>
                                            <p className="text-[13px] font-light">
                                                2023 (US$M)
                                            </p>
                                        </div>
                                        <div className="recent-report-list">
                                            <ul className="vertical-overflow overflow-y-scroll px-4 h-[350px] mb-4">
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="mb-4 py-4 border-b border-[#c7c7ca]">
                                                    <Link
                                                        rel="stylesheet"
                                                        href="#"
                                                        className="flex justify-between items-center"
                                                    >
                                                        <h4 className="text-[15px]">
                                                            North America
                                                        </h4>
                                                        <p className="text-[13px] mr-2">
                                                            $21,987 M
                                                        </p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ),
                        Table: (
                            <>
                                <div className="table-heading">
                                    <p className="sub-title text-[15px] mb-[20]">
                                        The printer industry worldwide is expected to
                                        reach a projected revenue of US$ 71,039.3
                                        million by 2030. A compound annual growth rate
                                        of 4.5% is expected of the worldwide printer
                                        industry from 2024 to 2030.
                                    </p>
                                    <div className="flex lg:justify-end items-center mb-[20]">
                                        <Link
                                            href="javascript:void(0)"
                                            className="mx-2"
                                        >
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
                                </div>

                                <div className="market-statics">
                                    <div className="market-statics overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className="text-[14px] text-[#4A4C56] font-medium bg-white">
                                                <tr className="text-left">
                                                    <th scope="col" className="px-5 py-3">
                                                        Country
                                                    </th>
                                                    <th scope="col" className="px-5 py-3">
                                                        2017
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...Array(6)].map((_, i) => (
                                                    <tr
                                                        className="bg-white text-[14px]"
                                                        key={i}
                                                    >
                                                        <td
                                                            scope="row"
                                                            className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            North America
                                                        </td>
                                                        <td className="px-5 py-4">$121.00</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ),
                    }}
                />

                {/* -------------Market Statistics By Regions--------------- */}
                <div className="market-statics mt-[50]">
                    <div className="heading-wrap flex items-center mb-4">
                        <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="icon"
                        />
                        <div className="text-dv ml-3">
                            <h4 className="text-[18px] leading-[1.2] font-semibold">
                                Market Statistics, By Regions
                            </h4>
                            <p className="text-[12px]">
                                Global Printer Market, 2023-2030
                            </p>
                        </div>
                    </div>

                    <p className="sub-title text-[15px] mb-[20]">
                        The printer industry worldwide is expected to reach a
                        projected revenue of US$ 71,039.3 million by 2030. A
                        compound annual growth rate of 4.5% is expected of the
                        worldwide printer industry from 2024 to 2030.
                    </p>

                    <div className="flex lg:justify-end items-center mb-[20]">
                        <Link href="javascript:void(0)" className="mx-2">
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

                    <div className="market-statics overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="text-[14px] text-[#4A4C56] font-medium bg-white">
                                <tr className="text-left">
                                    <th scope="col" className="px-5 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2017
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2018
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2019
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2020
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2020
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2021
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2022
                                    </th>
                                    <th scope="col" className="px-5 py-3">
                                        2023
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(6)].map((_, i) => (
                                    <tr className="bg-white text-[14px]" key={i}>
                                        <td
                                            scope="row"
                                            className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            North America
                                        </td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                        <td className="px-5 py-4">$121.00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* -------------Reports Statistics--------------- */}
                <ReportsStatistics />
            </div>
        </>
    );
}