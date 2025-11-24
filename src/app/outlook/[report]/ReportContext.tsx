"use client";
import { createContext, useContext } from "react";

export type ReportContextType = {
    // reportSlug: string;
    reportId?: number | null;
    short_codes?: Record<string, any> | null;
    market_values?: Record<string, any> | null;
    basic_trend_data?: Record<string, any> | null;
    // loading: boolean;
    // refresh?: () => void;
};

const ReportContext = createContext<ReportContextType | null>(null);

export const useReport = () => {
    const ctx = useContext(ReportContext);
    if (!ctx) throw new Error("useReport must be used inside ReportProvider");
    return ctx;
};

export function ReportProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: ReportContextType;
}) {
    return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
}
