// import React from "react";
// import TabSection from "../components/TabSection";

// const PrinterTabs = () => {
//   return (
//     <>
//       <TabSection
//         navClassName="mb-4"
//         tabs={[
//           "Type",
//           "Technology",
//           "Connectivity",
//           "Output",
//           "End User",
//           "Regions",
//           "Countries",
//         ]}
//         className=""
//         activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 px-5 py-[5px]"
//         inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px]"
//         tabContentClass="pl-4 mb-[40]"
//         tabContent={{
//           Type: (
//             <>
//               <div className="flex flex-wrap relative lg:h-[400]">
//                 <div className="pink-circle bg-[#f9707c] w-[180] h-[180] rounded-[50%] flex justify-center items-center lg:absolute top-[40%] left-[12%] z-1">
//                   <h4 className="text-white font-semibold">
//                     Standalone Printers
//                   </h4>
//                 </div>
//                 <div className="blue-circle bg-[#675bf8] w-[320] h-[320] rounded-[50%] flex justify-center items-center lg:absolute top-[5%] left-[23%]">
//                   <div className="text-center text-white font-semibold">
//                     <h4 className="">Multi-Functional Printers</h4>
//                     <p className="">Largest Segment</p>
//                   </div>
//                 </div>
//                 <div className="yellow-circle bg-[#e2ad2d] w-[110] h-[110] rounded-[50%] flex justify-center items-center lg:absolute top-[70%] left-[22%]"></div>
//                 <div className="light-yellow-circle bg-[#f3e033] w-[180] h-[180] rounded-[50%] flex justify-center items-center lg:absolute top-[45%] right-[20%]"></div>
//                 <div className="light-yellow-circle bg-[#675bf8] w-[90] h-[90] rounded-[50%] flex justify-center items-center lg:absolute top-[34%] right-[18%]"></div>
//                 <div className="light-yellow-circle bg-[#f56d7c] w-[100] h-[100] rounded-[50%] flex justify-center items-center lg:absolute top-[64%] right-[13%]"></div>
//               </div>
//             </>
//           ),
//           Technology: (
//             <>
//               <div className="flex flex-wrap relative lg:h-[400]">
//                 <div className="pink-circle bg-[#f9707c] w-[200] h-[200] rounded-[50%] flex justify-center items-center lg:absolute top-[40%] left-[13%] z-1">
//                   <h4 className="text-white font-semibold">Dot Matrix</h4>
//                 </div>
//                 <div className="light-yellow-circle bg-[#f3e033] w-[200] h-[200] rounded-[50%] flex justify-center items-center lg:absolute top-[5%] left-[24%]">
//                   <h4 className="text-center text-white font-semibold">
//                     Inkjet
//                   </h4>
//                 </div>
//                 <div className="pink-circle bg-[#f56d7c] w-[100] h-[100] rounded-[50%] flex justify-center items-center lg:absolute top-[54%] left-[33%]">
//                   <h4 className="text-center text-white font-semibold">LED</h4>
//                 </div>
//                 <div className="light-yellow-circle bg-[#f3e033] w-[120] h-[120] rounded-[50%] flex justify-center items-center lg:absolute top-[42%] right-[42%]">
//                   <h4 className="text-center text-white font-semibold">
//                     Laser
//                   </h4>
//                 </div>
//                 <div className="blue-circle bg-[#675bf8] w-[90] h-[90] rounded-[50%] flex justify-center items-center lg:absolute top-[10%] right-[34%]">
//                   <h4 className="text-center text-white font-semibold">3D</h4>
//                 </div>

//                 <div className="blue-circle bg-[#675bf8] w-[320] h-[320] rounded-[50%] flex justify-center items-center lg:absolute top-[17%] right-[10%]">
//                   <h4 className="text-center text-white font-semibold">
//                     Thermal
//                   </h4>
//                 </div>
//               </div>
//             </>
//           ),
//         }}
//       />
//     </>
//   );
// };

// export default PrinterTabs;



import React from "react";
import TabSection from "../components/TabSection";

type Circle = {
  text?: string;
  subText?: string;
  size: number;
  color: string;
  position: string;
};

