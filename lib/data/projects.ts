import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "HRMS Platform",
    description: "Building a comprehensive HRMS system with work log tracking",
    status: "Active",
    startDate: "2024-01-15",
    team: ["emp-001", "emp-004", "emp-007"],
    manager: "John Smith",
    progress: 65,
  },
  {
    id: "proj-002",
    name: "Mobile App Development",
    description: "Creating a mobile application for employee self-service",
    status: "Active",
    startDate: "2024-03-01",
    team: ["emp-001", "emp-003"],
    manager: "Mike Chen",
    progress: 40,
  },
  {
    id: "proj-003",
    name: "Data Analytics Dashboard",
    description: "Building analytics dashboards for HR insights",
    status: "Active",
    startDate: "2024-02-10",
    team: ["emp-009"],
    manager: "Jane Doe",
    progress: 75,
  },
  {
    id: "proj-004",
    name: "Marketing Campaign Q1",
    description: "Digital marketing campaign for Q1 2024",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    team: ["emp-008"],
    manager: "Maria Garcia",
    progress: 100,
  },
  {
    id: "proj-005",
    name: "Infrastructure Upgrade",
    description: "Upgrading cloud infrastructure and DevOps pipeline",
    status: "Active",
    startDate: "2024-02-15",
    team: ["emp-004"],
    manager: "John Smith",
    progress: 55,
  },
  {
    id: "proj-006",
    name: "Sales CRM Integration",
    description: "Integrating new CRM system with existing tools",
    status: "Active",
    startDate: "2024-03-20",
    team: ["emp-010"],
    manager: "Sales Director",
    progress: 30,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((proj) => proj.id === id);
}

export function getProjectsByEmployee(employeeId: string): Project[] {
  return projects.filter((proj) => proj.team.includes(employeeId));
}

export function getActiveProjects(): Project[] {
  return projects.filter((proj) => proj.status === "Active");
}
