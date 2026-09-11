export type VisitorStatus = "Pending" | "Approved" | "Rejected";

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
  status: VisitorStatus;
}

export interface VisitorPayload {
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
}

export interface AuthUser {
  email: string;
}