const PrinterTabs = () => {
  const circles: Record<string, Circle[]> = {
    Type: [
      {
        text: "Standalone Printers",
        subText: "",
        size: 180,
        color: "#f9707c",
        position: "lg:absolute top-[40%] left-[12%] z-1",
      },
      {
        text: "Multi-Functional Printers",
        subText: "Largest Segment",
        size: 320,
        color: "#675bf8",
        position: "lg:absolute top-[5%] left-[23%]",
      },
      {
        text: "",
        size: 110,
        color: "#e2ad2d",
        position: "lg:absolute top-[70%] left-[22%]",
      },
      {
        text: "",
        size: 180,
        color: "#f3e033",
        position: "lg:absolute top-[45%] right-[20%]",
      },
      {
        text: "",
        size: 90,
        color: "#675bf8",
        position: "lg:absolute top-[34%] right-[18%]",
      },
      {
        text: "",
        size: 100,
        color: "#f56d7c",
        position: "lg:absolute top-[64%] right-[13%]",
      },
    ],
    Technology: [
      {
        text: "Dot Matrix",
        size: 200,
        color: "#f9707c",
        position: "lg:absolute top-[40%] left-[13%] z-1",
      },
      {
        text: "Inkjet",
        size: 200,
        color: "#f3e033",
        position: "lg:absolute top-[5%] left-[24%]",
      },
      {
        text: "LED",
        size: 100,
        color: "#f56d7c",
        position: "lg:absolute top-[54%] left-[33%]",
      },
      {
        text: "Laser",
        size: 120,
        color: "#f3e033",
        position: "lg:absolute top-[42%] right-[42%]",
      },
      {
        text: "3D",
        size: 90,
        color: "#675bf8",
        position: "lg:absolute top-[10%] right-[34%]",
      },
      {
        text: "Thermal",
        size: 320,
        color: "#675bf8",
        position: "lg:absolute top-[17%] right-[10%]",
      },
    ],
  };

  return (
    <>
      {/* <TabSection
        navClassName="mb-4"
        tabs={[
          "Type",
          "Technology",
          "Connectivity",
          "Output",
          "End User",
          "Regions",
          "Countries",
        ]}
        className=""
        activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 px-5 py-[5px]"
        inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px]"
        tabContentClass="pl-4 mb-[40]"
        tabContent={{
          Type: (
            <>
              <div className="flex flex-wrap relative lg:h-[400]">
                <div className="pink-circle bg-[#f9707c] w-[180] h-[180] rounded-[50%] flex justify-center items-center lg:absolute top-[40%] left-[12%] z-1">
                  <h4 className="text-white font-semibold">
                    Standalone Printers
                  </h4>
                </div>
                <div className="blue-circle bg-[#675bf8] w-[320] h-[320] rounded-[50%] flex justify-center items-center lg:absolute top-[5%] left-[23%]">
                  <div className="text-center text-white font-semibold">
                    <h4 className="">Multi-Functional Printers</h4>
                    <p className="">Largest Segment</p>
                  </div>
                </div>
                <div className="yellow-circle bg-[#e2ad2d] w-[110] h-[110] rounded-[50%] flex justify-center items-center lg:absolute top-[70%] left-[22%]"></div>
                <div className="light-yellow-circle bg-[#f3e033] w-[180] h-[180] rounded-[50%] flex justify-center items-center lg:absolute top-[45%] right-[20%]"></div>
                <div className="light-yellow-circle bg-[#675bf8] w-[90] h-[90] rounded-[50%] flex justify-center items-center lg:absolute top-[34%] right-[18%]"></div>
                <div className="light-yellow-circle bg-[#f56d7c] w-[100] h-[100] rounded-[50%] flex justify-center items-center lg:absolute top-[64%] right-[13%]"></div>
              </div>
            </>
          ),
          Technology: (
            <>
              <div className="flex flex-wrap relative lg:h-[400]">
                <div className="pink-circle bg-[#f9707c] w-[200] h-[200] rounded-[50%] flex justify-center items-center lg:absolute top-[40%] left-[13%] z-1">
                  <h4 className="text-white font-semibold">Dot Matrix</h4>
                </div>
                <div className="light-yellow-circle bg-[#f3e033] w-[200] h-[200] rounded-[50%] flex justify-center items-center lg:absolute top-[5%] left-[24%]">
                  <h4 className="text-center text-white font-semibold">
                    Inkjet
                  </h4>
                </div>
                <div className="pink-circle bg-[#f56d7c] w-[100] h-[100] rounded-[50%] flex justify-center items-center lg:absolute top-[54%] left-[33%]">
                  <h4 className="text-center text-white font-semibold">LED</h4>
                </div>
                <div className="light-yellow-circle bg-[#f3e033] w-[120] h-[120] rounded-[50%] flex justify-center items-center lg:absolute top-[42%] right-[42%]">
                  <h4 className="text-center text-white font-semibold">
                    Laser
                  </h4>
                </div>
                <div className="blue-circle bg-[#675bf8] w-[90] h-[90] rounded-[50%] flex justify-center items-center lg:absolute top-[10%] right-[34%]">
                  <h4 className="text-center text-white font-semibold">3D</h4>
                </div>

                <div className="blue-circle bg-[#675bf8] w-[320] h-[320] rounded-[50%] flex justify-center items-center lg:absolute top-[17%] right-[10%]">
                  <h4 className="text-center text-white font-semibold">
                    Thermal
                  </h4>
                </div>
              </div>
            </>
          ),
        }}
      /> */}
      <TabSection
        navClassName="mb-4"
        tabs={Object.keys(circles).map((tab) => ({ label: tab }))}
        className=""
        activeClass="active-tab-btn bg-gradient-to-r from-[var(--primary-color)] to-[#7F00E3] text-white m-1 px-5 py-[5px]"
        inactiveClass="bg-[#9a9a9a] text-white m-1 px-5 py-[5px]"
        tabContentClass="pl-4 mb-[40]"
        tabContent={Object.fromEntries(
          Object.entries(circles).map(([key, items]) => [
            key,
            <div className="flex flex-wrap relative lg:h-[400]" key={key}>
              {items.map((c, i) => (
                <div
                  key={i}
                  className={`rounded-[50%] flex justify-center items-center ${c.position}`}
                  style={{
                    width: c.size,
                    height: c.size,
                    backgroundColor: c.color,
                  }}
                >
                  {(c.text || c.subText) && (
                    <div className="text-center text-white font-semibold">
                      {c.text && <h4>{c.text}</h4>}
                      {c.subText && <p>{c.subText}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>,
          ])
        )}
      />
    </>
  );
};

export default PrinterTabs;

