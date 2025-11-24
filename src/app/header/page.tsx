"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");

  function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null; // SSR-safe
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  function decodeJWT(token: string) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  }

  // ⛔ FIX: Perform decoding inside useEffect
  const token = getCookie("_auth");
  useEffect(() => {
    if (!token) return;

    try {
      const data = decodeJWT(token);
      if (data?.user?.name) {
        setUserName(data.user.name);
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, [token]);

  return (
    <>
      <header className="md:border-b border-[#e0e2e7]">
        <div className="w-full grid lg:grid-flow-col md:grid-flow-col Lg:grid-cols-12 md:grid-cols-12 gap-2">
          <div className="logo-dv w-full md:col-span-4 bg-gradient-to-r from-blue-500 to-purple-600 lg:col-span-2 p-2 content-center">
            <Link href="after_login">
              <Image
                src="/assets/images/logo.png"
                className="mx-auto"
                width={120}
                height={40}
                alt="logo"
              />
            </Link>
          </div>
          <div className="search-dv lg:col-span-7 md:col-span-4 p-4 relative lg:block hidden">
            <input
              type="text"
              placeholder="Search"
              className="lg:w-100 h-10 border border-gray-300 rounded px-4 py-1 text focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#99a1af"
              className="absolute top-7 left-7"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
          <div className="lg:col-span-4 md:col-span-4 flex lg:justify-evenly md:justify-end items-center lg:gap-0 md:gap-3 gap-4 p-4">
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-languages-icon lucide-languages"
              >
                <path d="m5 8 6 6" />
                <path d="m4 14 6-6 2-3" />
                <path d="M2 5h12" />
                <path d="M7 2h1" />
                <path d="m22 22-5-10-5 10" />
                <path d="M14 18h6" />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell-icon lucide-bell"
              >
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-square-text-icon lucide-message-square-text"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M13 8H7" />
                <path d="M17 12H7" />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
              </svg>
            </Link>
            {userName ? (
              <button
                title="Toggle Theme"
                className="bg-[var(--primary-color)] text-xs text-white px-2 py-2 rounded"
              >
                {userName}
              </button>
            ) : (
              <>
                <button
                  title="Toggle Theme"
                  className="bg-[var(--primary-color)] text-xs text-white px-2 py-2 rounded"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>
              </>
            )}

            <Link href="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
            <Link href="#" className="lg:hidden block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </Link>
          </div>
        </div>
        <nav className="navbar-main">
          {/* Mobile Menu Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 md:top-[20px] top-[85px] h-6 w-6 cursor-pointer lg:hidden md:block block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          {/* Menu Links */}
          <div
            className={`${
              menuOpen ? "show" : "hide"
            } nav-menu z-999 bg-[var(--primary-color)] w-full lg:flex lg:items-center lg:w-auto lg:p-0 md:p-3 p-3`}
          >
            <ul className="flex flex-wrap xl:justify-between xl:flex-row lg:flex-row md:flex-col flex-col w-full text-white font-medium text-md">
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="/category_listing"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Sectors
                </Link>
              </li>
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="/reports?type=market-report"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Market Reports
                </Link>
              </li>
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="/reports?type=pre-feasibility-report"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Pre Feasibility Reports
                </Link>
              </li>
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="/reports?type=price-forecasting-report"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Price Forecasting Reports
                </Link>
              </li>
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="/reports?type=procurement-intelligence-report"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Procurement Intelligence Reports
                </Link>
              </li>
              <li className="text-center flex lg:justify-center grow-1 py-3">
                <Link
                  rel="stylesheet"
                  href="#"
                  className="flex items-center text-[15px]"
                >
                  <Image
                    src="/assets/images/tile_small.svg"
                    className="mr-1 mx-auto"
                    width={20}
                    height={40}
                    alt="logo"
                  />
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
