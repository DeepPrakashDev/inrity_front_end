"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Optional: replace with your own icon
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faAngleRight,
  faDownload,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AccordionData = {
  Regions: string[];
  Countries: string[];
  "Report Type": string[];
  Industry: string[];
  "Upcoming Reports": string[];
};
type AccordionKey = "Report Type" | "Regions" | "Countries";

const page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [reports, setReports] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [accordionData, setAccordionData] = useState<AccordionData>({
    Regions: [],
    Countries: [],
    "Report Type": [],
    Industry: [],
    "Upcoming Reports": [],
  });
  type FilterValue = number | string | (number | string)[] | undefined;
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<keyof AccordionData, FilterValue>> & {
      name?: string;
      id?: number | string;
    }
  >({});

  const [selectedHeading, setSelectedHeading] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>();
  const [showReportList, setShowReportList] = useState(false);
  const searchParams = useSearchParams();
  const typeName = searchParams.get("type");
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dialCode: "",
    comment: "",
    phoneNumber: "",
    id: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const router = useRouter();
  const typeNameFormatted: { [key: string]: string } = {
    "market-report": "Market Reports",
    "pre-feasibility-report": "Prefeasibility Reports",
    "price-forecasting-report": "Price Forecasting Reports",
    "procurement-intelligence-report": "Procurement Intelligence Reports",
  };

  const typeNameFormattedField: { [key: string]: string } = {
    "market-report": "market-reports",
    "pre-feasibility-report": "prefeasibility-reports",
    "price-forecasting-report": "Price Forecasting Reports",
    "procurement-intelligence-report": "procurement-reports",
  };

  const fieldMap: Record<string, string> = {
    Regions: "location_name",
    Countries: "location_name",
    "Report Type": "type_name",
    Industry: "category_name",
  };

  const category = searchParams.get("category");

  useEffect(() => {
    if (typeName) {
      setSelectedFilters((prev: any) => ({
        ...prev,
        "Report Type": typeNameFormattedField[typeName] ?? "",
        Industry: Number(searchParams.get("catId")) ?? "",
        name: typeNameFormatted[typeName] || typeName,
      }));
      setOpenIndex(2);
    } else if (category) {
      setSelectedFilters((prev: any) => ({
        ...prev,
        "Report Type": null,
        Industry: Number(searchParams.get("catId")) ?? "",
        name: category?.replace(/_/g, " ") ?? "",
      }));
      setOpenIndex(3);
    }
  }, [typeName, category]);

  console.log(selectedFilters, "selectedFilters");

  useEffect(() => {
    setSelectedHeading(category);
  }, []);

  const fetchAccordionData = async (
    endpoint: string,
    key: AccordionKey
  ): Promise<void> => {
    try {
      const res = await api.get(endpoint);
      setAccordionData((prev) => ({
        ...prev,
        [key]: res?.data?.data || [],
      }));
    } catch (err) {
      setAccordionData((prev) => ({
        ...prev,
        [key]: [],
      }));
    }
  };

  const fetchIndustry = async (): Promise<void> => {
    try {
      const res = await api.post("master/category/list?page=1&limit=1000", {
        search_text: "",
      });
      setAccordionData((prev) => ({
        ...prev,
        Industry: res?.data?.data || [],
      }));
    } catch (err) {
      console.error("API failed for Industry:", err);
      setAccordionData((prev) => ({ ...prev, Industry: [] }));
    }
  };

  useEffect(() => {
    fetchAccordionData("master/report-type-list", "Report Type");
    fetchAccordionData("master/region-list", "Regions");
    fetchAccordionData("master/country-list", "Countries");
    fetchIndustry();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const MUTUALLY_EXCLUSIVE = ["Report Type", "Industry"];

  // const accordionItems = [
  //   {
  //     title: "Regions",
  //     content: (
  //       <ul className="space-y-1">
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Global
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg2" className="cursor-pointer">
  //             North America
  //           </label>
  //           <input type="checkbox" name="" id="reportReg2" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg3" className="cursor-pointer">
  //             Latin America
  //           </label>
  //           <input type="checkbox" name="" id="reportReg3" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg4" className="cursor-pointer">
  //             Asia Pacific
  //           </label>
  //           <input type="checkbox" name="" id="reportReg4" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg5" className="cursor-pointer">
  //             Europe
  //           </label>
  //           <input type="checkbox" name="" id="reportReg5" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg6" className="cursor-pointer">
  //             Middle East and Africa
  //           </label>
  //           <input type="checkbox" name="" id="reportReg6" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg7" className="cursor-pointer">
  //             GCC
  //           </label>
  //           <input type="checkbox" name="" id="reportReg7" />
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "Countries",
  //     content: (
  //       <ul className="space-y-1">
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             India
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "Report Type",
  //     content: (
  //       <ul className="space-y-1">
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Market Reports
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Healthcare Reports
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Pre Feasibility Reports
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Patent Analysis Reports
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "Industry",
  //     content: (
  //       <ul className="space-y-1">
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Agriculture and Farming
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Agriculture and Farming
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Agriculture and Farming
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //         <li className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between">
  //           <label htmlFor="reportReg1" className="cursor-pointer">
  //             Agriculture and Farming
  //           </label>
  //           <input type="checkbox" name="" id="reportReg1" />
  //         </li>
  //       </ul>
  //     ),
  //   },
  // ];

  const accordionItems = Object.entries(accordionData).map(
    ([title, items]) => ({
      title,
      content: (
        <ul className="space-y-1">
          {items.map((item: any, index: number) => {
            const field = fieldMap[title];
            const label = item[field];
            const id = `${title}-${item.id || index}`;

            const value = item?.location_id
              ? item?.location_id
              : (item.type_slug ?? item?.category_id) || label;
            type FilterKey = keyof typeof accordionData;
            const filterKey = title as FilterKey;
            const isChecked = Array.isArray(selectedFilters[filterKey])
              ? (selectedFilters[filterKey] as any[]).includes(value)
              : selectedFilters[filterKey] === value;
            const singleSelectTitles = ["Report Type", "Industry"];

            // true if current title is in the list
            const isSingleSelect = singleSelectTitles.includes(title);

            return (
              <li
                key={id}
                className="bg-white dark:bg-gray-800 text-black dark:text-white text-[17px] px-5 py-2 my-3 border-b border-[#cccccc88] dark:border-gray-700 flex items-center justify-between"
              >
                <label htmlFor={id} className="cursor-pointer">
                  {label}
                </label>

                <input
                  type="checkbox"
                  id={id}
                  checked={isChecked}
                  // onChange={(e) => {
                  //   setSelectedFilters((prev) => {
                  //     if (isSingleSelect) {
                  //       return {
                  //         ...prev,
                  //         [filterKey]: e.target.checked ? value : null,
                  //         name: label,
                  //       };
                  //     } else {
                  //       const current = Array.isArray(prev[filterKey])
                  //         ? [...(prev[filterKey] as any[])]
                  //         : [];

                  //       if (e.target.checked) {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [...current, value],
                  //           name: label,
                  //         };
                  //       } else {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: current.filter((v) => v !== value),
                  //         };
                  //       }
                  //     }
                  //   });
                  // }}
                  onChange={(e) => {
                    setSelectedFilters((prev) => {
                      let updated = { ...prev };

                      const isMutual = MUTUALLY_EXCLUSIVE.includes(filterKey);

                      // If mutual exclusive filter is selected,
                      // remove values from the other key
                      if (isMutual && e.target.checked) {
                        const otherKey = MUTUALLY_EXCLUSIVE.find(
                          (k) => k !== filterKey
                        ) as keyof typeof updated | undefined;

                        if (otherKey) {
                          updated[otherKey] = undefined; // clear the other one
                        }
                      }

                      // ---------- your original logic ----------
                      if (isSingleSelect) {
                        updated[filterKey] = e.target.checked ? value : null;
                        updated["name"] = label;
                      } else {
                        const current = Array.isArray(prev[filterKey])
                          ? [...prev[filterKey]]
                          : [];

                        if (e.target.checked) {
                          updated[filterKey] = [...current, value];
                          updated["name"] = label;
                        } else {
                          updated[filterKey] = current.filter(
                            (v) => v !== value
                          );
                        }
                      }

                      return updated;
                    });
                  }}

                  // onChange={(e) => {
                  //   setSelectedFilters((prev) => {
                  //     const current = Array.isArray(prev[filterKey]) ? [...(prev[filterKey] as any[])] : [];

                  //     if (isSingleSelect) {
                  //       // if selecting Industry or Report Type, clear the other one
                  //       const cleared = { ...prev };
                  //       singleSelectTitles.forEach((t) => {
                  //         if (t !== title) cleared[t as FilterKey] = undefined;
                  //       });

                  //       return {
                  //         ...cleared,
                  //         [filterKey]: e.target.checked ? value : null,
                  //         name: label,
                  //         id: item.id || index,
                  //       };
                  //     } else {
                  //       if (e.target.checked) {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [value], // replaces any previously selected value(s)
                  //           name: label,
                  //           id: item.id || index,
                  //         };
                  //       } else {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [], // uncheck removes all (none selected)
                  //         };
                  //       }
                  //       const current = Array.isArray(prev[filterKey])
                  //         ? [...(prev[filterKey] as any[])]
                  //         : [];

                  //       if (e.target.checked) {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [...current, value],
                  //           name: label,
                  //           id: item.id || index,
                  //         };
                  //       } else {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: current.filter((v) => v !== value),
                  //         };
                  //       }
                  //     }
                  //     const isSingleSelectGroup = !Array.isArray(prev[filterKey]);
                  //     if (isSingleSelectGroup) {
                  //       // 🟦 This group is single-select (mutually exclusive with other single-selects)
                  //       const cleared = { ...prev };
                  //       // Clear all other single-select groups dynamically
                  //       (Object.keys(prev) as (keyof typeof prev)[]).forEach(
                  //         (k) => {
                  //           if (!Array.isArray(prev[k])) {
                  //             cleared[k] = undefined;
                  //           }
                  //         }
                  //       );

                  //       return {
                  //         ...cleared,
                  //         [filterKey]: e.target.checked ? value : null,
                  //         name: label,
                  //         id: item.id || index,
                  //       };
                  //     } else {
                  //       // 🟩 This group is multi-select, but allow only one checkbox per accordion
                  //       if (e.target.checked) {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [value], // replaces any previous selection in same accordion
                  //           name: label,
                  //           id: item.id || index,
                  //         };
                  //       } else {
                  //         return {
                  //           ...prev,
                  //           [filterKey]: [], // clears all when unchecked
                  //         };
                  //       }
                  //     }
                  //   });
                  // }}
                />
              </li>
            );
          })}
        </ul>
      ),
      total: items?.length,
    })
  );

  const fetchReports = async (query: string = ""): Promise<void> => {
    try {
      setLoader(true);
      const res = await api.post("report/list", {
        search_text: query,
        report_type: selectedFilters["Report Type"] || "", //pass report type_slug value
        category_id: selectedFilters["Industry"] || "", // pass category_id,
        regions: selectedFilters["Regions"]?.toString() || "", // pass comma seprated value
        country: selectedFilters["Countries"]?.toString() || "", // pass comma seprated value
      });
      if (query.trim() !== "") {
        setSearchResult(res?.data?.data || []);
        setShowReportList(true);
      } else {
        setReports(res?.data?.data || []);
        setShowReportList(false);
      }
      setLoader(false);
    } catch (err) {
      setAccordionData((prev) => ({ ...prev, Industry: [] }));
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchReports();
    }, 1000);

    const activeKeys = Object.entries(selectedFilters)
      .filter(
        ([key, value]) =>
          key !== "name" &&
          key !== "id" &&
          value &&
          (Array.isArray(value) ? value.length > 0 : value !== null)
      )
      .map(([key]) => key);

    if (activeKeys.length > 0 && selectedFilters.name) {
      setSelectedHeading(selectedFilters.name as string);
    } else {
      setSelectedHeading("");
    }
  }, [selectedFilters]);
  useEffect(() => {
    setLoader(true); // 🔥 show loader when filters changed

    const timer = setTimeout(() => {
      fetchReports();
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedFilters]);

  useEffect(() => {
    if (searchText.length >= 3 || searchText.length === 0) {
      const handler = setTimeout(() => {
        fetchReports(searchText);
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [searchText]);

  const handleClear = () => {
    setSearchText("");
    setSearchResult([]);
    setShowReportList(false);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const submitFormData = async (query: string = ""): Promise<void> => {
  //   const payload = {
  //     name: formData.name,
  //     country_code: formData.dialCode,
  //     phone: formData.phoneNumber,
  //     email: formData.email,
  //     message: formData.comment,
  //     report_id: formData.id,
  //   };
  //   try {
  //     const res = await api.post("report/save-ask-analyst", {
  //       ...payload,
  //     });
  //     toast.success("Saved successfully!");

  //     console.log(res, ";ihvdfhvj");
  //   } catch (err:any) {
  //     console.log(err, 'ivhjjh');
  //     toast.error(err?.response?.data?.message || "Something went wrong!");
  //   }
  // };

  const submitFormData = async (query: string = ""): Promise<void> => {
    const { name, dialCode, phoneNumber, email, comment, id } = formData;
    // Validate required fields
    if (!name || !dialCode || !phoneNumber || !email || !comment || !id) {
      toast.error("Please fill all required fields!");
      return;
    }

    const payload = {
      name,
      country_code: dialCode,
      phone: phoneNumber,
      email,
      message: comment,
      report_id: id,
    };

    try {
      const res = await api.post("report/save-ask-analyst", payload);

      toast.success("Saved successfully!");
      console.log(res, ";ihvdfhvj");
    } catch (err: any) {
      console.log(err, "ivhjjh");
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSubmit = () => {
    if (!captchaToken) {
      toast.error("Please verify the captcha.");
      return;
    } else {
      submitFormData();
    }
  };

  // const fetchUpcomingReports = async (query: string = ""): Promise<void> => {
  //   try {
  //     const res = await api.post("report/upcoming-reports");
  //     console.log(res, "iyvghvg");
  //   } catch (err) {}
  // };
  // console.log(fetchUpcomingReports());
  const [captchaTheme, setCaptchaTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    // Read theme class from <html class="dark"> or <html>
    if (document.documentElement.classList.contains("dark")) {
      setCaptchaTheme("dark");
    } else {
      setCaptchaTheme("light");
    }
  }, []);

  return (
    <ProtectedRoute>
      <>
        <div className="p-10 flex justify-center">
          {open && (
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 px-4">
              <div className="bg-white dark:bg-gray-900 w-full max-w-2xl p-6 rounded-2xl shadow-xl overflow-visible">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Ask an Analyst
                </h2>

                <div className="space-y-4">
                  {/* Name + Email in a row on large screens */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Phone No
                    </label>
                    <PhoneInput
                      country="us"
                      value={formData.phone}
                      onChange={(value, country: any) => {
                        const dialCode = country.dialCode;
                        const localNumber = value.replace(dialCode, "");
                        setFormData({
                          ...formData,
                          phone: value,
                          phoneNumber: localNumber,
                          dialCode: country?.dialCode,
                        });
                      }}
                      containerClass="!w-full"
                      inputClass="!w-full border border-gray-300 dark:border-gray-700 !rounded-xl !h-12 !text-gray-900 dark:!text-gray-100 !bg-white dark:!bg-gray-800 !text-base pl-[52px]"
                      buttonClass="border border-gray-300 dark:border-gray-700 !rounded-l-xl !h-12 dark:!bg-gray-800"
                      dropdownClass="!bg-white dark:!bg-gray-800 !text-black dark:!text-white !z-[9999]"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Comment
                    </label>
                    <textarea
                      value={formData.comment}
                      name="comment"
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="Write your comment"
                    ></textarea>
                  </div>

                  {/* Captcha */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      sitekey="6LdrrhMsAAAAAI_B03GK4E2yL9WI1UJTPzJk6v8Y"
                      onChange={(token: any) => setCaptchaToken(token)}
                      theme="light"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="report-listing mb-[50]">
          <div className="container mx-auto">
            <div className="search-dv relative mt-[50]">
              <input
                type="text"
                value={searchText}
                placeholder="Search Reports"
                className="w-full h-10 bg-white dark:bg-gray-800 border border-[#dddfe3] rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#99a1af"
                className="absolute top-3 left-3"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              {showReportList && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#99a1af"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="absolute top-2.5 right-3 w-5 h-5 cursor-pointer hover:text-gray-600"
                  onClick={() => handleClear()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {showReportList && (
                <div className="absolute top-10 left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-96 overflow-y-auto">
                  {searchResult && searchResult?.length > 0 ? (
                    searchResult?.map((item) => (
                      <a
                        key={item.report_id}
                        href={`/outlook/${item.url}/${item?.default_location}`} // or adjust if your route differs
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-200"
                      >
                        {item.short_title}
                      </a>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No reports found.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex mt-[50px]">
              {selectedHeading && (
                <div className="flex items-center justify-between w-fit min-w-[220px] px-3 py-1 rounded-md border border-gray-300 bg-white shadow-sm text-sm font-medium text-gray-800 ml-auto">
                  <span>{selectedHeading}</span>
                  <button className="ml-2 text-red-500 hover:text-red-700 text-base font-bold">
                    ×
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 mt-[50]">
              <div className="lg:col-span-3 md:col-span-4">
                <div className="report-list-sidebar sticky top-[10]">
                  {/* -------------Sidebar-------------- */}
                  <div className="w-full divide-y divide-gray-200">
                    {accordionItems.map((item, index) => {
                      console.log(accordionItems, "dfgdsf");

                      const isActive = openIndex === index;
                      return (
                        <div key={index}>
                          <button
                            onClick={() => {
                              console.log(index, item, "ougyuyuvu");
                              if (item.title === "Upcoming Reports") {
                                router.push("/upcoming-reports"); // ✅ Correct navigation
                                return;
                              }
                              toggle(index);
                            }}
                            className={`flex w-full justify-between items-center px-4 py-2 bg-[#EFF6FF] text-[#05014A] text-[18px] font-medium text-left ${
                              isActive
                                ? ""
                                : "text-[#05014A] hover:bg-[#EFF6FF]"
                            }`}
                          >
                            <span>{item.title}</span>
                            <div className="flex items-center">
                              {!isActive ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-down-icon lucide-chevron-down"
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-up-icon lucide-chevron-up"
                                >
                                  <path d="m18 15-6-6-6 6" />
                                </svg>
                              )}

                              <span className="bg-[#FF472E] text-white px-1 rounded-xl text-[12px] ml-1">
                                {/* {accordionItems?.length>0 ? accordionItems.content :'00'} */}
                                {item?.total ?? "00"}
                              </span>
                            </div>
                          </button>
                          <div
                            className={`px-0 py-0 transition-all duration-300 text-gray-600 ${
                              isActive ? "block" : "hidden"
                            }`}
                          >
                            <div className="text-sm">{item.content}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-9 md:col-span-8">
                <div className="report-lists">
                  {/* -------------Report List Card-------------- */}
                  {loader ? (
                    // <div
                    //   role="status"
                    //   className="flex items-center justify-center h-56 rounded-base animate-pulse bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                    // >
                    //   <svg
                    //     className="w-11 h-11"
                    //     aria-hidden="true"
                    //     fill="none"
                    //     viewBox="0 0 24 24"
                    //   >
                    //     <path
                    //       stroke="currentColor"
                    //       stroke-linejoin="round"
                    //       stroke-width="2"
                    //       d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM9 12h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Zm5.697 2.395v-.733l1.269-1.219v2.984l-1.268-1.032Z"
                    //     />
                    //   </svg>

                    //   <span className="sr-only">Loading...</span>
                    // </div>
                    <div className="flex justify-between gap-6 p-6 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse">
                      {/* LEFT CONTENT */}
                      <div className="flex-1 space-y-4">
                        {/* Email Icon */}
                        <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded" />

                        {/* Paragraph lines */}
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                          <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
                          <div className="h-3 w-4/6 bg-gray-300 dark:bg-gray-700 rounded" />
                          <div className="h-3 w-3/6 bg-gray-300 dark:bg-gray-700 rounded" />
                        </div>

                        {/* Title */}
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

                        {/* Footer buttons */}
                        <div className="flex gap-6 pt-2">
                          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
                        </div>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="w-40 h-56 bg-gray-300 dark:bg-gray-700 rounded-md" />
                    </div>
                  ) : reports.length > 0 ? (
                    reports.map((report, index) => {
                      console.log(report, "ugcghvhg");

                      return (
                        <div
                          className="report-list-card bg-white  dark:bg-gray-800 lg:px-[20] md:px-[25px] px-4 py-[40] mb-[30] border border-[#dddfe3]"
                          key={index}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-9 bg-white dark:bg-gray-800">
                              <div className="card-top-heading flex items-center mb-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  // viewBox="0 0 24 24"
                                  viewBox="0 0 34 24"
                                  fill="#0d7000"
                                  stroke="currentColor"
                                >
                                  <g mask="url(#mask0_256_46140)">
                                    <path
                                      d="M26.486 22.124L21.2988 17.7843L23.1652 16.2229L26.486 18.9952L33.1535 13.4229L35.0199 14.9843L26.486 22.124ZM21.7646 10.9088L31.2411 6.07019H12.2881L21.7646 10.9088ZM21.7646 13.0941L12.2881 8.25552V17.9267H18.1151L20.8344 20.2017H12.2881C11.5354 20.2017 10.894 19.98 10.3639 19.5365C9.83388 19.093 9.56885 18.5564 9.56885 17.9267V6.07019C9.56885 5.44047 9.8339 4.90387 10.364 4.46039C10.8941 4.01691 11.5355 3.79517 12.2881 3.79517H31.2411C31.9938 3.79517 32.6352 4.01691 33.1653 4.46039C33.6954 4.90387 33.9604 5.44047 33.9604 6.07019V9.94192L31.2411 12.2169V8.25552L21.7646 13.0941Z"
                                      fill="#05014A"
                                    />
                                  </g>
                                </svg>
                                <span className="ml-2 text-[#05014A]">
                                  Email Delivery :{" "}
                                  {selectedHeading &&
                                    selectedHeading?.replace("Reports", "")}
                                  {/* {report?.report_type} */}
                                </span>
                              </div>
                              <p className="text-[17px] leading-[1.5]">
                                {report?.short_description}
                              </p>
                              <hr className="w-[70px] text-[var(--primary-color)] border-1 my-2" />
                              <h4 className="md:text-[18px] text-[16px] font-semibold mt-5 lg:mb-[50px] md:mb-[20] mb-5">
                                {report?.short_title}
                              </h4>
                              <div className="link-wrap flex flex-wrap">
                                <Link
                                  href={{
                                    pathname:
                                      "/outlook/" +
                                      report?.url +
                                      "/" +
                                      report?.default_location,
                                  }}
                                  className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mr-[40px] mb-2 flex items-center"
                                >
                                  {/* Buy Now */}
                                  View Report
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
                                    className="lucide lucide-chevron-right-icon lucide-chevron-right bg-[var(--primary-color)] text-white ml-2"
                                  >
                                    <path d="m9 18 6-6-6-6" />
                                  </svg>
                                </Link>
                                <Link
                                  href="#"
                                  className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mr-[40px] mb-2 flex items-center"
                                >
                                  {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-download-icon lucide-download mr-2"
                              >
                                <path d="M12 15V3" />
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <path d="m7 10 5 5 5-5" />
                              </svg>
                              Download Sample */}
                                </Link>
                                {/* <Link
                            href="/ask-an-analyst"
                            className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mb-2 flex items-center"
                          > */}
                                {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-receipt-icon lucide-receipt mr-2"
                          >
                            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                            <path d="M12 17.5v-11" />
                          </svg> */}
                                {/* Ask an Analyst */}
                                {/* Starting Price:{" "}
                          <span className="text-red-600 mx-2">$2199</span>{" "}
                          $1799 */}
                                {/* </Link> */}
                                <a
                                  onClick={() => {
                                    setOpen(true);
                                    setFormData({
                                      ...formData,
                                      id: report.report_id,
                                    });
                                  }}
                                  className="cursor-pointer text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mb-2 flex items-center"
                                >
                                  Ask an Analyst
                                </a>
                              </div>
                            </div>
                            <div className="lg:col-span-3 bg-white dark:bg-gray-800 lg:block md:hidden hidden">
                              <Image
                                src="/assets/images/rd.png"
                                className="max-w-full"
                                width={185}
                                height={240}
                                alt="icon"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="report-list-card bg-white dark:bg-gray-800 px-0 py-[100] mb-[30] border border-[#dddfe3]"
                      key={0}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-0">
                        <div className="lg:col-span-12 bg-white dark:bg-gray-800">
                          <div className="card-top-heading flex items-center justify-center mb-0">
                            <p className="text-center text-[18px] font-medium m-0">
                              No data found
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div className="report-list-card bg-white  dark:bg-gray-800 lg:px-[20] md:px-[25px] px-4 py-[40] mb-[30] border border-[#dddfe3]">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-9 bg-white dark:bg-gray-800">
                    <div className="card-top-heading flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#0d7000"
                      >
                        <g mask="url(#mask0_256_46140)">
                          <path
                            d="M26.486 22.124L21.2988 17.7843L23.1652 16.2229L26.486 18.9952L33.1535 13.4229L35.0199 14.9843L26.486 22.124ZM21.7646 10.9088L31.2411 6.07019H12.2881L21.7646 10.9088ZM21.7646 13.0941L12.2881 8.25552V17.9267H18.1151L20.8344 20.2017H12.2881C11.5354 20.2017 10.894 19.98 10.3639 19.5365C9.83388 19.093 9.56885 18.5564 9.56885 17.9267V6.07019C9.56885 5.44047 9.8339 4.90387 10.364 4.46039C10.8941 4.01691 11.5355 3.79517 12.2881 3.79517H31.2411C31.9938 3.79517 32.6352 4.01691 33.1653 4.46039C33.6954 4.90387 33.9604 5.44047 33.9604 6.07019V9.94192L31.2411 12.2169V8.25552L21.7646 13.0941Z"
                            fill="#05014A"
                          />
                        </g>
                      </svg>
                      <span className="ml-2 text-[#05014A]">
                        Email Delivery
                      </span>
                    </div>
                    <p className="text-[17px] leading-[1.5]">
                      Cross border road freight transport involves activities
                      and infrastructure that facilitate the movement of goods
                      across
                    </p>
                    <hr className="w-[70px] text-[var(--primary-color)] border-1 my-2" />
                    <h4 className="md:text-[18px] text-[16px] font-semibold mt-5 lg:mb-[50px] md:mb-[20] mb-5">
                      United States Cross Border Road Freight Transport Market
                      Report and Forecast 2024-2032
                    </h4>
                    <div className="link-wrap flex flex-wrap">
                      <Link
                        href="#"
                        className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mr-[40px] mb-2 flex items-center"
                      >
                        Buy Now
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
                          className="lucide lucide-chevron-right-icon lucide-chevron-right bg-[var(--primary-color)] text-white ml-2"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mr-[40px] mb-2 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-download-icon lucide-download mr-2"
                        >
                          <path d="M12 15V3" />
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <path d="m7 10 5 5 5-5" />
                        </svg>
                        Download Sample
                      </Link>
                      <Link
                        href="#"
                        className="text-[var(--primary-color)] lg:text-[16px] md:text-[14px] text-[14px] mb-2 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-receipt-icon lucide-receipt mr-2"
                        >
                          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                          <path d="M12 17.5v-11" />
                        </svg>
                        Starting Price:{" "}
                        <span className="text-red-600 mx-2">$2199</span> $1799
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-3 bg-white dark:bg-gray-800 lg:block md:hidden hidden">
                    <Image
                      src="/assets/images/rd.png"
                      className="max-w-full"
                      width={185}
                      height={240}
                      alt="icon"
                    />
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default page;
