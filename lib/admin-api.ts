/**
 * Admin API client — separate from user API.
 * Uses localStorage admin token for auth.
 * Falls back to mock data when API returns 404.
 */
import axios, { type AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function createAdminClient(): AxiosInstance {
  const client = axios.create({
    baseURL: `${BASE_URL}/api/v1/admin`,
    timeout: 15_000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
      }
      return Promise.reject(err);
    }
  );

  return client;
}

export const adminApi = createAdminClient();

// ── Helper: call API with mock fallback ─────────────────────────────────────
export async function withMockFallback<T>(
  apiCall: () => Promise<{ data: T }>,
  mockData: T
): Promise<T> {
  try {
    const res = await apiCall();
    return res.data;
  } catch {
    return mockData;
  }
}

// ── Admin Auth ──────────────────────────────────────────────────────────────
export const adminAuthApi = {
  login: (email: string, password: string) =>
    adminApi.post("/auth/login", { email, password }),
};

// ── Dashboard ───────────────────────────────────────────────────────────────
export const adminDashboardApi = {
  getStats: () => adminApi.get("/dashboard/stats"),
  getRecentSignups: () => adminApi.get("/dashboard/recent-signups"),
  getRegistrationChart: () => adminApi.get("/dashboard/registrations-chart"),
};

// ── Profiles ────────────────────────────────────────────────────────────────
export const adminProfilesApi = {
  list: (params: Record<string, string | number>) =>
    adminApi.get("/profiles", { params }),
  getById: (id: string) => adminApi.get(`/profiles/${id}`),
  updateStatus: (id: string, status: string) =>
    adminApi.patch(`/profiles/${id}/status`, { status }),
  bulkUpdateStatus: (ids: string[], status: string) =>
    adminApi.patch("/profiles/bulk-status", { ids, status }),
  create: (data: FormData) =>
    adminApi.post("/profiles", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ── Photos ──────────────────────────────────────────────────────────────────
export const adminPhotosApi = {
  list: (params: Record<string, string | number>) =>
    adminApi.get("/photos", { params }),
  updateStatus: (id: string, status: string) =>
    adminApi.patch(`/photos/${id}/status`, { status }),
};

// ── Subscriptions ───────────────────────────────────────────────────────────
export const adminSubscriptionsApi = {
  list: (params: Record<string, string | number>) =>
    adminApi.get("/subscriptions", { params }),
  extend: (userId: string, days: number) =>
    adminApi.post(`/subscriptions/${userId}/extend`, { days }),
  grant: (userId: string, plan: string, days: number) =>
    adminApi.post(`/subscriptions/${userId}/grant`, { plan, days }),
};

// ── Reports ─────────────────────────────────────────────────────────────────
export const adminReportsApi = {
  list: (params: Record<string, string | number>) =>
    adminApi.get("/reports", { params }),
  takeAction: (id: string, action: string, reason?: string) =>
    adminApi.post(`/reports/${id}/action`, { action, reason }),
};

// ── Settings ────────────────────────────────────────────────────────────────
export const adminSettingsApi = {
  get: () => adminApi.get("/settings"),
  update: (data: Record<string, unknown>) =>
    adminApi.put("/settings", data),
};
