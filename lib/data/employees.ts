export interface Skill {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Employee {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  department: string;
  manager: string;
  joinDate: string;
  location: string;
  status: "Active" | "On Leave" | "Inactive";
  type: "Full Time" | "Intern" | "Contract";
  utilization: number;
  skills: Skill[];
  emergencyContact?: string;
  githubUrl?: string;
  bio?: string;
}

export const employees: Employee[] = [
  {
    id: "emp-1",
    code: "EMP001",
    name: "Akash Kumar",
    email: "akash@company.com",
    phone: "+91 98765 43210",
    role: "Full Stack Developer",
    designation: "Senior Software Engineer",
    department: "Engineering",
    manager: "Sarah Manager",
    joinDate: "2022-03-15",
    location: "Hyderabad, Telangana, India",
    status: "Active",
    type: "Full Time",
    utilization: 85,
    emergencyContact: "+91 98765 00000",
    githubUrl: "https://github.com/akash",
    bio: "Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. Love building scalable applications.",
    skills: [
      { name: "React", proficiency: "Expert" },
      { name: "Node.js", proficiency: "Advanced" },
      { name: "TypeScript", proficiency: "Expert" },
      { name: "Python", proficiency: "Intermediate" },
      { name: "Docker", proficiency: "Advanced" },
      { name: "AWS", proficiency: "Intermediate" },
    ],
  },
  {
    id: "emp-2",
    code: "EMP002",
    name: "Priya Sharma",
    email: "priya@company.com",
    phone: "+91 98765 43211",
    role: "UI/UX Designer",
    designation: "Senior Designer",
    department: "Design",
    manager: "Sarah Manager",
    joinDate: "2021-06-20",
    location: "Bangalore, Karnataka, India",
    status: "Active",
    type: "Full Time",
    utilization: 60,
    emergencyContact: "+91 98765 00001",
    bio: "Creative designer focused on user-centered design and creating delightful experiences.",
    skills: [
      { name: "Figma", proficiency: "Expert" },
      { name: "Adobe XD", proficiency: "Advanced" },
      { name: "UI Design", proficiency: "Expert" },
      { name: "Prototyping", proficiency: "Advanced" },
    ],
  },
  {
    id: "emp-3",
    code: "EMP003",
    name: "Rahul Verma",
    email: "rahul@company.com",
    phone: "+91 98765 43212",
    role: "Backend Developer",
    designation: "Software Engineer",
    department: "Engineering",
    manager: "John Lead",
    joinDate: "2023-01-10",
    location: "Mumbai, Maharashtra, India",
    status: "Active",
    type: "Full Time",
    utilization: 90,
    emergencyContact: "+91 98765 00002",
    githubUrl: "https://github.com/rahul",
    bio: "Backend specialist with strong database and API design skills.",
    skills: [
      { name: "Java", proficiency: "Expert" },
      { name: "Spring Boot", proficiency: "Advanced" },
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "MongoDB", proficiency: "Intermediate" },
      { name: "Redis", proficiency: "Intermediate" },
    ],
  },
  {
    id: "emp-4",
    code: "EMP004",
    name: "Sneha Patel",
    email: "sneha@company.com",
    phone: "+91 98765 43213",
    role: "Data Analyst",
    designation: "Business Analyst",
    department: "Analytics",
    manager: "Sarah Manager",
    joinDate: "2022-09-05",
    location: "Pune, Maharashtra, India",
    status: "On Leave",
    type: "Full Time",
    utilization: 0,
    emergencyContact: "+91 98765 00003",
    bio: "Data-driven analyst specializing in business intelligence and data visualization.",
    skills: [
      { name: "Python", proficiency: "Advanced" },
      { name: "SQL", proficiency: "Expert" },
      { name: "Tableau", proficiency: "Advanced" },
      { name: "Excel", proficiency: "Expert" },
    ],
  },
  {
    id: "emp-5",
    code: "EMP005",
    name: "Amit Singh",
    email: "amit@company.com",
    phone: "+91 98765 43214",
    role: "DevOps Engineer",
    designation: "Senior DevOps Engineer",
    department: "Operations",
    manager: "John Lead",
    joinDate: "2020-11-12",
    location: "Delhi, India",
    status: "Active",
    type: "Full Time",
    utilization: 75,
    emergencyContact: "+91 98765 00004",
    githubUrl: "https://github.com/amit",
    bio: "DevOps engineer with expertise in CI/CD, cloud infrastructure, and automation.",
    skills: [
      { name: "Kubernetes", proficiency: "Expert" },
      { name: "Docker", proficiency: "Expert" },
      { name: "AWS", proficiency: "Advanced" },
      { name: "Terraform", proficiency: "Advanced" },
      { name: "Jenkins", proficiency: "Intermediate" },
    ],
  },
];
