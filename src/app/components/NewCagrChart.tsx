import { ResponsiveLine } from "@nivo/line";

type CagrItem = {
  year: number | string;
  markety_price: number | string;
};

type SeriesItem = {
  id: string;
  data: { x: string; y: number }[];
};

type Props = {
  data?: CagrItem[];
};

const RdCagrChart = ({ data = [] }: Props) => {
  const formattedData: SeriesItem[] = [
    {
      id: "Market Value",
      data: data.map((item) => ({
        x: item.year.toString(),
        y: Number(item.markety_price),
      })),
    },
  ];

  return (
    <>
      <ResponsiveLine /* or Line for fixed dimensions */
        data={formattedData}
        margin={{ top: 0, right: 10, bottom: 10, left: 0 }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        // axisBottom={{ legend: 'transportation', legendOffset: 36 }}
        axisBottom={null}
        // axisLeft={{ legend: 'count', legendOffset: -40 }}
        axisLeft={null}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        areaOpacity={0.3}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         translateX: 100,
        //         itemWidth: 80,
        //         itemHeight: 22,
        //         symbolShape: 'circle'
        //     }
        // ]}
      />
    </>
  );
};

export default RdCagrChart;
