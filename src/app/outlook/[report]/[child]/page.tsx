"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NewMarketTrendChart, { YearValueData } from "../../../components/NewMarketTrendChart";
import { getMarketValueByYear, replaceShortCodes } from "@/utils/handleShortcode";
import PrinterTabs from "@/app/components/PrinterTabs";
import KeyPlayerTable from "@/app/components/KeyPlayerTable";
import MarketShareChart from "@/app/components/MarketShareChart";
import MarketOverview from "@/app/components/MarketOverview";
import ReportsStatistics from "@/app/components/ReportsStatistics";
import { useReport } from "../ReportContext";
import TabSection from "@/app/components/TabSection";
import api from "@/lib/apiClient";

export default function Overview() {
  const { reportId, short_codes, market_values, basic_trend_data } = useReport();
  const [chartData, setChartData] = useState<YearValueData[]>([]);
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

  const fetchData = async (): Promise<void> => {
    try {
      const res = await api.post("report/details", {
        report_id: reportId,
        other_info: short_codes
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

  useEffect(() => {
    if (reportId) {
      fetchData();
      console.log('+++++++++++++++++++++++++++++' + reportId);
      //fetchRegionalReportData();
      //fetchCountryReportData(); // ✅ call when pizza, ice cream chocolate, momos steam veg, kitkat, pepsi, reportId is available
      //fetchTocData();
    }
  }, [reportId]);

  return (
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
                                : replaceShortCodes(element?.market_highlight ?? "", (short_codes ?? {}) as any),
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
                            __html: replaceShortCodes(trend?.industry_trends ?? "", (short_codes ?? {}) as any),
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
                    tabs={[
                      { key: "historical-tab", label: "Historical" } as string | any,
                      { key: "base-year-tab", label: "Base Year" } as string | any,
                      { key: "forecast-tab", label: "Forecast" } as string | any
                    ]}
                    navClassName="bg-white p-2 border-0"
                    className="px-5"
                    activeClass="active-tab-btn bg-[#dee3ff]"
                    inactiveClass="text-[#667085] bg-white"
                    tabContent={{
                      Historical: (
                        <>
                          <div className="tab-body px-2 py-5">
                            <ul className="flex bg-[#dee3ff]">
                              {Array.isArray(market_values) && market_values.filter((item) => item.year <= Number(short_codes?.base_year ?? 0)).map((item) => (
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
                              {Array.isArray(market_values) &&
                                market_values
                                  .filter(
                                    (item) =>
                                      item.year >= Number(short_codes?.base_year ?? 0) - 2 &&
                                      item.year <= Number(short_codes?.base_year ?? 0) + 3
                                  )
                                  .map((item) => (
                                    <li
                                      key={item.year}
                                      className={`grow-1 text-[12px] text-center p-1 ${item.year === Number(short_codes?.base_year ?? 0)
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
                              {Array.isArray(market_values) && market_values.filter((item) => item.year > Number(short_codes?.base_year)).map((item) => (
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
                        {short_codes?.historical_period_end} Market Value
                      </p>
                      <h4 className="text-[20px] font-semibold">
                        {basic_trend_data?.historical_end_revenue}{" "}
                      </h4>
                      <p className="text-[#667085] text-[11px]">
                        {basic_trend_data?.historical_end_currency} {basic_trend_data?.historical_end_unit}
                      </p>
                    </div>
                    <div className="grow-1 text-center">
                      <p className="text-[#667085] text-[11px]">
                        {short_codes?.historical_period_end} Market Value
                      </p>
                      <h4 className="text-[20px] font-semibold">
                        {basic_trend_data?.forecast_end_revenue}{" "}
                      </h4>
                      <p className="text-[#667085] text-[11px]">
                        {basic_trend_data?.forecast_end_currency} {basic_trend_data?.forecast_end_unit}
                      </p>
                    </div>
                    <div className="grow-1 text-center">
                      <p className="text-[#667085] text-[11px]">
                        {short_codes?.historical_period_end} to {short_codes?.forecast_period_end}
                      </p>
                      <h4 className="text-[20px] font-semibold">
                        {short_codes?.forecast_cagr}%{" "}
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
  );
}