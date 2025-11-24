import React from 'react'
import { Chart } from "react-google-charts";

const MyActivityChart = () => {

    const data = [
        ["Year", "Activity", "View"],
        ["Jan", 1000, 200],
        ["Feb", 1170, 570],
        ["Mar", 660, 1060],
        ["Apr", 1200, 985],
        ["May", 700, 600],
        ["Jun", 1090, 850],
        ["Jul", 1190, 550],
        ["Aug", 1000, 800],
        ["Sep", 987, 1100],
        ["Oct", 830, 680],
        ["Nov", 1095, 790],
        ["Dec", 1010, 778],
    ];

    const options = {
        colors: ['#0029FF', '#2000A0'],

        bar: { groupWidth: "30%" },
        legend: { position: "bottom" },
        chartArea: {
            left: 40,
            right: 10,
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
                chartType="ColumnChart"
                data={data}
                options={options}
                width="100%"
                height="300px"
            />
        </>
    )
}

export default MyActivityChart