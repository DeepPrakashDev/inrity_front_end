"use client"
import React from 'react'
import Image from "next/image";
import Link from "next/link";

const ReportTypes = () => {
    return (
        <section className="report-types bg-[var(--primary-color)]">
            <div className="container mx-auto">
                <ul className="flex flex-wrap xl:justify-between lg:justify-evenly md:justify-evenly text-white font-medium text-md">
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Sectors
                        </Link>
                    </li>
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Market Reports
                        </Link>
                    </li>
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Pre Feasibility Reports
                        </Link>
                    </li>
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Price Forecasting Reports
                        </Link>
                    </li>
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Procurement Intelligence Reports
                        </Link>
                    </li>
                    <li className="text-center flex justify-center grow-1 py-3">
                        <Link rel="stylesheet" href="#" className="flex items-center text-[15px]">
                            <Image src="/assets/images/tile_small.svg" className="mr-1 mx-auto" width={20} height={40} alt="logo" />
                            Favorites
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default ReportTypes