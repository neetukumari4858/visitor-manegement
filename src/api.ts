import axios, { AxiosAdapter, AxiosInstance } from "axios";
import { AuthUser, Visitor, VisitorPayload } from "./types";

const initialVisitors: Visitor[] = [
  {
    id: "v-1001",
    name: "Aarav Mehta",
    phone: "+91 98765 43210",
    unit: "A-1204",
    visitDate: "2026-09-12",
    status: "Pending",
  },
  {
    id: "v-1002",
    name: "Maya Shah",
    phone: "+91 98200 11842",
    unit: "B-804",
    visitDate: "2026-09-13",
    status: "Approved",
  },
  {
    id: "v-1003",
    name: "Kabir Rao",
    phone: "+91 98990 22115",
    unit: "C-302",
    visitDate: "2026-09-14",
    status: "Pending",
  },
  {
    id: "v-1004",
    name: "Ishita Nair",
    phone: "+91 97654 80991",
    unit: "A-607",
    visitDate: "2026-09-10",
    status: "Rejected",
  },
];

let visitorStore = [...initialVisitors];

const mockAdapter: AxiosAdapter = async (config) => {
  await new Promise((resolve) => window.setTimeout(resolve, 380));
  const method = (config.method || "get").toLowerCase();
  const url = config.url || "";
  const id = url.split("/").pop();

  if (method === "post" && url === "/auth/login") {
    return {
      data: { email: "admin@gmail.com" },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  }
  if (method === "get" && url === "/visitors")
    return {
      data: visitorStore,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  if (method === "post" && url === "/visitors") {
    const payload = (
      typeof config.data === "string" ? JSON.parse(config.data) : config.data
    ) as VisitorPayload;
    const visitor = {
      ...payload,
      id: `v-${Date.now()}`,
      status: "Pending" as const,
    };
    visitorStore = [visitor, ...visitorStore];
    return {
      data: visitor,
      status: 201,
      statusText: "Created",
      headers: {},
      config,
    };
  }
  if (method === "delete" && url.startsWith("/visitors/")) {
    visitorStore = visitorStore.filter((visitor) => visitor.id !== id);
    return {
      data: { id },
      status: 204,
      statusText: "No Content",
      headers: {},
      config,
    };
  }
  if (method === "patch" && url.startsWith("/visitors/")) {
    const index = visitorStore.findIndex((visitor) => visitor.id === id);
    if (index === -1) throw new Error("Visitor not found");
    const status = url.endsWith("/approve")
      ? "Approved"
      : url.endsWith("/reject")
        ? "Rejected"
        : undefined;
    visitorStore[index] = {
      ...visitorStore[index],
      ...(status
        ? { status }
        : typeof config.data === "string"
          ? JSON.parse(config.data)
          : config.data),
    };
    return {
      data: visitorStore[index],
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  }
  throw new Error("Mock endpoint not found");
};

const client: AxiosInstance = axios.create({
  baseURL: "/api",
  adapter: mockAdapter,
});

export const authApi = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    if (!email || password.length < 6)
      throw new Error(
        "Enter a valid email and a password with at least 6 characters.",
      );
    const response = await client.post<AuthUser>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
};

export const visitorsApi = {
  list: async () => (await client.get<Visitor[]>("/visitors")).data,
  create: async (payload: VisitorPayload) =>
    (await client.post<Visitor>("/visitors", payload)).data,
  remove: async (id: string) => {
    await client.delete(`/visitors/${id}`);
  },
  updateStatus: async (id: string, status: "approve" | "reject") =>
    (await client.patch<Visitor>(`/visitors/${id}/${status}`)).data,
};
