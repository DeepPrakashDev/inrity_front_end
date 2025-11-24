"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import api from "@/lib/apiClient";

type Subcategory = {
  sub_category_name: string;
  link: string;
  subtitle?: string;
};

type Category = {
  title: string;
  id?: number | string;
  link: string;
  subcategories: Subcategory[];
};

type ApiResponse = {
  data: Category[];
  total: number;
};

// If your API returns different keys, define them properly
type RawCategory = {
  category_id: number | string;
  category_name: string;
  link?: string;
  sub_category: Subcategory[];
};

const page: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [total, setTotal] = React.useState<number>(0);
  const [searchedText, setSearchedText] = React.useState<string>("");
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const fetchCategories = async (
    page: number,
    searchText: string = ""
  ): Promise<ApiResponse> => {
    try {
      const res = await api.post<{ data: RawCategory[]; totalItems: number }>(
        "/master/category/list",
        { search_text: searchText },
        { params: { page, limit: 2 } }
      );

      const rawData = res.data.data || [];
      const totalItems = res.data.totalItems || rawData.length || 0;
      console.log(rawData, "rawData");

      const data: Category[] = rawData.map((item) => ({
        title: item.category_name,
        id: item?.category_id,
        link: item.link || "#",
        subcategories: (item.sub_category || []).map((sub) => ({
          sub_category_name: sub.sub_category_name || sub.subtitle || "",
          link: sub.link || "#",
        })),
      }));

      return { data, total: totalItems };
    } catch (err) {
      console.error("API failed, using mock data:", err);

      // Return empty data on error
      return { data: [], total: 0 };
    }
  };

  const loadMore = async (searchValue?: string) => {
    if (loading) return;
    if (total && categories.length >= total) return;

    setLoading(true);
    const value = searchValue !== undefined ? searchValue : searchedText;
    const res = await fetchCategories(page, value);
    // setCategories((prev) => [...prev, ...res.data]);
    setCategories((prev) => {
      const existingTitles = new Set(prev.map((c) => c.title));

      const filtered = res.data.filter(
        (item) => !existingTitles.has(item.title)
      );

      return [...prev, ...filtered];
    });

    setPage((prev) => prev + 1);
    setTotal(res.total);
    setLoading(false);
  };

  // Initial load
  React.useEffect(() => {
    loadMore(searchedText ?? "");
  }, []);

  // Infinite scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (bottom && !loading) {
        loadMore(searchedText ?? "");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, categories.length, total]);

  const handleSearchApi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchedText(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setPage(1);
      setCategories([]);
      const res = await fetchCategories(1, value);
      setCategories(res.data);
      setTotal(res.total);
    }, 500);
  };
  console.log(categories, "iyvhjhjv");

  return (
    <>
      <div className="category-listing mb-[50]">
        <div className="container mx-auto">
          <div className="search-dv relative mt-[50]">
            <input
              type="text"
              value={searchedText}
              placeholder="Sectors"
              className="w-full h-10 border border-[#dddfe3] rounded px-4 py-1 pl-10 
             bg-white text-black 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             dark:bg-gray-800 dark:text-white dark:border-gray-600"
              onChange={handleSearchApi}
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
          </div>

          {categories.map((cat, idx) => (
            <ul
              className="categories bg-white rounded-lg mt-[40]  dark:bg-gray-900"
              key={idx}
            >
              <>
                <li className="flex justify-between items-center text-[18px] font-semibold p-4 border border-[#F0F1F2] dark:border-gray-700 rounded-lg">
                  {cat.title}
                  <Link
                    //   href={cat.link}

                    href={{
                      pathname: "/reports",
                      // query: { category: cat.title}, // 👈 attach your data here
                      query: {
                        category: cat.title.toLowerCase().replace(/ /g, "_"),
                        catId: cat?.id ?? undefined,
                      }, // 👈 attach your data here
                    }}
                    className="text-[12px] font-normal underline text-[var(--primary-color)]"
                  >
                    View All Reports
                  </Link>
                </li>
                {cat.subcategories.map((sub, subIdx) => (
                  <li
                    className="flex justify-between items-center text-[13px] p-4 border border-[#F0F1F2] dark:border-gray-700 rounded-lg"
                    key={subIdx}
                  >
                    {sub?.sub_category_name}
                    <Link
                      href="#"
                      className="text-[13px] underline text-[var(--primary-color)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-move-up-right"
                      >
                        <path d="M13 5H19V11" />
                        <path d="M19 5L5 19" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </>
            </ul>
          ))}

          {loading && <p className="text-center py-4">Loading...</p>}
        </div>
      </div>
    </>
  );
};

export default page;
