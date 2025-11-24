import React from 'react'
import { Chart } from "react-google-charts";

const RegionalAnalysisCHart = () => {
    const data = [
        ["Year", "Sales"],
        ["2018", 40000],
        ["2019", 40000],
        ["2020", 40000],
        ["2021", 40000],
        ["2022", 40000],
        ["2023", 40000],
        ["2024", 40000],
        ["2025", 40000],
        ["2026", 40000],
        ["2027", 40000],
        ["2028", 40000],
        ["2029", 40000],
        ["2030", 40000],
        ["2031", 40000],
        ["2032", 40000],
        ["2033", 40000],
        ["2034", 40000],
    ];

    // Material chart options
    const options = {
        bar: { groupWidth: "15%" },
        legend: { position: "bottom" },
        chartArea: {
            left: 70,
            right: 20,
            top: 20,
            width: "85%",
            height: "75%"
        },
        hAxis: {
            showTextEvery: 1,
            textStyle: {
                fontSize: 12,
            },
        },
        vAxis: {
            minValue: 0,
        },

    };
    return (
        <>
            <Chart
                // chartType="Bar"
                chartType="ColumnChart"
                data={data}
                options={options}
                width="100%"
                height="350px"
            />
        </>
    )
}

export default RegionalAnalysisCHart