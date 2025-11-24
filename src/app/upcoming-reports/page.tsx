"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/apiClient";

type Report = {
  id?: string;
  report_id?: string;
  title?: string;
  short_title?: string;
  short_description?: string;
  url?: string;
  dueDate?: string;
  owner?: string;
  status?: "pending" | "in_progress" | "done";
};

const mockReports: Report[] = [
  {
    id: "r1",
    title: "Q2 Financial Overview",
    dueDate: "2025-06-10",
    owner: "Alice",
    status: "pending",
  },
  {
    id: "r2",
    title: "Customer Satisfaction Survey",
    dueDate: "2025-06-18",
    owner: "Product",
    status: "in_progress",
  },
  {
    id: "r3",
    title: "Security Audit Summary",
    dueDate: "2025-07-01",
    owner: "Security",
    status: "pending",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Page() {
  const [data, setData] = useState<Report[]>([]);
  const fetchUpcomingReports = async (query: string = ""): Promise<void> => {
    try {
      const res = await api.post("report/upcoming-reports");
      setData(res?.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUpcomingReports();
  }, []);
  // console.log(fetchUpcomingReports());
  return (
    <main className="p-6 text-slate-900 dark:text-slate-100 font-inter">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold">Upcoming Reports</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Reports scheduled in the coming weeks
        </p>
      </header>

      {/* List Section */}
      <section className="grid gap-3">
        {data?.length === 0 ? (
          <div className="p-5 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 text-center">
            No upcoming reports
          </div>
        ) : (
          data?.map((r) => (
            <article
              key={r?.report_id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
            >
              <div>
                <h2 className="text-base font-medium">{r?.short_title}</h2>

                <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {r?.short_description}
                  {/* <span>Due: {formatDate(r.dueDate)}</span> */}
                  {r.owner && <span>Owner: {r.owner}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* <span
                  className={`px-3 py-1 text-xs rounded-full capitalize font-medium ${statusColor(
                    r.status
                  )}`}
                >
                  {r.status}
                </span> */}

                <a
                  href={r?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View
                </a>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function statusColor(status?: Report["status"]) {
  switch (status) {
    case "done":
      return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300";
    case "in_progress":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300";
    case "pending":
    default:
      return "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300";
  }
}
