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

export default function ReportStore() {
    const { reportId } = useReport();

    return (
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
            <ReportsStatistics />
        </>
    );
}