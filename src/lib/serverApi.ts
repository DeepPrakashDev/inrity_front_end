// // lib/serverApi.ts
// import { cookies } from "next/headers";
// import { api } from "./apiClient";

// export async function serverApi<T = any>(
//   endpoint: string,
//   options: Parameters<typeof api>[1] = {}
// ): Promise<T> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   const headers: Record<string, string> = {
//     ...options?.headers,
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return api<T>(endpoint, { ...options, headers });
// }
