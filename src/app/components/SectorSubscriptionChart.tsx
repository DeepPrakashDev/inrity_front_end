import React from 'react'
import { Chart } from "react-google-charts";

const SectorSubscriptionChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Sector 1", 8],
        ["Sector 2", 4],
        ["Sector 3", 4],
        ["Sector 4", 4],
        ["Sector 5", 7],
        ["Sector 6", 4],
    ];

    const options = {
        pieHole: 0.7,
        colors: ['#37b5ef', '#9400bd', '#ff7f3a', '#f91e4a', '#ec7490', '#3dc269'],
        is3D: false,
        legend: {
            // position: "bottom",
        }
    };

    return (
        <>
            <div className="relative w-full mx-auto">
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="300px"
                    data={data}
                    options={options}
                />

                <div className="absolute inset-0 left-[-24%] flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-[15px] font-semibold text-gray-800">5/15</p>
                        <p className="text-[14px] text-[#858D9D]">Sectors</p>
                    </div>
                </div>
            </div>

            <div className="">
                <p className="">Gravida ullamcorper orci in bibendum nisl mauris pharetra fringilla. Donec malesuada fermentum massa nunc congue.</p>
            </div>
        </>
    )
}

export default SectorSubscriptionChart