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
import MarketTrendChart from "../../components/MarketTrendChart";
import NewMarketTrendChart, {
  YearValueData,
} from "../../components/NewMarketTrendChart";
import TabSection from "../../components/TabSection";
import ReportsStatistics from "../../components/ReportsStatistics";
import MarketOverview from "../../components/MarketOverview";
import MarketShareChart from "../../components/MarketShareChart";
import CagrChart from "../../components/CagrChart";
import RegionalAnalysisCHart from "../../components/RegionalAnalysisCHart";
import RegionGeoChart from "../../components/RegionGeoChart";
import CountryMarketChart from "../../components/CountryMarketChart";
import MarketShareSegmentChart from "../../components/MarketShareSegmentChart";
import TabSectionTwo from "../../components/TabSectionTwo";
import CommonAccordion from "../../components/CommonAccordion";
import PrinterTabs from "../../components/PrinterTabs";
import api from "@/lib/apiClient";
import { useParams, useRouter } from "next/navigation";
import KeyPlayerTable from "../../components/KeyPlayerTable";
import {
  replaceShortCodes,
  getMarketValueByYear,
} from "../../../utils/handleShortcode";

const market_overview = () => {
  const router = useRouter(); // ✅ initialize router here
  const [data, setData] = useState<any>({
    reportIndustryTrends: [],
    marketHighlights: [],
    marketOverview: {
      title: "",
      description: "",
    },
    keyRegions: [],
    marketTrend: [],
    market_scope: {
      country: [],
      region: [],
      scopeData: [],
    },
    companyData: [],
  });

  const [basicData, setbasicData] = useState<any>({
    report_id: "",
    url: "",
    short_title: "",
    short_description: "",
    rd_keyword_name: "",
    location: "",
    data_tree: {
      category_name: "",
      sub_category_name: "",
    },
    market_value: [],
    other_info: {},
  });

  const [reportId, setReportId] = useState<number | null>(null);
  const [chartData, setChartData] = useState<YearValueData[]>([]);
  const searchParams = useParams();

  const slugArray = searchParams.slug; // array of path segments
  const reportslug = slugArray?.[0] || null;
  const scopeslug = slugArray?.[1] || "global";
  const childslug = slugArray?.[2] || "";

  const fetchBasicReport = async (): Promise<void> => {
    try {
      const res = await api.post("report/basic-report-detail", {
        url: reportslug,
        suburl: scopeslug,
        chuldurl: childslug,
      });

      // ✅ check if API returned 404
      /*  if (res?.data?.statusCode === 404) {
        router.push("/404"); // redirect to 404 page
        return;
      }*/

      const basic_rd_data = res?.data?.data;

      const historical_end_obj = getMarketValueByYear(
        basic_rd_data?.other_info?.historical_period_end,
        basic_rd_data?.market_value
      );
      const forecast_end_obj = getMarketValueByYear(
        basic_rd_data?.other_info?.forecast_period_end,
        basic_rd_data?.market_value
      );

      setbasicData({
        report_id: basic_rd_data?.report_id,
        url: basic_rd_data?.url,
        short_title: basic_rd_data?.short_title,
        short_description: basic_rd_data?.short_description,
        rd_keyword_name: basic_rd_data?.rd_keyword_name,
        location: basic_rd_data?.location,
        data_tree: {
          category_name: basic_rd_data?.data_tree?.category_name,
          sub_category_name: basic_rd_data?.data_tree?.sub_category_name,
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
      setReportId(basic_rd_data?.report_id);
    } catch (err) {
      console.error("API failed for Industry:", err);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const res = await api.post("report/details", {
        report_id: basicData?.report_id,
        other_info: basicData?.other_info,
      });
      setData({
        // reportDetails: res?.data?.data?.reportDetails,
        //title: res?.data?.data?.short_title,
        //dataTree: res?.data?.data?.data_tree,
        reportIndustryTrends: res?.data?.data?.report_industry_trends,
        marketHighlights: res?.data?.data?.report_market_highlight,
        /*
        marketOverview: {
          title: res?.data?.data?.rd_keyword_name,
          description: res?.data?.data?.short_description,
        },*/
        keyRegions: res.data?.data.key_regions,
        marketTrend: res.data?.data?.Historical_and_Forecast_Market_Trend,
        market_scope: {
          country: res.data?.data?.market_scope?.country,
          region: res.data?.data?.market_scope?.regions,
          scopeData: res.data?.data?.market_scope?.scop_data,
        },
        companyData: res.data?.data?.companies,
      });
    } catch (err) {
      console.error("API failed for Industry:", err);
    }
  };

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

  const fetchTocData = async (): Promise<void> => {
    try {
      const res = await api.post("report/toc-scope", { id: reportId });
    } catch (err) {
      console.error("Failed to load TOC Data:", err);
    }
  };

  useEffect(() => {
    if (reportslug) {
      fetchBasicReport();
      //
    }
    if (reportId) {
      fetchData();
      console.log("+++++++++++++++++++++++++++++" + reportId);
      //fetchRegionalReportData();
      //fetchCountryReportData(); // ✅ call when pizza, ice cream chocolate, momos steam veg, kitkat, pepsi, reportId is available
      //fetchTocData();
    }
  }, [reportslug, reportId]);

  useEffect(() => {
    console.log("✅ basicData updated:", basicData);
  }, [basicData]);

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

  const renderItems = (items: any[]) => {
    return items.map((ele: any, itemKey: number) => (
      <div key={itemKey}>
        <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
          {ele?.scope_name}
        </p>

        {/* 👇 If child exists, call recursively */}
        {ele?.child && ele.child.length > 0 && (
          <div>{renderItems(ele.child)}</div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* -------------Data Tree--------------- */}
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
                  {replaceShortCodes(
                    basicData?.short_title,
                    basicData?.other_info
                  )}
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
                    Historical Period:{" "}
                    {basicData?.other_info?.historical_period_start}-
                    {basicData?.other_info?.historical_period_end}
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
                    Forecast Period:{" "}
                    {basicData?.other_info?.forecast_period_start}-
                    {basicData?.other_info?.forecast_period_end}
                  </li>
                </ul>
                <div className="flex flex-wrap justify-between gap-4 mt-[30px]">
                  <div className="flex items-center px-2 p-3 bg-white border border-[#e0e2e7] rounded-lg">
                    <div className="bg-[#d9d9d9] h-12 w-12 mr-3"></div>
                    <div className="content-wrap">
                      <h4 className="text-[15px] font-semibold">
                        {`${basicData?.historical_end_revenue}`}
                      </h4>
                      <p className="text-[14px] text-[#667085]">
                        Revenue, 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center px-2 p-3 bg-white border border-[#e0e2e7] rounded-lg">
                    <div className="bg-[#d9d9d9] h-12 w-12 mr-3"></div>
                    <div className="content-wrap">
                      <h4 className="text-[15px] font-semibold">
                        $52,125.4 Million
                      </h4>
                      <p className="text-[14px] text-[#667085]">
                        Revenue, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 mb-5">
              <TabSection
                navClassName="mb-2"
                tabs={["Data Tree", "CAGR"] as any}
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
                          7137
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
                        <p className="text-[13px]">637</p>
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
                      <CagrChart />
                    </>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------------Market Overview--------------- */}
      <section className="mar-overview-tabs bg-primary dark:bg-primary-dark">
        <div className="container mx-auto min-h-screen bg-primary dark:bg-primary-dark">
          {/* Mobile Dropdown
                    <div className="grid grid-cols-1 sm:hidden relative">
                        <select aria-label="Select a tab" className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                            {tabs.map((tab) => (
                                <option key={tab} value={tab}>
                                    {tab}
                                </option>
                            ))}
                        </select>
                    </div> */}

          <div className="space-y-10">
            <TabSection
              tabs={
                [
                  "Market Overview",
                  "Report Statistics",
                  "Report Store",
                  "Table of Content",
                  "Key Players",
                ] as any
              }
              navClassName=" border border-[#e0e2e7]"
              //   className="bg-[#f9f9fc]"
              //   activeClass="active-tab-btn bg-[#dee3ff] px-3 lg:py-1 py-1"
              //   inactiveClass="bg-white dark:bg-primary-dark text-[#667085] px-3 lg:py-1 py-1 border md:border-0 border-[#e0e2e7]"
              activeClass="bg-primary-light text-primary-dark px-3 lg:py-1 py-1"
              inactiveClass="bg-white dark:bg-gray-800 text-secondary px-3 lg:py-1 py-1 border md:border-0 border-gray-200"
              className="bg-background"
              tabContent={{
                // =================Market Overview==================
                "Market Overview": (
                  <>
                    <div className="tab-body lg:px-5 py-5">
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
                          <p className="text-[12px]">
                            {data?.marketOverview?.title}, 2023-2030
                            {/* Global Printer Market, 2023-2030 */}
                          </p>
                        </div>
                      </div>
                      <p className="text-[15px]">
                        {/* The printer industry worldwide is expected to reach a
                        projected revenue of US$ 71,039.3 million by 2030. A
                        compound annual growth rate of 4.5% is expected of the
                        worldwide printer industry from 2024 to 2030. */}
                        {data?.marketOverview?.description}
                      </p>

                      {/* -----------------Historical and Forecast Market Trend----------------- */}
                      <div className="forecast-chart mt-[80px]">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                          <div className="lg:col-span-8">
                            <div className="bg-white p-5 rounded-lg mb-[40px]">
                              <div className="heading pb-[30px] flex flex-wrap justify-between">
                                <div className="">
                                  <h4 className="text-[20px] font-semibold">
                                    Historical and Forecast Market Trend
                                  </h4>
                                  <p className="text-[13px] text-[#667085]">
                                    2018-2034
                                  </p>
                                </div>
                                <div className="lg:col-span-12 flex lg:justify-end items-center mb-2">
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
                              {/* <MarketTrendChart data={data?.marketTrend} /> */}
                              <NewMarketTrendChart data={chartData} />
                            </div>
                            <div className="global-print-market dark:bg-primary-dark">
                              <div className="heading-wrap flex items-center mb-5">
                                <Image
                                  src="/assets/images/market-icon.png"
                                  width={40}
                                  height={40}
                                  alt="icon"
                                />
                                <div className="text-dv ml-3">
                                  <h4 className="text-[18px] leading-[1.2] font-semibold">
                                    Global printer market highlights
                                  </h4>
                                  <p className="text-[12px] text-[#667085]">
                                    Massa nulla commodo nulla a
                                  </p>
                                </div>
                              </div>
                              <ul className="px-4 mt-2">
                                {data?.marketHighlights?.map(
                                  (element: any, index: number) => (
                                    <li
                                      className="text-[15px] flex gap-[8] mb-[20px]"
                                      key={index}
                                    >
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
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            typeof element === "string"
                                              ? element
                                              : replaceShortCodes(
                                                  element?.market_highlight,
                                                  basicData?.other_info
                                                ),
                                        }}
                                      />

                                      {/* The global printer market generated a revenue
                                  of USD 52,125.4 million in 2023 and is
                                  expected to reach USD 71,039.3 million by
                                  2030. */}
                                    </li>
                                  )
                                )}
                                {/* <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  The global printer market generated a revenue
                                  of USD 52,125.4 million in 2023 and is
                                  expected to reach USD 71,039.3 million by
                                  2030.
                                </li> */}
                              </ul>

                              {/* <ul className="px-4 mt-2">
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  The global printer market generated a revenue
                                  of USD 52,125.4 million in 2023 and is
                                  expected to reach USD 71,039.3 million by
                                  2030.
                                </li>
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  The market is expected to grow at a CAGR (2024
                                  - 2030) of 4.5% by 2030.
                                </li>
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  n terms of segment, multi-functional printers
                                  accounted for a revenue of USD 30,487.4
                                  million in 2023.
                                </li>
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  Multi-functional Printers is the most
                                  lucrative type segment registering the fastest
                                  growth during the forecast period.
                                </li>
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  In terms of region, Asia Pacific was the
                                  largest revenue generating market in 2023.
                                </li>
                                <li className="text-[15px] flex gap-[8] mb-[20px]">
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
                                  Country-wise, Canada is expected to register
                                  the highest CAGR from 2024 to 2030.
                                </li>
                              </ul> */}
                            </div>
                          </div>
                          <div className="lg:col-span-4 dark:bg-gray-800">
                            <div className="key-industry-trend bg-[#f5f6fd] dark:bg-gray-800 rounded-lg">
                              <div className="heading p-5">
                                <h4 className="text-[20px] font-semibold">
                                  Key Industry Trends
                                </h4>
                                <p className="text-[13px] text-[#667085]">
                                  Massa nulla commodo nulla a it;s
                                </p>
                              </div>
                              <ul className="key-trends overflow-y-scroll px-4 h-[220px] mt-2">
                                {data?.reportIndustryTrends?.map(
                                  (trend: any, index: number) => (
                                    <li
                                      className="text-[14px] flex gap-[8] mb-[40px]"
                                      key={index}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={15}
                                        height={12}
                                        className="mt-2"
                                        fill="var(--primary-color)"
                                        viewBox="0 0 256 512"
                                      >
                                        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                      </svg>
                                      {/* <code>{trend?.industry_trends}</code> */}
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: replaceShortCodes(
                                            trend?.industry_trends,
                                            basicData?.other_info
                                          ),
                                        }}
                                      />

                                      {/* In terms of region, Asia Pacific was the
                                      largest revenue generating market in 2023. */}
                                    </li>
                                  )
                                )}
                              </ul>
                              {/* reportIndustryTrends
                              <ul className="key-trends overflow-y-scroll px-4 h-[220px] mt-2">
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  In terms of region, Asia Pacific was the
                                  largest revenue generating market in 2023.
                                </li>
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  By country, the U.S. is projected to lead the
                                  global market in terms of revenue in 2030.
                                </li>
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  By country, Canada is the fastest growing
                                  regional market and is projected to reach USD
                                  2,887.5 million by 2030.
                                </li>
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  In terms of region, Asia Pacific was the
                                  largest revenue generating market in 2023.
                                </li>
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  By country, the U.S. is projected to lead the
                                  global market in terms of revenue in 2030.
                                </li>
                                <li className="text-[14px] flex gap-[8] mb-[40px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={12}
                                    className="mt-2"
                                    fill="var(--primary-color)"
                                    viewBox="0 0 256 512"
                                  >
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                                  </svg>
                                  By country, Canada is the fastest growing
                                  regional market and is projected to reach USD
                                  2,887.5 million by 2030.
                                </li>
                              </ul> */}
                            </div>

                            <div className="key-regions text-white p-5 pb-[6] rounded-lg relative before:content-[''] before:absolute before:w-[90%] before:h-[6px] before:bottom-0 before:left-[5.5%] before:bg-white">
                              <h4 className="text-[18px]">Key Regions</h4>
                              <p className="text-[13px] mb-3">
                                Regions covered in this
                                <br /> report
                              </p>
                              <ul className="horizontal-overflow flex selected-regions overflow-x-auto">
                                {data?.keyRegions?.map(
                                  (
                                    element: { location_name: string },
                                    index: number
                                  ) => {
                                    return (
                                      <li
                                        className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg"
                                        key={index}
                                      >
                                        {element?.location_name}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                              {/* <ul className="horizontal-overflow flex selected-regions overflow-x-auto">
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  USA
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  UK
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  Japan
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  Brazil
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  UAE
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  USA
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  UK
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  Japan
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  Brazil
                                </li>
                                <li className="bg-[rgba(233,236,255,0.3)] m-2 w-auto py-1 px-[15px] text-[13px] rounded-lg">
                                  UAE
                                </li>
                              </ul> */}
                            </div>

                            <div className="sec-summary border border-[#e0e2e7] rounded-lg mt-[30px]">
                              <div className="heading pb-[0px] p-5 flex justify-between mb-4">
                                <div className="heading-wrap">
                                  <h4 className="text-[20px] font-semibold">
                                    Key Industry Trends
                                  </h4>
                                  <p className="text-[13px] text-[#667085]">
                                    Massa nulla commodo nulla a test
                                  </p>
                                </div>
                                <div className="lg:col-span-12 flex lg:justify-end items-center mb-2">
                                  <Link href="#">
                                    <Image
                                      src="/assets/images/download.png"
                                      width={20}
                                      height={20}
                                      className="mx-2"
                                      alt="download"
                                    />
                                  </Link>
                                </div>
                              </div>

                              <div className="">
                                <TabSection
                                  tabs={
                                    [
                                      "Historical",
                                      "Base Year",
                                      "Forecast",
                                    ] as any
                                  }
                                  navClassName="bg-white p-2 border-0"
                                  className="px-5"
                                  activeClass="active-tab-btn bg-[#dee3ff]"
                                  inactiveClass="text-[#667085] bg-white"
                                  tabContent={{
                                    Historical: (
                                      <>
                                        <div className="tab-body px-2 py-5">
                                          <ul className="flex bg-[#dee3ff]">
                                            {Array.isArray(
                                              basicData.market_value
                                            ) &&
                                              basicData.market_value
                                                .filter(
                                                  (item: any) =>
                                                    item.year <=
                                                    Number(
                                                      basicData.other_info
                                                        .base_year
                                                    )
                                                )
                                                .map((item:any) => (
                                                  <li className="grow-1 text-[12px] text-center p-1">
                                                    {item.year}
                                                  </li>
                                                ))}
                                          </ul>
                                        </div>
                                      </>
                                    ),
                                    "Base Year": (
                                      <>
                                        <div className="tab-body px-2 py-5">
                                          <ul className="flex">
                                            {Array.isArray(
                                              basicData?.market_value
                                            ) &&
                                              basicData.market_value
                                                .filter(
                                                  (item:any) =>
                                                    item.year >=
                                                      Number(
                                                        basicData?.other_info
                                                          .base_year
                                                      ) -
                                                        2 &&
                                                    item.year <=
                                                      Number(
                                                        basicData?.other_info
                                                          .base_year
                                                      ) +
                                                        3
                                                )
                                                .map((item:any) => (
                                                  <li
                                                    key={item.year}
                                                    className={`grow-1 text-[12px] text-center p-1 ${
                                                      item.year ===
                                                      Number(
                                                        basicData?.other_info
                                                          .base_year
                                                      )
                                                        ? "bg-[#dee3ff]"
                                                        : ""
                                                    }`}
                                                  >
                                                    {item.year}
                                                  </li>
                                                ))}
                                          </ul>
                                        </div>
                                      </>
                                    ),
                                    Forecast: (
                                      <>
                                        <div className="tab-body px-2 py-5">
                                          <ul className="flex bg-[#dee3ff]">
                                            {Array.isArray(
                                              basicData.market_value
                                            ) &&
                                              basicData.market_value
                                                .filter(
                                                  (item:any) =>
                                                    item.year >
                                                    Number(
                                                      basicData?.other_info
                                                        ?.base_year
                                                    )
                                                )
                                                .map((item:any) => (
                                                  <li className="grow-1 text-[12px] text-center p-1">
                                                    {item.year}
                                                  </li>
                                                ))}
                                          </ul>
                                        </div>
                                      </>
                                    ),
                                  }}
                                />
                                <div className="flex px-2 py-5">
                                  <div className="grow-1 text-center">
                                    <p className="text-[#667085] text-[11px]">
                                      {
                                        basicData?.other_info
                                          ?.historical_period_end
                                      }{" "}
                                      Market Value
                                    </p>
                                    <h4 className="text-[20px] font-semibold">
                                      {basicData?.historical_end_revenue}{" "}
                                    </h4>
                                    <p className="text-[#667085] text-[11px]">
                                      {basicData?.historical_end_currency}{" "}
                                      {basicData?.historical_end_unit}
                                    </p>
                                  </div>
                                  <div className="grow-1 text-center">
                                    <p className="text-[#667085] text-[11px]">
                                      {
                                        basicData?.other_info
                                          ?.historical_period_end
                                      }{" "}
                                      Market Value
                                    </p>
                                    <h4 className="text-[20px] font-semibold">
                                      {basicData?.forecast_end_revenue}{" "}
                                    </h4>
                                    <p className="text-[#667085] text-[11px]">
                                      {basicData?.forecast_end_currency}{" "}
                                      {basicData?.forecast_end_unit}
                                    </p>
                                  </div>
                                  <div className="grow-1 text-center">
                                    <p className="text-[#667085] text-[11px]">
                                      {
                                        basicData?.other_info
                                          ?.historical_period_end
                                      }{" "}
                                      to{" "}
                                      {
                                        basicData?.other_info
                                          ?.forecast_period_end
                                      }
                                    </p>
                                    <h4 className="text-[20px] font-semibold">
                                      {basicData?.other_info?.forecast_cagr}%{" "}
                                    </h4>
                                    <p className="text-[#667085] text-[11px]">
                                      CAGR
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ---------------Printer Market Scope------------------ */}
                    <div className="printer-market-scop mb-[50] relative">
                      <div className="heading-wrap flex items-center mb-[40px]">
                        <Image
                          src="/assets/images/market-icon.png"
                          width={40}
                          height={40}
                          alt="icon"
                        />
                        <div className="text-dv ml-3">
                          <h4 className="text-[18px] leading-[1.2] font-semibold">
                            Printer Market Scope
                          </h4>
                          <p className="text-[12px]">
                            Global Printer Market, 2023-2030
                          </p>
                        </div>
                      </div>

                      <div className="scope-table flex gap-4 relative pr-[45] overflow-x-auto">
                        {data?.market_scope?.scopeData.map(
                          (item: any, index: number, arr: any[]) => {
                            // const rawWidth = item.width; // maybe comes from API
                            // const safeWidth = Math.abs(rawWidth); // ensure positive
                            const dynamicWidth = 100 / arr.length;

                            return (
                              <div
                                // className="scope-col w-full lg:w-[13%]"
                                className="scope-col w-full lg:w-auto"
                                style={{ width: `${dynamicWidth}%` }}
                                key={index}
                              >
                                <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                                  {/* Type */}
                                  {item?.scope_name}
                                </h4>
                                {/* {item?.child.map((ele: any, itemKey: number) => {
                                return (
                                  <p
                                    className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]"
                                    key={itemKey}
                                  >
                                    {item?.scope_name}
                                  </p>
                                );
                              })} */}
                                {item?.child && renderItems(item.child)}
                                {/* <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                                Multi Function Printer
                              </p> */}
                                {/* <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                                Standalone Printers
                              </p> */}
                              </div>
                            );
                          }
                        )}
                        {/* <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Type
                          </h4>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Multi Function Printer
                          </p>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Standalone Printers
                          </p>
                        </div> */}
                        {/* <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Technology
                          </h4>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Dot Matrix
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Inkjet
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            LED
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Thermal
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Laser
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            3D
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                        </div>
                        <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Type
                          </h4>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Dot Matrix
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Inkjet
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            LED
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Thermal
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Laser
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            3D
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                        </div>
                        <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Type
                          </h4>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Dot Matrix
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Inkjet
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            LED
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Thermal
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Laser
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            3D
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                        </div>
                        <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Type
                          </h4>
                          <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Dot Matrix
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Inkjet
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            LED
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Thermal
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Laser
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            3D
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                          <p className="bg-white white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Others
                          </p>
                        </div> */}
                        {/* region */}
                        <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Region
                          </h4>
                          {data?.market_scope?.region?.map(
                            (item: any, index: number) => {
                              return (
                                <p
                                  className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]"
                                  key={index}
                                >
                                  {item?.location_name}
                                </p>
                              );
                            }
                          )}
                        </div>
                        {/* country */}
                        <div className="scope-col w-full lg:w-[13%]">
                          <h4 className="bg-[#dee3ff] text-[15px] lg:text-[20px] text-center font-bold px-4 py-3 mb-4">
                            Country
                          </h4>
                          {data?.market_scope?.country?.map(
                            (item: any, index: number) => {
                              return (
                                <p
                                  className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]"
                                  key={index}
                                >
                                  {item?.location_name}
                                </p>
                              );
                            }
                          )}
                          {/* <p className="bg-white text-[15px] px-4 py-4 mb-3 border border-[#F0F1F2]">
                            Dot Matrix
                          </p> */}
                        </div>
                      </div>
                      <div className="side-tool-bar p-2 max-h-fit shadow-[0px_41.78px_33.42px_0px_#6C49AC0D] bg-white absolute right-0 top-[80px]">
                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus-icon lucide-plus text-[var(--primary-color)] mb-[25]"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </Link>

                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-minus-icon lucide-minus text-[#5A5A89] mb-[25]"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </Link>

                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bubbles-icon lucide-bubbles text-[var(--primary-color)] mb-[25]"
                          >
                            <path d="M7.2 14.8a2 2 0 0 1 2 2" />
                            <circle cx="18.5" cy="8.5" r="3.5" />
                            <circle cx="7.5" cy="16.5" r="5.5" />
                            <circle cx="7.5" cy="4.5" r="2.5" />
                          </svg>
                        </Link>

                        <Link href="#">
                          <Image
                            src="/assets/images/download.png"
                            width={20}
                            height={20}
                            className="mb-[25]"
                            alt="download"
                          />
                        </Link>

                        <Link href="#">
                          <Image
                            src="/assets/images/excel.png"
                            width={20}
                            height={20}
                            className="mb-[25]"
                            alt="excel"
                          />
                        </Link>

                        <Link href="#">
                          <Image
                            src="/assets/images/print2.png"
                            width={20}
                            height={20}
                            className="mb-[25]"
                            alt="print"
                          />
                        </Link>

                        <Link href="#">
                          <Image
                            src="/assets/images/check.png"
                            width={20}
                            height={20}
                            className=""
                            alt="checklist"
                          />
                        </Link>
                      </div>

                      <PrinterTabs />
                    </div>
                    {/* -------------Printer Companies-------------- */}
                    <div className="printer-companies">
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-8 bg-white">
                          {/* table */}

                          <KeyPlayerTable data={data?.companyData} />
                        </div>
                        <div className="lg:col-span-4">
                          <div className="heading-wrap p-4 flex items-center">
                            <div className="text-dv ml-3">
                              <h4 className="text-[18px] leading-[1.2] font-semibold">
                                Market Share
                              </h4>
                              <p className="text-[12px] text-[#667085]">
                                Leading Global COmpanies
                              </p>
                            </div>
                          </div>
                          <MarketShareChart />
                        </div>
                      </div>
                    </div>
                    {/* -------------Market Overview--------------- */}
                    <MarketOverview data={data?.market_scope} />
                    {/* -------------Reports and Statistics--------------- */}
                    <ReportsStatistics />
                  </>
                ),

                // =================Report Statistics==================
                "Report Statistics": (
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
                                    <CountryMarketChart />
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
                ),

                // =================Report Store==================
                "Report Store": (
                  <>
                    <div className="rd-list lg:px-[80px] md:px-[25px] px-4 py-[40px] mt-[40px]">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                        <div className="lg:col-span-8 md:col-span-9 bg-white">
                          <div className="flex items-center mb-3">
                            <Image
                              src="/assets/images/mail.png"
                              width={13}
                              height={13}
                              alt="icon"
                            />
                            <span className="ml-2 text-[#05014A]">
                              Email Delivery
                            </span>
                          </div>
                          <p className="text-[17px] leading-[1.5]">
                            Cross border road freight transport involves
                            activities and infrastructure that facilitate the
                            movement of goods across
                          </p>
                          <hr className="w-[70px] text-[var(--primary-color)] border-1 my-2" />
                          <h4 className="md:text-[18px] text-[16px] font-semibold mt-5 lg:mb-[50px] md:mb-[20] mb-5">
                            United States Cross Border Road Freight Transport
                            Market Report and Forecast 2024-2032
                          </h4>
                          <div className="link-wrap flex flex-wrap">
                            <Link
                              href="#"
                              className="flex items-center text-[var(--primary-color)] mr-[40px] mb-2"
                            >
                              Buy Now{" "}
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                className="bg-[var(--primary-color)] text-white text-[10px] p-[6px] ml-4"
                              />
                            </Link>
                            <Link
                              href="#"
                              className="text-[var(--primary-color)] mr-[40px] mb-2"
                            >
                              <FontAwesomeIcon icon={faDownload} /> Download
                              Sample
                            </Link>
                            <Link
                              href="#"
                              className="text-[var(--primary-color)] mb-2"
                            >
                              <FontAwesomeIcon icon={faFileInvoiceDollar} />{" "}
                              Starting Price:{" "}
                              <span className="text-red-600 mr-3">$2199</span>
                              $1799
                            </Link>
                          </div>
                        </div>
                        <div className="lg:col-span-4 md:col-span-3 bg-white md:block hidden">
                          <Image
                            src="/assets/images/rd.png"
                            className="max-w-full lg:ml-auto"
                            width={185}
                            height={240}
                            alt="icon"
                          />
                        </div>
                      </div>
                    </div>

                    {/* -------------Reports and Statistics--------------- */}
                    <ReportsStatistics />
                  </>
                ),

                // =================Table of Content==================
                "Table of Content": (
                  <>
                    {/* -------------Market Overview--------------- */}
                    <MarketOverview data={data?.market_scope} />

                    {/* -------------Reports and Statistics--------------- */}
                    <ReportsStatistics />
                  </>
                ),

                // =================Key Players==================
                "Key Players": (
                  <>
                    <div className="tab-body lg:px-5 py-5">
                      {/* <div className="heading mb-4 flex flex-wrap justify-between">
                        <div className="heading-wrap flex items-center md:mb-0 mb-3">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="icon"
                          />
                          <div className="text-dv ml-3">
                            <h4 className="text-[18px] leading-[1.2] font-semibold">
                              Printer Companies
                            </h4>
                            <p className="text-[12px] text-[#667085]">
                              Massa nulla commodo nulla a
                            </p>
                          </div>
                        </div>
                        <div className="lg:col-span-12 flex lg:justify-end items-center">
                          <form className="max-w-md mx-auto">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                              Search
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FontAwesomeIcon
                                  icon={faCalendarDays}
                                  className="text-[#858D9D]"
                                />
                              </div>
                              <input
                                type="search"
                                className="block w-full p-2 ps-10 text-sm text-gray-900  border border-[#e0e2e7] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:outline-0 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Companies"
                                required
                              />
                            </div>
                          </form>
                          <Image
                            src="/assets/images/download.png"
                            width={20}
                            height={20}
                            className="mx-2"
                            alt="download"
                          />
                          <Image
                            src="/assets/images/excel.png"
                            width={20}
                            height={20}
                            className="mx-2"
                            alt="excel"
                          />
                          <Image
                            src="/assets/images/print.png"
                            width={20}
                            height={20}
                            className="mx-2"
                            alt="print"
                          />
                          <Image
                            src="/assets/images/check.png"
                            width={20}
                            height={20}
                            className="mx-2"
                            alt="check"
                          />
                        </div>
                      </div>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right">
                          <thead className="text-[14px] text-[#4A4C56] font-medium bg-white">
                            <tr>
                              <td scope="col" className="px-5 py-3">
                                Company
                              </td>
                              <td scope="col" className="px-5 py-3">
                                Revenue In 2024
                              </td>
                              <td scope="col" className="px-5 py-3">
                                Employees
                              </td>
                              <td scope="col" className="px-5 py-3">
                                Headquarters
                              </td>
                              <td scope="col" className="px-5 py-3">
                                Website
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                            <tr className="bg-white">
                              <td
                                scope="row"
                                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="heading-wrap flex items-center">
                                  <Image
                                    src="/assets/images/comp1.png"
                                    width={40}
                                    height={40}
                                    alt="icon"
                                  />
                                  <div className="text-dv ml-3">
                                    <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                                      Brother Industries Ltd
                                    </h4>
                                    <p className="text-[12px] text-[#667085]">
                                      Fortune 500 Company
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">$5.74 Billion</td>
                              <td className="px-5 py-4">44,925</td>
                              <td className="px-5 py-4">Japan</td>
                              <td className="px-5 py-4">www.brother.com</td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
                      <KeyPlayerTable data={data?.companyData} />
                      {/* -------------Reports and Statistics--------------- */}
                      <ReportsStatistics />
                    </div>
                  </>
                ),

                // ===================================
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default market_overview;
