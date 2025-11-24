"use client"
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyActivityChart from "../components/MyActivityChart";
import ReportChart from "../components/ReportChart";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function after_login() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>

            {/* -------------Industry Updates--------------- */}

            <section className="industry-update mt-[50px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-2 justify-between gap-2">
                        <div className="latest-update-card w-full md:w-90 lg:w-[30%] p-4 lg:mb-0 md:mb-3 mb-3 md:mx-2 border border-[#e0e2e7] rounded-lg text-white">
                            <h4 className="text-[18px] font-semibold mb-3">Industry Updates</h4>
                            <p className="text-[14px] mb-5">
                                Short brief Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim..
                            </p>
                            <Link href="#" className="flex items-center text-white text-[14px] mb-2">
                                <span>Read more</span><FontAwesomeIcon icon={faAngleRight} className="w-2 ml-3" />
                            </Link>
                        </div>
                        <div className="latest-update-card lg:w-[22%] p-4 lg:mb-0 md:mb-3 mb-3 border border-[#e0e2e7] rounded-lg">
                            <h4 className="text-[18px] font-semibold mb-2">ESG Weekly Updates</h4>
                            <p className="text-[14px] mb-[25]">
                                Short brief Lorem ipsum dolor sit amet, consecte.
                            </p>
                            <Link href="#" className="flex items-center text-[rgba(50,80,255,1)] text-[14px]">
                                <span>Read more</span><FontAwesomeIcon icon={faAngleRight} className="w-2 ml-3" />
                            </Link>
                        </div>
                        <div className="latest-update-card lg:w-[22%] p-4 lg:mb-0 md:mb-3 mb-3 border border-[#e0e2e7] rounded-lg">
                            <h4 className="text-[18px] font-semibold mb-2">Commodity Compass</h4>
                            <p className="text-[14px] mb-[25]">
                                Short brief Lorem ipsum dolor sit amet, consecte.
                            </p>
                            <Link href="#" className="flex items-center text-[rgba(50,80,255,1)] text-[14px]">
                                <span>Read more</span><FontAwesomeIcon icon={faAngleRight} className="w-2 ml-3" />
                            </Link>
                        </div>
                        <div className="latest-update-card lg:w-[22%] p-4 lg:mb-0 md:mb-3 mb-3 border border-[#e0e2e7] rounded-lg">
                            <h4 className="text-[18px] font-semibold mb-2">Insights and Updates</h4>
                            <p className="text-[14px] mb-[25]">
                                Short brief Lorem ipsum dolor sit amet, consecte.
                            </p>
                            <Link href="#" className="flex items-center text-[rgba(50,80,255,1)] text-[14px]">
                                <span>Read more</span><FontAwesomeIcon icon={faAngleRight} className="w-2 ml-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* -------------Indices--------------- */}

            <section className="indices mt-[50px]">
                <div className="container mx-auto">
                    <ul className="horizontal-overflow flex overflow-x-auto border border-[#e0e2e7] rounded-lg">
                        <li className="sticky left-0 p-4 bg-white shrink-0">
                            <h4 className="font-semibold">INDICES</h4>
                            <p className="underline text-[11px]">Disclaimer</p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">GDP</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">Inflation Rate</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">WPI</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">GDP</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">Inflation Rate</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">WPI</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">GDP</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">Inflation Rate</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">WPI</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">GDP</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">Inflation Rate</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">WPI</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">GDP</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">Inflation Rate</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                        <li className="w-auto shrink-0 p-4">
                            <h4 className="font-semibold text-center text-[15px] text-[rgba(102,112,133,1)]">WPI</h4>
                            <p className="flex text-[13px] text-[rgba(102,112,133,1)]">1500 <span className="text-[#1a9882] ml-2">10%</span><FontAwesomeIcon icon={faCaretUp} className="w-2 ml-2 text-[#1a9882]" /></p>
                        </li>
                    </ul>
                </div>
            </section>

            {/* -------------Trending Now--------------- */}

            <section className="trending-now mt-[50px]">
                <div className="container mx-auto">
                    <div className="content-wrap p-[30px] pb-[50px]">
                        <div className="heading mb-3">
                            <h3 className="text-[20px] font-semibold">Trending Now</h3>
                        </div>
                        <div className="grid lg:grid-flow-col md:grid-flow-row Lg:grid-cols-5 gap-2">
                            <div className="trending-now-card col-span-1 p-5 border-l-4 border-l-[#dde0f1]">
                                <h4 className="text-[rgba(0,41,255,1)] text-[30px] font-semibold">1</h4>
                                <p className="text-[13px]">
                                    Europe stocks close at record high erasing losses from U.S.-China trade war volatility; Bank of...
                                </p>
                            </div>
                            <div className="trending-now-card col-span-1 p-5 border-l-4 border-l-[#dde0f1]">
                                <h4 className="text-[rgba(0,41,255,1)] text-[30px] font-semibold">2</h4>
                                <p className="text-[13px]">
                                    European markets rise as earnings stay in focus; Santander up 8.2%
                                </p>
                            </div>
                            <div className="trending-now-card col-span-1 p-5 border-l-4 border-l-[#dde0f1]">
                                <h4 className="text-[rgba(0,41,255,1)] text-[30px] font-semibold">3</h4>
                                <p className="text-[13px]">
                                    Asia-Pacific markets mostly rise after Wall Street looks past U.S.-China trade spat to rise...
                                </p>
                            </div>
                            <div className="trending-now-card col-span-1 p-5 border-l-4 border-l-[#dde0f1]">
                                <h4 className="text-[rgba(0,41,255,1)] text-[30px] font-semibold">4</h4>
                                <p className="text-[13px]">
                                    European markets rise as earnings stay in focus; Santander up 8.2%
                                </p>
                            </div>
                            <div className="trending-now-card col-span-1 p-5 border-l-4 border-l-[#dde0f1]">
                                <h4 className="text-[rgba(0,41,255,1)] text-[30px] font-semibold">5</h4>
                                <p className="text-[13px]">
                                    Asia-Pacific markets mostly rise after Wall Street looks past U.S.-China trade spat to rise...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -------------Your Subscriptions--------------- */}

            <section className="subscription-main mt-[50px]">
                <div className="container mx-auto">
                    <div className="heading mb-5">
                        <h3 className="text-[20px] font-semibold">Your Subscriptions</h3>
                    </div>
                    <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-12 gap-6">
                        <div className="md:col-span-7 col-span-12 flex flex-wrap justify-between p-4 border border-[#e0e2e7] rounded-lg">
                            <div className="w-50 lg:flex-1">
                                <h4 className="subtitle text-[var(--primary-color)] text-[15px] font-semibold lg:mb-[50] mb-5">Report Type Subscription Summary</h4>
                                <h3 className="xl:text-[70px] text-[40px] font-medium">5/8</h3>
                            </div>
                            <div className="subscription-list lg:flex-1">
                                <ul className="pl-4 ">
                                    <li className="text-[13px]/8 relative before:content-['✔'] before:absolute before:-left-4 before:text-green-500">Market Reports</li>
                                    <li className="text-[13px]/8 relative before:content-['✔'] before:absolute before:-left-4 before:text-green-500">Prefeasibility Reports</li>
                                    <li className="text-[13px]/8 relative before:content-['✔'] before:absolute before:-left-4 before:text-green-500">Pipeline Insights Reports</li>
                                    <li className="text-[13px]/8 relative before:content-['X'] before:absolute before:-left-4 before:text-red-500">Epidemiology Reports</li>
                                </ul>
                            </div>
                            <div className="subscription-list lg:flex-1">
                                <ul className="pl-4 text-[13px]">
                                    <li className="text-[13px]/8 relative before:content-['✔'] before:absolute before:-left-4 before:text-green-500">Healthcare Reports</li>
                                    <li className="text-[13px]/8 relative before:content-['✔'] before:absolute before:-left-4 before:text-green-500">Patent Analysis Reports</li>
                                    <li className="text-[13px]/8 relative before:content-['X'] before:absolute before:-left-4 before:text-red-500">Industry Supply-Demand</li>
                                    <li className="text-[13px]/8 relative before:content-['X'] before:absolute before:-left-4 before:text-red-500">Procurement Intelligence Reports</li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:col-span-5 col-span-12 p-4 border border-[#e0e2e7] rounded-lg">
                            <h4 className="subtitle text-[#0029FF] text-[15px] font-semibold">Reports Subscribed</h4>
                            <h3 className="xl:text-[70px] text-[40px] font-medium mb-[20]">100/2000</h3>
                            <Link href="#" className="view-report-btn inline-flex items-center bg-[#000088] text-white text-[14px] p-2 rounded-sm">
                                View All Reports <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* -------------Recent Reports--------------- */}

            <section className="recent-reports mt-[50px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-6 border border-[#e0e2e7] rounded-lg">
                            <div className="heading p-4">
                                <h3 className="text-[20px] font-semibold">Recent Reports</h3>
                                <p className="text-[#777980] text-[14px] font-semibold">Explore our report store</p>
                            </div>
                            <div className="recent-report-list">
                                <ul className="vertical-overflow overflow-y-scroll px-4 h-[400px] mb-4">
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                            <div className="flex">
                                                <div className="img-dv">
                                                    <Image src="/assets/images/bagde.png" width={40} height={40} alt="logo" />
                                                </div>
                                                <div className="text-dv ml-2">
                                                    <h4 className="text-[15px]">Global XYZ Market</h4>
                                                    <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around items-start">
                                                <p className="text-[13px] mr-2">$17,678</p>
                                                <p className="bg-[#e9faf7] text-[12px] text-[#1a9882] px-[5px] rounded-sm">+12%</p>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                                <div className="flex">
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 border border-[#e0e2e7] rounded-lg">
                            <div className="heading p-4">
                                <h3 className="text-[20px] font-semibold">Reports</h3>
                                <p className="text-[#777980] text-[14px] font-semibold">Based on Categories</p>
                            </div>
                            <ReportChart />
                        </div>
                    </div>
                </div>
            </section>

            {/* -------------My Activity--------------- */}

            <section className="my-activity-sec mt-[50px] mb-[50px]">
                <div className="container mx-auto">
                    <div className="grid lg:grid-flow-col md:grid-flow-row grid-cols-12 gap-6">
                        <div className="lg:col-span-7 col-span-12 bg-white border border-[#e0e2e7] rounded-lg p-4">
                            <div className="heading mb-3">
                                <h3 className="text-[20px] font-semibold">My Activity</h3>
                                <p className="text-[#667085] text-[14px] font-semibold">Last Viewed Reports</p>
                            </div>
                            <MyActivityChart />
                        </div>
                        <div className="lg:col-span-5 col-span-12 bg-white border border-[#e0e2e7] rounded-lg">
                            <div className="heading p-4">
                                <h3 className="text-[20px] font-semibold">My Space</h3>
                                <p className="text-[#667085] text-[14px] font-semibold">Last Viewed Reports</p>
                            </div>
                            <ul className="vertical-overflow overflow-y-scroll px-4 h-[280px] mb-4">
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link rel="stylesheet" href="#" className="flex justify-between items-center">
                                        <div className="text-dv ml-2">
                                            <h4 className="text-[15px]">Global XYZ Market</h4>
                                            <p className="text-[13px] text-[#667085]">Reading Time : <span>2 Mins</span></p>
                                        </div>
                                        <div className="flex justify-around items-start">
                                            <p className="text-[13px] mr-2">$17,678</p>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* -------------Our Clients--------------- */}

            <section className="our-clients mb-[50]">
                <div className="container mx-auto">
                    <Slider {...settings}>
                        <div className="slider-content !w-auto m-5 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.25)]">
                            <Image src="/assets/images/client3.png" height={200} width={200} className="w-100 mb-2" alt="client" />
                            <p className="p-5 text-[14px] italic ">
                                Arcu vel sit at porta. Enim nulla non sagittis viverra hendrerit. Ut mi tristique fusce sit et egestas. Leo massa sed commodo at augue at consectetur adipiscing. Bibendum turpis lorem sed ac.
                            </p>
                            <div className="company-info-dv px-5 mb-5">
                                <p className="company-name text-right text-[#2000a0] font-semibold">KPMG</p>
                                <p className="text-right text-[12px]">Netherland</p>
                            </div>
                        </div>
                        <div className="slider-content !w-auto m-5 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.25)]">
                            <Image src="/assets/images/client1.png" height={200} width={200} className="w-100 mb-2" alt="client" />
                            <p className="p-5 text-[14px] italic ">
                                Arcu vel sit at porta. Enim nulla non sagittis viverra hendrerit. Ut mi tristique fusce sit et egestas. Leo massa sed commodo at augue at consectetur adipiscing. Bibendum turpis lorem sed ac.
                            </p>
                            <div className="company-info-dv px-5 mb-5">
                                <p className="company-name text-right text-[#2000a0] font-semibold">Unilever</p>
                                <p className="text-right text-[12px]">India</p>
                            </div>
                        </div>
                        <div className="slider-content !w-auto m-5 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.25)]">
                            <Image src="/assets/images/client2.png" height={200} width={200} className="w-100 mb-2" alt="client" />
                            <p className="p-5 text-[14px] italic ">
                                Arcu vel sit at porta. Enim nulla non sagittis viverra hendrerit. Ut mi tristique fusce sit et egestas. Leo massa sed commodo at augue at consectetur adipiscing. Bibendum turpis lorem sed ac.
                            </p>
                            <div className="company-info-dv px-5 mb-5">
                                <p className="company-name text-right text-[#2000a0] font-semibold">TATA</p>
                                <p className="text-right text-[12px]">India</p>
                            </div>
                        </div>
                        <div className="slider-content !w-auto m-5 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.25)]">
                            <Image src="/assets/images/client1.png" height={200} width={200} className="w-100 mb-2" alt="client" />
                            <p className="p-5 text-[14px] italic ">
                                Arcu vel sit at porta. Enim nulla non sagittis viverra hendrerit. Ut mi tristique fusce sit et egestas. Leo massa sed commodo at augue at consectetur adipiscing. Bibendum turpis lorem sed ac.
                            </p>
                            <div className="company-info-dv px-5 mb-5">
                                <p className="company-name text-right text-[#2000a0] font-semibold">Unilever</p>
                                <p className="text-right text-[12px]">India</p>
                            </div>
                        </div>
                        <div className="slider-content !w-auto m-5 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.25)]">
                            <Image src="/assets/images/client2.png" height={200} width={200} className="w-100 mb-2" alt="client" />
                            <p className="p-5 text-[14px] italic ">
                                Arcu vel sit at porta. Enim nulla non sagittis viverra hendrerit. Ut mi tristique fusce sit et egestas. Leo massa sed commodo at augue at consectetur adipiscing. Bibendum turpis lorem sed ac.
                            </p>
                            <div className="company-info-dv px-5 mb-5">
                                <p className="company-name text-right text-[#2000a0] font-semibold">TATA</p>
                                <p className="text-right text-[12px]">India</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>

            {/* What our client s say about us */}

        </>
    );
}
