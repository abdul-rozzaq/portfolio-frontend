import axios from "axios";

/**
 * Pre-configured Axios instance for all API calls.
 * Reads the base URL from the NEXT_PUBLIC_API_URL env variable.
 */
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10_000,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                `[API Error] ${error.response.status}: ${error.response.config?.url}`
            );
        } else if (error.request) {
            console.error("[API Error] No response received:", error.request);
        } else {
            console.error("[API Error]", error.message);
        }
        return Promise.reject(error);
    }
);


export const buildAbsoluteUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL!.replace(/\/$/, "")}${path}`;
}

export default apiClient;
