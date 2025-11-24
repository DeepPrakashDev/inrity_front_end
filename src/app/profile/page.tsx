"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import MyActivityChart from "../components/MyActivityChart";

const page = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="profile-main mb-[40]">
        <div className="top-bar bg-white border-b border-[#E0E2E7] p-4 mb-[40]">
          <div className="container mx-auto">
            <div className=" flex justify-between">
              <p className="font-semibold text-[20px]">My Space</p>
              <p className="text-[13px] flex items-center text-[#667085]">
                Home
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width={10}
                  height={10}
                  fill="var(--primary-color)"
                  className="mx-1"
                >
                  <path d="M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z" />
                </svg>
                <span className="current-page text-[var(--primary-color)]">
                  My Space
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------------Banner Sec---------------- */}
        <div className="container mx-auto">
          <div className="profile-banner bg-white p-4 border border-[#E0E2E7] rounded-lg">
            <div className="cover-img relative">
              <Image
                src="/assets/images/cover.png"
                className="w-full"
                width={1200}
                height={30}
                alt="icon"
              />
              <Image
                src="/assets/images/profile.png"
                className="max-w-full absolute bottom-[-45] left-[20]"
                width={100}
                height={100}
                alt="icon"
              />
            </div>
            <div className="profile-info pl-[125] pt-[20] flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center">
                <div className="avatar-name mr-[20]">
                  <h4 className="text-[var(--primary-color)] text-[18px] font-medium">
                    Jane Doe
                  </h4>
                  <p className="text-[#858D9D] text-[13px]">
                    jane.doe@unilever.com
                  </p>
                </div>
                <div className="avatar-designation">
                  <h4 className="text-[18px] font-medium">Unilever</h4>
                  <p className="text-[#858D9D] text-[13px]">
                    Procurement Manager
                  </p>
                </div>
              </div>
              <div className="relative md:inline-block hidden z-99">
                <button
                  onClick={() => setOpen(!open)}
                  className="px-4 py-2 rounded cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={25}
                    height={25}
                    fill="#000"
                  >
                    <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
                  </svg>
                </button>

                {open && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-[13px]">
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 text-[#50a750]"
                      >
                        Active User
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 text-[#FF0000]"
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------Subscription Summary--------------- */}

      <section className="products-subscribed mb-[40px] xl:p-0 lg:p-4 md:p-4 p-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 md:grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="xl:col-span-5 col-span-12 border border-[#e0e2e7] rounded-lg">
              <div className="explore-industry-card bg-white p-5 h-full">
                <div className="heading mb-[30]">
                  <h3 className="text-[20px] font-semibold">
                    Subscription Summary
                  </h3>
                </div>

                <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center border-b border-[#E0E2E7] pb-4 mb-[40]">
                  <div className="flex-1 text-center lg:border-r border-[#E0E2E7] ">
                    <h3 className="text-[25px] font-semibold">5/8</h3>
                    <h4 className="subtitle text-[var(--primary-color)] text-[15px]">
                      Report Types
                    </h4>
                  </div>
                  <div className="flex-1 text-center lg:border-r border-[#E0E2E7] px-4">
                    <h3 className="text-[25px] font-semibold">100/2000</h3>
                    <h4 className="subtitle text-[var(--primary-color)] text-[15px]">
                      Subscribed Reports
                    </h4>
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="text-[25px] font-semibold">5/8</h3>
                    <h4 className="subtitle text-[var(--primary-color)] text-[15px]">
                      Products
                    </h4>
                  </div>
                </div>

                <ul className="">
                  <li className="flex justify-between items-center mb-5">
                    <div className="text-dv ml-2">
                      <h4 className="text-[14px] mb-1 font-semibold">
                        Sourcing Compass
                      </h4>
                      <p className="text-[12px] text-[#FF0000] font-semibold">
                        Expiring in 2 Days
                      </p>
                    </div>
                    <div className="flex justify-around items-start">
                      <p className="text-[12px] mr-2">$702.24</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center mb-5">
                    <div className="text-dv ml-2">
                      <h4 className="text-[14px] mb-1 font-semibold">
                        Trade 360
                      </h4>
                      <p className="text-[12px] text-[#FF0000] font-semibold">
                        Expiring in 2 Days
                      </p>
                    </div>
                    <div className="flex justify-around items-start">
                      <p className="text-[12px] mr-2">$702.24</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center mb-5">
                    <div className="text-dv ml-2">
                      <h4 className="text-[14px] mb-1 font-semibold">
                        Report Bundle
                      </h4>
                      <p className="text-[12px] text-[#FF0000] font-semibold">
                        Expiring in 2 Days
                      </p>
                    </div>
                    <div className="flex justify-around items-start">
                      <p className="text-[12px] mr-2">$702.24</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center mb-5">
                    <div className="text-dv ml-2">
                      <h4 className="text-[14px] mb-1 font-semibold">
                        Report Bundle
                      </h4>
                      <p className="text-[12px] text-[#FF0000] font-semibold">
                        Expiring in 2 Days
                      </p>
                    </div>
                    <div className="flex justify-around items-start">
                      <p className="text-[12px] mr-2">$702.24</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="text-dv ml-2">
                      <h4 className="text-[14px] mb-1 font-semibold">
                        Report Bundle
                      </h4>
                      <p className="text-[12px] text-[#FF0000] font-semibold">
                        Expiring in 2 Days
                      </p>
                    </div>
                    <div className="flex justify-around items-start">
                      <p className="text-[12px] mr-2">$702.24</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="xl:col-span-7 col-span-12 bg-white border border-[#e0e2e7] rounded-lg">
              <div className="heading flex flex-wrap items-center border-b border-[#e0e2e7] p-4 mb-4">
                <h3 className="text-[20px] w-50 font-semibold">
                  Reports Subscribed
                </h3>
                <div className="relative flex-1">
                  {/* <div className=""> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="absolute top-[10] left-[15]"
                  >
                    <g clipPath="url(#clip0_488_18430)">
                      <path
                        d="M0 12.6667C0.00105857 13.5505 0.352588 14.3977 0.97748 15.0226C1.60237 15.6475 2.4496 15.999 3.33333 16.0001H12.6667C13.5504 15.999 14.3976 15.6475 15.0225 15.0226C15.6474 14.3977 15.9989 13.5505 16 12.6667V6.66675H0V12.6667ZM11.3333 9.66675C11.5311 9.66675 11.7245 9.7254 11.8889 9.83528C12.0534 9.94516 12.1815 10.1013 12.2572 10.2841C12.3329 10.4668 12.3527 10.6679 12.3141 10.8618C12.2755 11.0558 12.1803 11.234 12.0404 11.3739C11.9006 11.5137 11.7224 11.6089 11.5284 11.6475C11.3344 11.6861 11.1334 11.6663 10.9507 11.5906C10.7679 11.5149 10.6117 11.3868 10.5019 11.2223C10.392 11.0579 10.3333 10.8645 10.3333 10.6667C10.3333 10.4015 10.4387 10.1472 10.6262 9.95964C10.8138 9.7721 11.0681 9.66675 11.3333 9.66675ZM8 9.66675C8.19778 9.66675 8.39112 9.7254 8.55557 9.83528C8.72002 9.94516 8.84819 10.1013 8.92388 10.2841C8.99957 10.4668 9.01937 10.6679 8.98079 10.8618C8.9422 11.0558 8.84696 11.234 8.70711 11.3739C8.56726 11.5137 8.38907 11.6089 8.19509 11.6475C8.00111 11.6861 7.80004 11.6663 7.61732 11.5906C7.43459 11.5149 7.27841 11.3868 7.16853 11.2223C7.05865 11.0579 7 10.8645 7 10.6667C7 10.4015 7.10536 10.1472 7.29289 9.95964C7.48043 9.7721 7.73478 9.66675 8 9.66675ZM4.66667 9.66675C4.86445 9.66675 5.05779 9.7254 5.22224 9.83528C5.38669 9.94516 5.51486 10.1013 5.59055 10.2841C5.66623 10.4668 5.68604 10.6679 5.64745 10.8618C5.60887 11.0558 5.51363 11.234 5.37377 11.3739C5.23392 11.5137 5.05574 11.6089 4.86176 11.6475C4.66778 11.6861 4.46671 11.6663 4.28398 11.5906C4.10126 11.5149 3.94508 11.3868 3.8352 11.2223C3.72532 11.0579 3.66667 10.8645 3.66667 10.6667C3.66667 10.4015 3.77202 10.1472 3.95956 9.95964C4.1471 9.7721 4.40145 9.66675 4.66667 9.66675Z"
                        fill="#858D9D"
                      />
                      <path
                        d="M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 5.33333H16V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333Z"
                        fill="#858D9D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_488_18430">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* </div> */}
                  <div className="flex flex-wrap justify-between items-center w-full">
                    <input
                      type="search"
                      className="block p-2 ps-10 text-sm text-gray-900  border border-[#e0e2e7] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:outline-0 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Tools"
                      required
                    />
                    <p className="active-tab-btn w-max bg-[#dee3ff] text-[11px] px-3 py-2 font-semibold ml-3 rounded-sm">
                      Quarterly
                    </p>
                    <p className="w-max text-[11px] px-3">Bi-Annual</p>
                    <p className="w-max text-[11px] px-3">Annual</p>
                  </div>
                </div>
              </div>
              <div className="recent-report-list">
                <ul className="vertical-overflow overflow-y-scroll px-4 h-[475px] mb-4">
                  <li className="flex justify-between items-center border-b border-[#f0f1f3] pb-3 mb-3">
                    <p className="text-[#4A4C56] text-[14px]">Products</p>
                    <p className="text-[#4A4C56] text-[14px]">User Status</p>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Sourcing Compass</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Trade 360</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#FF00001A] text-[#FF0000] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Expired
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Procure 360</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#FFCB3380] text-[#6D6400] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Expiring in 2 Days
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 4</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 5</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 6</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 7</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 8</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------Products Subscribed--------------- */}

      <section className="products-subscribed mb-[40px] xl:p-0 lg:p-4 md:p-4 p-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 bg-white border border-[#e0e2e7] rounded-lg">
              <div className="heading flex lg:flex-nowrap md:flex-wrap items-center border-b border-[#e0e2e7] p-4 mb-4">
                <h3 className="text-[20px] w-full font-semibold">
                  Products Subscribed
                </h3>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_488_18430)">
                        <path
                          d="M0 12.6667C0.00105857 13.5505 0.352588 14.3977 0.97748 15.0226C1.60237 15.6475 2.4496 15.999 3.33333 16.0001H12.6667C13.5504 15.999 14.3976 15.6475 15.0225 15.0226C15.6474 14.3977 15.9989 13.5505 16 12.6667V6.66675H0V12.6667ZM11.3333 9.66675C11.5311 9.66675 11.7245 9.7254 11.8889 9.83528C12.0534 9.94516 12.1815 10.1013 12.2572 10.2841C12.3329 10.4668 12.3527 10.6679 12.3141 10.8618C12.2755 11.0558 12.1803 11.234 12.0404 11.3739C11.9006 11.5137 11.7224 11.6089 11.5284 11.6475C11.3344 11.6861 11.1334 11.6663 10.9507 11.5906C10.7679 11.5149 10.6117 11.3868 10.5019 11.2223C10.392 11.0579 10.3333 10.8645 10.3333 10.6667C10.3333 10.4015 10.4387 10.1472 10.6262 9.95964C10.8138 9.7721 11.0681 9.66675 11.3333 9.66675ZM8 9.66675C8.19778 9.66675 8.39112 9.7254 8.55557 9.83528C8.72002 9.94516 8.84819 10.1013 8.92388 10.2841C8.99957 10.4668 9.01937 10.6679 8.98079 10.8618C8.9422 11.0558 8.84696 11.234 8.70711 11.3739C8.56726 11.5137 8.38907 11.6089 8.19509 11.6475C8.00111 11.6861 7.80004 11.6663 7.61732 11.5906C7.43459 11.5149 7.27841 11.3868 7.16853 11.2223C7.05865 11.0579 7 10.8645 7 10.6667C7 10.4015 7.10536 10.1472 7.29289 9.95964C7.48043 9.7721 7.73478 9.66675 8 9.66675ZM4.66667 9.66675C4.86445 9.66675 5.05779 9.7254 5.22224 9.83528C5.38669 9.94516 5.51486 10.1013 5.59055 10.2841C5.66623 10.4668 5.68604 10.6679 5.64745 10.8618C5.60887 11.0558 5.51363 11.234 5.37377 11.3739C5.23392 11.5137 5.05574 11.6089 4.86176 11.6475C4.66778 11.6861 4.46671 11.6663 4.28398 11.5906C4.10126 11.5149 3.94508 11.3868 3.8352 11.2223C3.72532 11.0579 3.66667 10.8645 3.66667 10.6667C3.66667 10.4015 3.77202 10.1472 3.95956 9.95964C4.1471 9.7721 4.40145 9.66675 4.66667 9.66675Z"
                          fill="#858D9D"
                        />
                        <path
                          d="M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 5.33333H16V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333Z"
                          fill="#858D9D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_488_18430">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <input
                    type="search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900  border border-[#e0e2e7] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:outline-0 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Tools"
                    required
                  />
                </div>
              </div>
              <div className="recent-report-list">
                <ul className="vertical-overflow overflow-y-scroll px-4 h-[475px] mb-4">
                  <li className="flex justify-between items-center border-b border-[#f0f1f3] pb-3 mb-3">
                    <p className="text-[#4A4C56] text-[14px]">Products</p>
                    <p className="text-[#4A4C56] text-[14px]">User Status</p>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Sourcing Compass</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Trade 360</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#FF00001A] text-[#FF0000] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Expired
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Procure 360</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#FFCB3380] text-[#6D6400] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Expiring in 2 Days
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 4</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 5</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 6</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 7</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-[30]">
                    <Link
                      rel="stylesheet"
                      href="#"
                      className="flex justify-between items-center"
                    >
                      <div className="flex">
                        <div className="img-dv">
                          <Image
                            src="/assets/images/market-icon.png"
                            width={40}
                            height={40}
                            alt="logo"
                          />
                        </div>
                        <div className="text-dv ml-2">
                          <h4 className="text-[13px]">Product 8</h4>
                          <p className="text-[12px] text-[#6E6893]">
                            Single Purchase
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="bg-[#ededff] text-[#4A4AFF] text-[12px] px-2 w-fit mb-2 rounded-xl">
                          &#8226; Active
                        </p>
                        <p className="text-[12px] text-[#6E6893] px-[5px]">
                          Last Login: <span className="">14/APR/2020</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
                <div className="flex"></div>
              </div>
            </div>
            <div className="lg:col-span-4 border border-[#e0e2e7] rounded-lg">
              <div className="bg-[url('/assets/images/bann1.png')] bg-cover bg-center h-full w-full rounded-lg">
                <div className="explore-industry-card px-[40] py-[50] text-white flex flex-col justify-between h-full">
                  <div className="heading">
                    <h3 className="text-[20px] font-semibold">
                      Explore Industries
                    </h3>
                  </div>

                  <div className="">
                    <p className="md:text-[30px] text-[20px] leading-[1.2] mb-4">
                      Arcu vel sit at porta. Enim nulla non sagittis viverra
                      hendrerit
                    </p>
                    <Link href="#" className="flex items-center">
                      View More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right-icon lucide-chevron-right bg-white text-black ml-4"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------Chart--------------- */}
      <section className="mb-[40]">
        <div className="container mx-auto">
          <div className="bg-white p-4 border border-[#E0E2E7] rounded-lg">
            <MyActivityChart />
          </div>
        </div>
      </section>

      <section className="mb-[40]">
        <div className="container mx-auto">
          <div className="bg-[url('/assets/images/package-cover.png')] bg-cover bg-center h-full w-full px-[40] py-[20]">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
              <div className="col-span-5">
                <div className="form-about h-full text-white flex flex-col justify-between">
                  <h4 className="text-[20px] font-semibold">
                    Today Highlights
                  </h4>
                  <div className="author-info">
                    <p className="md:text-[30px] text-[20px] md:pr-[50]">
                      “Arcu vel sit at porta. Enim nulla non sagittis viverra
                      hendrerit”
                    </p>
                    <p className="text-[20px]">Author</p>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                <div className="form-dv text-white">
                  <div className="form-header border-b border-[#E0E2E7] mb-[20]">
                    <h4 className="text-[18px]">Leave a Comment</h4>
                    <p className="text-[14px] mb-2">Write To Us</p>
                  </div>
                  <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 md:grid-flow-row grid-flow-row gap-4">
                    <div className="md:col-span-6 col-span-12 mb-3">
                      <label htmlFor="" className="block text-[18px] mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        className="bg-white text-black w-full p-2"
                        placeholder="Packaging"
                      />
                    </div>
                    <div className="md:col-span-6 col-span-12 mb-3">
                      <label htmlFor="" className="block text-[18px] mb-2">
                        Type
                      </label>
                      <input
                        type="text"
                        className="bg-white text-black w-full p-2"
                        placeholder="Report/Products"
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="" className="block text-[18px] mb-2">
                        Comment
                      </label>
                      <textarea
                        name=""
                        id=""
                        rows={4}
                        className="bg-white text-black w-full p-2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
