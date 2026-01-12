export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
  startDate: string;
  endDate: string;
  progress: number;
  manager: string;
  managerId: string;
  team: string[];
  budget?: number;
  spent?: number;
  client?: string;
}

export interface ProjectAllocation {
  id: string;
  projectId: string;
  projectName: string;
  employeeId: string;
  employeeName: string;
  role: string;
  allocation: number; // percentage
  startDate: string;
  endDate?: string;
  billable: boolean;
}

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "E-commerce Platform Redesign",
    description: "Complete redesign of the e-commerce platform with new features",
    status: "In Progress",
    priority: "High",
    startDate: "2025-11-01",
    endDate: "2026-03-31",
    progress: 65,
    manager: "John Smith",
    managerId: "emp-006",
    team: ["emp-001", "emp-003", "emp-010"],
    budget: 250000,
    spent: 162500,
    client: "Retail Corp",
  },
  {
    id: "proj-002",
    name: "Mobile App Development",
    description: "Native mobile app for iOS and Android",
    status: "In Progress",
    priority: "Critical",
    startDate: "2025-12-15",
    endDate: "2026-05-30",
    progress: 40,
    manager: "Jane Doe",
    managerId: "emp-007",
    team: ["emp-001", "emp-002", "emp-005"],
    budget: 400000,
    spent: 160000,
    client: "FinTech Solutions",
  },
  {
    id: "proj-003",
    name: "Data Analytics Dashboard",
    description: "Real-time analytics dashboard for business intelligence",
    status: "Planning",
    priority: "Medium",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
    progress: 15,
    manager: "John Smith",
    managerId: "emp-006",
    team: ["emp-003"],
    budget: 150000,
    spent: 22500,
  },
  {
    id: "proj-004",
    name: "Customer Portal Enhancement",
    description: "Adding self-service features to customer portal",
    status: "In Progress",
    priority: "High",
    startDate: "2025-10-01",
    endDate: "2026-02-28",
    progress: 80,
    manager: "Jane Doe",
    managerId: "emp-007",
    team: ["emp-004", "emp-005", "emp-010"],
    budget: 180000,
    spent: 144000,
    client: "SaaS Company",
  },
  {
    id: "proj-005",
    name: "Legacy System Migration",
    description: "Migrating legacy systems to cloud infrastructure",
    status: "On Hold",
    priority: "Medium",
    startDate: "2025-09-01",
    endDate: "2026-08-31",
    progress: 30,
    manager: "John Smith",
    managerId: "emp-006",
    team: ["emp-002"],
    budget: 500000,
    spent: 150000,
  },
  {
    id: "proj-006",
    name: "AI Chatbot Integration",
    description: "Implementing AI-powered customer support chatbot",
    status: "Completed",
    priority: "Low",
    startDate: "2025-06-01",
    endDate: "2025-12-15",
    progress: 100,
    manager: "Jane Doe",
    managerId: "emp-007",
    team: ["emp-001", "emp-004"],
    budget: 120000,
    spent: 115000,
    client: "E-commerce Inc",
  },
];

export const projectAllocations: ProjectAllocation[] = [
  {
    id: "alloc-001",
    projectId: "proj-001",
    projectName: "E-commerce Platform Redesign",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    role: "Lead Developer",
    allocation: 80,
    startDate: "2025-11-01",
    billable: true,
  },
  {
    id: "alloc-002",
    projectId: "proj-001",
    projectName: "E-commerce Platform Redesign",
    employeeId: "emp-003",
    employeeName: "David Chen",
    role: "Developer",
    allocation: 100,
    startDate: "2025-11-15",
    billable: true,
  },
  {
    id: "alloc-003",
    projectId: "proj-001",
    projectName: "E-commerce Platform Redesign",
    employeeId: "emp-010",
    employeeName: "Emily Davis",
    role: "UX Designer",
    allocation: 60,
    startDate: "2025-11-01",
    billable: true,
  },
  {
    id: "alloc-004",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    role: "Mobile Developer",
    allocation: 20,
    startDate: "2025-12-15",
    billable: true,
  },
  {
    id: "alloc-005",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    employeeId: "emp-002",
    employeeName: "James Wilson",
    role: "DevOps Engineer",
    allocation: 50,
    startDate: "2025-12-15",
    billable: true,
  },
  {
    id: "alloc-006",
    projectId: "proj-002",
    projectName: "Mobile App Development",
    employeeId: "emp-005",
    employeeName: "Rachel Green",
    role: "Product Designer",
    allocation: 70,
    startDate: "2025-12-15",
    billable: true,
  },
  {
    id: "alloc-007",
    projectId: "proj-003",
    projectName: "Data Analytics Dashboard",
    employeeId: "emp-003",
    employeeName: "David Chen",
    role: "Developer",
    allocation: 0,
    startDate: "2026-02-01",
    billable: false,
  },
  {
    id: "alloc-008",
    projectId: "proj-004",
    projectName: "Customer Portal Enhancement",
    employeeId: "emp-004",
    employeeName: "Mike Chen",
    role: "Product Manager",
    allocation: 100,
    startDate: "2025-10-01",
    billable: true,
  },
  {
    id: "alloc-009",
    projectId: "proj-004",
    projectName: "Customer Portal Enhancement",
    employeeId: "emp-005",
    employeeName: "Rachel Green",
    role: "Product Designer",
    allocation: 30,
    startDate: "2025-10-01",
    billable: true,
  },
  {
    id: "alloc-010",
    projectId: "proj-004",
    projectName: "Customer Portal Enhancement",
    employeeId: "emp-010",
    employeeName: "Emily Davis",
    role: "UX Designer",
    allocation: 40,
    startDate: "2025-10-01",
    billable: true,
  },
  {
    id: "alloc-011",
    projectId: "proj-005",
    projectName: "Legacy System Migration",
    employeeId: "emp-002",
    employeeName: "James Wilson",
    role: "DevOps Engineer",
    allocation: 50,
    startDate: "2025-09-01",
    billable: false,
  },
];
