import React from 'react'
import { Chart } from "react-google-charts";

const ReportChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 35],
        ["Commute", 30],
        ["Eat", 35],
    ];

    const options = {
        pieHole: 0.7,
        is3D: false,
        colors: ['#883DCF', '#E9FAF7', '#0029FF'],
        legend: {
            position: "bottom",
        }
    };

    return (
        <>
            {/* <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            /> */}

            <div className="relative w-full max-w-md mx-auto">
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                {/* ⬇️ Text overlay in center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-[25px] font-semibold text-gray-800">23,750</p>
                        <p className="text-[14px] text-[#1a9882]">10% <span className="text-[#858D9D]">+150 today</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportChart