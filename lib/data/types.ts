// Employee Data
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
  manager: string;
  phone: string;
  location: string;
}

// Work Log Entry (Daily Reports)
export interface WorkLog {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  description: string;
  status: "In Progress" | "Completed" | "Blocked";
  createdAt: string;
  updatedAt: string;
}

// Project Data
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "On Hold" | "Completed" | "Cancelled";
  startDate: string;
  endDate?: string;
  team: string[];
  manager: string;
  progress: number;
}

// Leave Request
export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: "Casual" | "Sick" | "Annual" | "Unpaid";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
}

// Leave Balance
export interface LeaveBalance {
  employeeId: string;
  casual: number;
  sick: number;
  annual: number;
  used: {
    casual: number;
    sick: number;
    annual: number;
  };
}

// Department
export interface Department {
  id: string;
  name: string;
  headOfDepartment: string;
  employeeCount: number;
}

// Team
export interface Team {
  id: string;
  name: string;
  department: string;
  manager: string;
  members: string[];
}
