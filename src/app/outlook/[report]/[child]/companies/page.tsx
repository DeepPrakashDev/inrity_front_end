"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ReportsStatistics from "@/app/components/ReportsStatistics";
import KeyPlayerTable from "@/app/components/KeyPlayerTable";
import { useReport } from "../../ReportContext";
import api from "@/lib/apiClient";

export default function Keyplayers() {
    const { reportId } = useReport();
    const [searchTerm, setSearchTerm] = useState("s");
    const [competetiveData, setCompetetiveData] = useState<any[]>([]);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchCompaniesData = async (): Promise<void> => {
        try {
            const res = await api.post("report/report-competetive-landscape", { id: reportId });
            console.log("competetive data :", res);
            setCompetetiveData(res?.data?.data || []);
        } catch (err) {
            console.error("Failed to load Competetive Landscape Data:", err);
        }
    };

    useEffect(() => {
        if (reportId) {
            fetchCompaniesData();
        }
    }, [reportId]);

    return (
        <>
            <KeyPlayerTable data={competetiveData} />
            <ReportsStatistics />
        </>
    );
}