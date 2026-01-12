export interface PerformanceRating {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  rating: number; // 1-5
  remarks: string;
  ratedBy: string;
  ratedAt: string;
}

export const performanceRatings: PerformanceRating[] = [
  {
    id: "pr-1",
    employeeId: "emp-1",
    employeeName: "Akash Kumar",
    projectId: "proj-1",
    projectName: "EMS Platform",
    rating: 5,
    remarks: "Excellent work on the core architecture and implementation",
    ratedBy: "Sarah Manager",
    ratedAt: "2024-12-15T10:00:00Z",
  },
  {
    id: "pr-2",
    employeeId: "emp-2",
    employeeName: "Priya Sharma",
    projectId: "proj-1",
    projectName: "EMS Platform",
    rating: 4,
    remarks: "Great UI/UX work and attention to detail",
    ratedBy: "Sarah Manager",
    ratedAt: "2024-12-15T10:30:00Z",
  },
  {
    id: "pr-3",
    employeeId: "emp-3",
    employeeName: "Rahul Verma",
    projectId: "proj-2",
    projectName: "Client Portal",
    rating: 5,
    remarks: "Outstanding backend development and API design",
    ratedBy: "John Lead",
    ratedAt: "2024-11-20T14:00:00Z",
  },
  {
    id: "pr-4",
    employeeId: "emp-1",
    employeeName: "Akash Kumar",
    projectId: "proj-3",
    projectName: "Mobile App",
    rating: 4,
    remarks: "Solid performance, delivered on time",
    ratedBy: "Sarah Manager",
    ratedAt: "2024-10-10T16:00:00Z",
  },
];
