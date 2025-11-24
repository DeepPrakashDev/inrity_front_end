import React from "react";
import { Chart } from "react-google-charts";

type marketTrends = {
  year: string ;
  value: number;
};
const MarketTrendChart: React.FC<{ data: marketTrends[] }> = ({ data }) => {
  const chartData = [
    ["Year", "Sales"], // header row
    ...data.map((d) => [(d?.year).toString(), d.value]),
  ];

  const options = {
    bar: { groupWidth: "20%" },
    legend: { position: "bottom" },
    chartArea: {
      left: 40,
      right: 10,
      width: "85%",
      height: "75%",
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
        data={chartData ? chartData :[["Year", "Value"], [2018, 2000]]}
        options={options}
        width="100%"
        height="350px"
      />
    </>
  );
};

export default MarketTrendChart;
