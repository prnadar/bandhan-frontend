/**
 * Typed API client — wraps axios with auth token injection.
 * All calls go through /api/v1 prefix.
 */
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    timeout: 15_000,
    headers: { "Content-Type": "application/json" },
  });

  // Inject Auth0 access token from session cookie
  client.interceptors.request.use(async (config) => {
    if (typeof window !== "undefined") {
      const { getAccessToken } = await import("@auth0/nextjs-auth0/edge");
      try {
        const { accessToken } = await getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        // Not authenticated — public route
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response?.status;
      if (status === 401) {
        window.location.href = "/api/auth/login";
      }
      return Promise.reject(err);
    }
  );

  return client;
}

export const api = createApiClient();

// ── Typed API calls ───────────────────────────────────────────────────────────
export const authApi = {
  register: (phone: string, countryCode = "+91") =>
    api.post("/auth/register", { phone, country_code: countryCode }),

  verifyOtp: (phone: string, otp: string) =>
    api.post("/auth/verify-otp", { phone, otp }),
};

export const matchApi = {
  getDailyMatches: () => api.get("/matches/daily"),
  sendInterest: (receiverId: string, superInterest = false, message?: string) =>
    api.post(`/interests/${receiverId}`, {
      receiver_id: receiverId,
      is_super_interest: superInterest,
      message,
    }),
  getReceivedInterests: (page = 1) =>
    api.get(`/interests/received?page=${page}`),
  submitQuiz: (responses: Record<string, number>) =>
    api.post("/quiz/submit", { responses }),
};

export const profileApi = {
  getProfile: (userId: string) => api.get(`/profile/${userId}`),
  updateProfile: (userId: string, data: Record<string, unknown>) =>
    api.put(`/profile/${userId}`, data),
  getPhotoUploadUrl: (contentType: string) =>
    api.post(`/profile/photos/upload-url?content_type=${contentType}`),
};

export const chatApi = {
  listThreads: (page = 1) => api.get(`/chats?page=${page}`),
  getMessages: (threadId: string, page = 1) =>
    api.get(`/chats/${threadId}/messages?page=${page}`),
};

export const subscriptionApi = {
  createSubscription: (plan: string, gateway = "razorpay") =>
    api.post("/subscriptions/create", { plan, gateway }),
  getLimits: () => api.get("/subscriptions/limits"),
};
