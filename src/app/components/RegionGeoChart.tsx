import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
];

const options = {
    colorAxis: { colors: ['#2000a0', '#7b8ffe',] },
    datalessRegionColor: '#afbbfd',
    defaultColor: '#f5f5f5',
};

const RegionGeoChart = () => {
    return (
        <>
            <Chart
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
                chartEvents={[
                    {
                        eventName: 'select',
                        callback: ({ chartWrapper }) => {
                            if (!chartWrapper) return;

                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection?.();

                            if (selection?.length > 0) {
                                const selectedRowIndex = selection[0].row;
                                const country = data[selectedRowIndex + 1][0]; // +1 because data[0] is header
                                console.log('Selected Country:', country);
                            }
                        },
                    },
                ]}
            />
        </>
    );
}

export default RegionGeoChart