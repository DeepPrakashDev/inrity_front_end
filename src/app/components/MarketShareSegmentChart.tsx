import React from 'react'
import { Chart } from "react-google-charts";

const MarketShareSegmentChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Sector 1", 9],
        ["Sector 2", 8],
        ["Sector 3", 5],
        ["Sector 4", 3],
    ];

    const options = {
        pieHole: 0.6,
        colors: ['#9400bd', '#91d7ff', '#ef6370', '#f9cc1f'],
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
                    height="450px"
                    data={data}
                    options={options}
                />

                <div className="absolute inset-0 left-[-24%] flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-[14px] text-[#858D9D]">Market Share By</p>
                        <p className="text-[14px] text-gray-800 font-semibold">Segment 5</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketShareSegmentChart