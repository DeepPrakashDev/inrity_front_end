// // api.ts
// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// // import { redirectToLogin } from "../LoginPage.js/navigationService";

// // Function to get cookie by name (built-in, no library)
// function getCookie(name: string): string | null {
//   if (typeof document === "undefined") return null; // SSR-safe
//   const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
//   return match ? decodeURIComponent(match[2]) : null;
// }

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor: attach token from cookies
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie("_auth"); // get token from browser cookie
//     if (token) {
//       if (config.headers) {
//         // If headers is an AxiosHeaders instance, use set; otherwise, assign directly
//         if (typeof (config.headers as any).set === "function") {
//           (config.headers as any).set("Authorization", `Bearer ${token}`);
//         } else {
//           (config.headers as Record<string, string>)[
//             "Authorization"
//           ] = `Bearer ${token}`;
//         }
//       } else {
//         config.headers = { Authorization: `Bearer ${token}` } as any;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: handle 401 globally
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       //   redirectToLogin(); // handle unauthorized globally
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Function to get cookie by name (built-in, no library)
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR-safe
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Extend AxiosRequestConfig to allow apiKey
import type { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  apiKey?: string; // optional API key for requests
}

// Request interceptor: attach token from cookies or API key from env
axiosInstance.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    // Axios v1+ ensures headers is always defined and is an AxiosHeaders instance
    const apiKey = config.apiKey || process.env.NEXT_PUBLIC_API_KEY;
    const token = getCookie("_auth");
    if (token) {
      config.headers.set?.("Authorization", `Bearer ${token}`);
    } else {
      config.headers.set?.("x-auth-token", apiKey);
      config.headers.delete?.("Authorization");
    }

    // if (apiKey) {
    //   config.headers.set?.("x-auth-token", apiKey);
    //   config.headers.delete?.("Authorization");
    // } else {
    //   if (token) {
    //     config.headers.set?.("Authorization", `Bearer ${token}`);
    //   }
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // redirectToLogin(); // handle unauthorized globally
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
