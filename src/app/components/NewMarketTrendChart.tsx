"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export interface YearValueData {
    year: number | string;
    value: number;
}

interface NivoBarChartProps {
    data: YearValueData[];
    axisBottomLegend?: string;
    axisLeftLegend?: string;
    colorScheme?: string; // e.g. "nivo", "set2", "category10"
    height?: number;
}

/**
 * Reusable Bar Chart for year-value data
 * Usage: <NivoBarChart data={data} />
 */
const NivoBarChart: React.FC<NivoBarChartProps> = ({
    data,
    axisBottomLegend = "Year",
    axisLeftLegend = "Value",
    colorScheme = "nivo",
    height = 400,
}) => {
    // Transform the simple {year, value} format into Nivo's expected structure
    const formattedData = data.map((item) => ({
        year: String(item.year),
        value: item.value,
    }));

    return (
        <div style={{ height }}>
            <ResponsiveBar
                data={formattedData}
                keys={["value"]}
                indexBy="year"
                margin={{ top: 40, right: 50, bottom: 50, left: 70 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: axisBottomLegend,
                    legendPosition: "middle",
                    legendOffset: 36,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: axisLeftLegend,
                    legendPosition: "middle",
                    legendOffset: -50,
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                role="application"
                ariaLabel="Yearly Value Bar Chart"
            />
        </div>
    );
};

export default NivoBarChart;
