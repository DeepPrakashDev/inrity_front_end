"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/UserAuthContext";
import api from "@/lib/apiClient";
import React from "react";
import Image from "next/image";

const page = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // console.log("userName typed: ", userName);


    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ userName, password }),
    // });

    // if (!res.ok) {
    //   const data = await res.json();
    //   setError(data.error || "Login failed");
    //   return;
    // }

    // // Redirect to projects page after successful login
    // router.push("/projects");
    try {
      // Call backend API using Axios instance
      const res = await api.post("client/login", {
        email: userName,
        password,
      });

      const { token, refreshToken, data } = res.data;
      console.log("token :", token);
      console.log("refreshToken :", refreshToken);
      console.log("data :", data);
      login(token);
      // return;

      router.replace("/reports");
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="login-main h-[100vh] flex justify-center items-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-5 md:col-start-4">
              <div className="login-box bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-lg lg:p-[60px] p-[40px]">
                <Image
                  src="/assets/images/logo.png"
                  className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 mb-5"
                  width={150}
                  height={40}
                  alt="logo"
                />
                <h3 className="text-center text-[20px] font-bold mb-[20]">
                  Login
                </h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="" className="block text-[14px] mb-1">
                      Username
                    </label>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      className="w-full text-[15px] border border-[#d1d1d1] outline-0 p-1"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="block text-[14px] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      //   type="password"
                      className="w-full text-[15px] border border-[#d1d1d1] outline-0 p-1"
                      placeholder="Enter password"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-[13px] mb-3">{error}</p>
                  )}
                  <button
                    // type="button"
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-black text-white py-1 rounded-sm cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
