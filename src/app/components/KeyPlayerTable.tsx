"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type companyData = {
  id: number;
  name: string;
  revenue_currency: string;
  revenue: number | string;
  employe_count: number;
  headquarters: string;
  website_url: string;
  companyData: any;
};

interface KeyPlayerTableProps {
  data: companyData[];
}

const KeyPlayerTable: React.FC<KeyPlayerTableProps> = ({ data }) => {
    const [dataList, setDataList] = useState(data);

    const [searchTerm, setSearchTerm] = useState("s");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filteredData = data.filter((item) =>
            (item.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
        );
        setDataList(filteredData);
    }, [searchTerm, data]);

    return (
        <>
      <div className="heading p-4 flex flex-wrap justify-between">
        <div className="heading-wrap flex items-center mb-4">
          <Image
            src="/assets/images/market-icon.png"
            width={40}
            height={40}
            alt="icon"
          />
          <div className="text-dv ml-3">
            <h4 className="text-[18px] leading-[1.2] font-semibold">
              Printer Companies
            </h4>
            <p className="text-[12px] text-[#667085]">
              Massa nulla commodo nulla a
            </p>
          </div>
        </div>
        <div className="lg:col-span-12 flex lg:justify-end items-center">
          <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-[#858D9D]"
                />
              </div>
              <input
                type="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900  border border-[#e0e2e7] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:outline-0 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Companies"
                required
                onChange={handleSearch}
              />
            </div>
          </form>
          <Link href="#">
            <Image
              src="/assets/images/download.png"
              width={20}
              height={20}
              className="mx-2"
              alt="download"
            />
          </Link>
          <Link href="#">
            <Image
              src="/assets/images/excel.png"
              width={20}
              height={20}
              className="mx-2"
              alt="excel"
            />
          </Link>
          <div onClick={() => window.print()}>
            <Image
              src="/assets/images/print.png"
              width={20}
              height={20}
              className="mx-2"
              alt="print"
            />
          </div>
          <Link href="#">
            <Image
              src="/assets/images/check.png"
              width={20}
              height={20}
              className="mx-2"
              alt="check"
            />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* <table className="min-w-full">
          <thead className="text-[14px] text-[#4A4C56] font-medium bg-white bg-primary dark:bg-primary-dark"> */}
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-[14px] text-[#4A4C56] font-medium bg-white  bg-primary dark:bg-primary-dark">
            <tr>
              <th scope="col" className="px-5 py-3">
                Company
              </th>
              <th scope="col" className="px-5 py-3  min-w-[180px]">
                Revenue In 2024
              </th>
              <th scope="col" className="px-5 py-3">
                Employees
              </th>
              <th scope="col" className="px-5 py-3">
                Headquarters
              </th>
              <th scope="col" className="px-5 py-3">
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((element: any, i: number) => (
              <tr className="bg-white text-[14px]" key={i}>
                <td
                  scope="row"
                  className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* <div className="heading-wrap flex items-center justify-center"> */}

                  <div className="heading-wrap flex items-center justify-start">
                    <Image
                      src="/assets/images/comp1.png"
                      width={40}
                      height={40}
                      alt="icon"
                    />
                    <div className="text-dv ml-2 mr-1">
                      <h4 className="text-[14px] leading-[1.2] mb-1 font-semibold">
                        {element.name}
                      </h4>
                      <p className="text-[12px] text-[#667085]">
                        Fortune 500 Company
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {element.revenue_currency + " " + element?.revenue}
                </td>
                <td className="px-5 py-4">{element?.employe_count}</td>
                <td className="px-5 py-4">{element?.headquarters}</td>
                <td className="px-5 py-4">{element?.website_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KeyPlayerTable;
