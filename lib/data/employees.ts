import type { Employee } from "./types";

export const employees: Employee[] = [
  {
    id: "emp-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Developer",
    department: "Engineering",
    team: "Engineering Team A",
    status: "Active",
    joinDate: "2023-01-15",
    manager: "John Smith",
    phone: "+1 234-567-8901",
    location: "New York",
  },
  {
    id: "emp-002",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "Product Manager",
    department: "Product",
    team: "Product Team",
    status: "Active",
    joinDate: "2022-06-20",
    manager: "Jane Doe",
    phone: "+1 234-567-8902",
    location: "San Francisco",
  },
  {
    id: "emp-003",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "UX Designer",
    department: "Design",
    team: "Design Team",
    status: "Active",
    joinDate: "2023-03-10",
    manager: "Jane Doe",
    phone: "+1 234-567-8903",
    location: "Los Angeles",
  },
  {
    id: "emp-004",
    name: "James Wilson",
    email: "james.wilson@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    team: "Engineering Team B",
    status: "On Leave",
    joinDate: "2021-11-05",
    manager: "John Smith",
    phone: "+1 234-567-8904",
    location: "Seattle",
  },
  {
    id: "emp-005",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "HR Manager",
    department: "Human Resources",
    team: "HR Team",
    status: "Active",
    joinDate: "2020-08-12",
    manager: "CEO",
    phone: "+1 234-567-8905",
    location: "Chicago",
  },
  {
    id: "emp-006",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Engineering Manager",
    department: "Engineering",
    team: "Engineering Team A",
    status: "Active",
    joinDate: "2019-05-20",
    manager: "CTO",
    phone: "+1 234-567-8906",
    location: "Boston",
  },
  {
    id: "emp-007",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    role: "QA Engineer",
    department: "Engineering",
    team: "Engineering Team A",
    status: "Active",
    joinDate: "2023-07-01",
    manager: "John Smith",
    phone: "+1 234-567-8907",
    location: "Austin",
  },
  {
    id: "emp-008",
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    role: "Marketing Manager",
    department: "Marketing",
    team: "Marketing Team",
    status: "Active",
    joinDate: "2022-03-15",
    manager: "CMO",
    phone: "+1 234-567-8908",
    location: "Miami",
  },
  {
    id: "emp-009",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Data Analyst",
    department: "Analytics",
    team: "Analytics Team",
    status: "Active",
    joinDate: "2023-02-01",
    manager: "Jane Doe",
    phone: "+1 234-567-8909",
    location: "San Diego",
  },
  {
    id: "emp-010",
    name: "Sophie Turner",
    email: "sophie.turner@company.com",
    role: "Sales Executive",
    department: "Sales",
    team: "Sales Team",
    status: "Active",
    joinDate: "2022-09-10",
    manager: "Sales Director",
    phone: "+1 234-567-8910",
    location: "Denver",
  },
  {
    id: "emp-011",
    name: "Demo Admin",
    email: "admin@company.com",
    role: "System Administrator",
    department: "IT",
    team: "IT Team",
    status: "Active",
    joinDate: "2019-01-01",
    manager: "CEO",
    phone: "+1 234-567-8911",
    location: "Remote",
  },
  {
    id: "emp-012",
    name: "Jane Doe",
    email: "jane.doe@company.com",
    role: "Chief Product Officer",
    department: "Product",
    team: "Leadership Team",
    status: "Active",
    joinDate: "2018-06-15",
    manager: "CEO",
    phone: "+1 234-567-8912",
    location: "San Francisco",
  },
];

// Helper functions
export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((emp) => emp.id === id);
}

export function getEmployeeByEmail(email: string): Employee | undefined {
  return employees.find((emp) => emp.email === email);
}

export function getEmployeesByManager(managerName: string): Employee[] {
  return employees.filter((emp) => emp.manager === managerName);
}

export function getEmployeesByTeam(team: string): Employee[] {
  return employees.filter((emp) => emp.team === team);
}

export function getEmployeesByDepartment(department: string): Employee[] {
  return employees.filter((emp) => emp.department === department);
}
