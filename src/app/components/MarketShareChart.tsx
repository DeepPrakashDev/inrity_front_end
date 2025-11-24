"use client";
import React from 'react'
import { Chart } from "react-google-charts";

const MarketShareChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Brother Industries Ltd", 41],
        ["Roland DG Corp", 25],
        ["Ricoh Co Ltd", 17],
        ["Xerox Holdings Corp", 17],
    ];

    const options = {
        // title: "My Daily Activities",
        colors: ['#0077b6', '#023e8a', '#03045e', '#0096c7'],
        legend: {
            position: "bottom", 
            alignment: "center",
        }
    };

    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </>
    )
}

export default MarketShareChart





