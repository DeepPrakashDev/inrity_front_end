import React from 'react';
import { Chart } from "react-google-charts";

const CountryMarketChart = () => {
    const data = [
        ["Year", "Sales"],
        ["India", 1300],
        ["India", 1200],
        ["India", 1100],
        ["India", 1000],
        ["India", 900],
        ["India", 800],
        ["India", 700],
        ["India", 600],
        ["India", 500],
        ["India", 400],
        ["India", 300],
    ];

    const options = {
        legend: { position: "bottom" },
        bar: { groupWidth: "30%" },
        chartArea: {
            left: 80,
            top: 30,
            right: 20,
            bottom: 50,
            width: "100%",
            height: "75%",
        },
        hAxis: {
            minValue: 0,
            textStyle: { fontSize: 12 },
        },
        vAxis: {
            textStyle: { fontSize: 12 },
        },
    };
    return (
        <>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </>
    )
}

export default CountryMarketChart