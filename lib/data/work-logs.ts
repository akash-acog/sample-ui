import type { WorkLog } from "./types";

export const workLogs: WorkLog[] = [
  // Sarah Johnson's logs
  {
    id: "log-001",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    projectId: "proj-001",
    projectName: "HRMS Platform",
    date: "2026-01-12",
    startTime: "09:00",
    endTime: "12:30",
    hours: 3.5,
    description: "Implemented employee work log tracking feature with timestamp support",
    status: "Completed",
    createdAt: "2026-01-12T09:00:00Z",
    updatedAt: "2026-01-12T12:30:00Z",
  },
  {
    id: "log-002",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    projectId: "proj-001",
    projectName: "HRMS Platform",
    date: "2026-01-12",
    startTime: "14:00",
    endTime: "17:30",
    hours: 3.5,
    description: "Built role-based access control for work logs page",
    status: "In Progress",
    createdAt: "2026-01-12T14:00:00Z",
    updatedAt: "2026-01-12T17:30:00Z",
  },
  {
    id: "log-003",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    date: "2026-01-11",
    startTime: "09:30",
    endTime: "13:00",
    hours: 3.5,
    description: "Designed mobile UI components for employee dashboard",
    status: "Completed",
    createdAt: "2026-01-11T09:30:00Z",
    updatedAt: "2026-01-11T13:00:00Z",
  },
  // Mike Chen's logs
  {
    id: "log-004",
    employeeId: "emp-002",
    employeeName: "Mike Chen",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    date: "2026-01-12",
    startTime: "10:00",
    endTime: "12:00",
    hours: 2,
    description: "Product planning and roadmap review for mobile app",
    status: "Completed",
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-01-12T12:00:00Z",
  },
  {
    id: "log-005",
    employeeId: "emp-002",
    employeeName: "Mike Chen",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    date: "2026-01-12",
    startTime: "14:00",
    endTime: "16:30",
    hours: 2.5,
    description: "Stakeholder meeting and feature prioritization",
    status: "Completed",
    createdAt: "2026-01-12T14:00:00Z",
    updatedAt: "2026-01-12T16:30:00Z",
  },
  // Emily Davis's logs
  {
    id: "log-006",
    employeeId: "emp-003",
    employeeName: "Emily Davis",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    date: "2026-01-12",
    startTime: "09:00",
    endTime: "17:00",
    hours: 8,
    description: "Created high-fidelity mockups for employee work log interface",
    status: "Completed",
    createdAt: "2026-01-12T09:00:00Z",
    updatedAt: "2026-01-12T17:00:00Z",
  },
  // David Kim's logs
  {
    id: "log-007",
    employeeId: "emp-009",
    employeeName: "David Kim",
    projectId: "proj-003",
    projectName: "Data Analytics Dashboard",
    date: "2026-01-12",
    startTime: "09:30",
    endTime: "12:30",
    hours: 3,
    description: "Built SQL queries for work log analytics and reporting",
    status: "Completed",
    createdAt: "2026-01-12T09:30:00Z",
    updatedAt: "2026-01-12T12:30:00Z",
  },
  {
    id: "log-008",
    employeeId: "emp-009",
    employeeName: "David Kim",
    projectId: "proj-003",
    projectName: "Data Analytics Dashboard",
    date: "2026-01-12",
    startTime: "14:00",
    endTime: "18:00",
    hours: 4,
    description: "Created visualization charts for employee productivity metrics",
    status: "In Progress",
    createdAt: "2026-01-12T14:00:00Z",
    updatedAt: "2026-01-12T18:00:00Z",
  },
  // James Wilson's logs
  {
    id: "log-009",
    employeeId: "emp-004",
    employeeName: "James Wilson",
    projectId: "proj-005",
    projectName: "Infrastructure Upgrade",
    date: "2026-01-10",
    startTime: "08:00",
    endTime: "16:00",
    hours: 8,
    description: "Migrated databases to new cloud infrastructure",
    status: "Completed",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-01-10T16:00:00Z",
  },
];

export function getWorkLogsByEmployee(employeeId: string): WorkLog[] {
  return workLogs.filter((log) => log.employeeId === employeeId);
}

export function getWorkLogsByProject(projectId: string): WorkLog[] {
  return workLogs.filter((log) => log.projectId === projectId);
}

export function getWorkLogsByDate(date: string): WorkLog[] {
  return workLogs.filter((log) => log.date === date);
}

export function getTodayWorkLogs(): WorkLog[] {
  const today = new Date().toISOString().split('T')[0];
  return getWorkLogsByDate(today);
}

export function getWorkLogsByDateRange(startDate: string, endDate: string): WorkLog[] {
  return workLogs.filter(
    (log) => log.date >= startDate && log.date <= endDate
  );
}
