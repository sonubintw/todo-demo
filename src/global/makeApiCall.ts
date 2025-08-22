import axios, { Method } from "axios";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

export const makeApiCall = async <T = any>(
  method: Method,
  url: string,
  options: any = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      method,
      url,
      ...options, // supports params, data, headers, etc.
    });
    // console.log(`API Call: ${method} ${url}`, response.data);
    
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message || "error bole",
      status: error.response?.status,
    };
  }
};
