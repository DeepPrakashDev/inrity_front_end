import React from 'react'
import { Chart } from "react-google-charts";

const ReportsSubscribedChart = () => {
    const data = [
        ["Year", "Sales"],
        ["2013", 1000],
        ["2014", 1170],
        ["2015", 660],
        ["2016", 1030],
    ];

    const options = {
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "80%", height: "90%" },
        height: 280,
        colors: ['#F91E4A'],

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

export default ReportsSubscribedChart