"use client";
import React from 'react'
import { Chart } from "react-google-charts";


const CagrChart = () => {

    const data = [
        ["Year", "Sales"],
        ["2013", 1000],
        ["2014", 1170],
        ["2015", 660],
        ["2016", 1030],
    ];

    const options = {
        // title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "70%", height: "70%" },
        colors: ['#0077b6'],
    };


    return (
        <>
            <Chart
                chartType="AreaChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
        </>
    )

}

export default CagrChart