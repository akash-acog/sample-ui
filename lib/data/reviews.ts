export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  reviewPeriod: string;
  reviewDate: string;
  status: "Draft" | "Submitted" | "Completed";
  overallRating: number;
  ratings: {
    technical: number;
    communication: number;
    teamwork: number;
    initiative: number;
    leadership: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  comments: string;
}

export const performanceReviews: PerformanceReview[] = [
  {
    id: "review-001",
    employeeId: "emp-001",
    employeeName: "Sarah Johnson",
    reviewerId: "emp-006",
    reviewerName: "John Smith",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-15",
    status: "Completed",
    overallRating: 4.5,
    ratings: {
      technical: 5,
      communication: 4,
      teamwork: 5,
      initiative: 4,
      leadership: 4,
    },
    strengths: [
      "Excellent technical skills",
      "Strong problem-solving abilities",
      "Great team player",
    ],
    areasForImprovement: [
      "Could improve documentation",
      "More proactive in meetings",
    ],
    goals: [
      "Lead a major project in Q1 2026",
      "Mentor junior developers",
      "Learn cloud architecture patterns",
    ],
    comments:
      "Sarah consistently delivers high-quality work and is a valuable team member. She shows initiative and helps others succeed.",
  },
  {
    id: "review-002",
    employeeId: "emp-002",
    employeeName: "James Wilson",
    reviewerId: "emp-006",
    reviewerName: "John Smith",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-18",
    status: "Completed",
    overallRating: 4.3,
    ratings: {
      technical: 5,
      communication: 4,
      teamwork: 4,
      initiative: 4,
      leadership: 4,
    },
    strengths: [
      "Deep DevOps expertise",
      "Reliable and consistent",
      "Good at automation",
    ],
    areasForImprovement: [
      "Documentation of processes",
      "Knowledge sharing sessions",
    ],
    goals: [
      "Implement CI/CD best practices",
      "Reduce deployment time by 50%",
      "Train team on Docker/Kubernetes",
    ],
    comments:
      "James is an expert in DevOps and infrastructure. His work ensures smooth deployments and system reliability.",
  },
  {
    id: "review-003",
    employeeId: "emp-003",
    employeeName: "David Chen",
    reviewerId: "emp-006",
    reviewerName: "John Smith",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-20",
    status: "Completed",
    overallRating: 4.0,
    ratings: {
      technical: 4,
      communication: 4,
      teamwork: 4,
      initiative: 4,
      leadership: 3,
    },
    strengths: [
      "Quick learner",
      "Eager to take on challenges",
      "Good code quality",
    ],
    areasForImprovement: [
      "Gain more experience with complex projects",
      "Improve system design skills",
    ],
    goals: [
      "Complete advanced React course",
      "Contribute to architectural decisions",
      "Mentor intern developers",
    ],
    comments:
      "David is progressing well and shows great potential. He's adapting quickly to the team's practices.",
  },
  {
    id: "review-004",
    employeeId: "emp-004",
    employeeName: "Mike Chen",
    reviewerId: "emp-007",
    reviewerName: "Jane Doe",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-16",
    status: "Completed",
    overallRating: 4.2,
    ratings: {
      technical: 4,
      communication: 5,
      teamwork: 4,
      initiative: 4,
      leadership: 4,
    },
    strengths: [
      "Excellent stakeholder management",
      "Clear product vision",
      "Strong analytical skills",
    ],
    areasForImprovement: [
      "Balance between perfectionism and deadlines",
      "Delegate more effectively",
    ],
    goals: [
      "Launch 3 major features in Q1",
      "Improve sprint planning efficiency",
      "Build stronger customer relationships",
    ],
    comments:
      "Mike drives product success through clear vision and strong execution. Great asset to the product team.",
  },
  {
    id: "review-005",
    employeeId: "emp-005",
    employeeName: "Rachel Green",
    reviewerId: "emp-007",
    reviewerName: "Jane Doe",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-17",
    status: "Completed",
    overallRating: 4.4,
    ratings: {
      technical: 5,
      communication: 4,
      teamwork: 4,
      initiative: 5,
      leadership: 4,
    },
    strengths: [
      "Creative and innovative designs",
      "User-focused approach",
      "Strong design system knowledge",
    ],
    areasForImprovement: [
      "Consider technical constraints earlier",
      "Improve handoff documentation",
    ],
    goals: [
      "Establish design system v2",
      "Conduct 10+ user research sessions",
      "Lead design thinking workshops",
    ],
    comments:
      "Rachel brings creativity and user empathy to every project. Her designs significantly improve user experience.",
  },
  {
    id: "review-006",
    employeeId: "emp-010",
    employeeName: "Emily Davis",
    reviewerId: "emp-007",
    reviewerName: "Jane Doe",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-19",
    status: "Completed",
    overallRating: 4.7,
    ratings: {
      technical: 5,
      communication: 5,
      teamwork: 5,
      initiative: 4,
      leadership: 4,
    },
    strengths: [
      "Outstanding user research skills",
      "Excellent collaboration",
      "Data-driven approach",
    ],
    areasForImprovement: [
      "Take on more strategic initiatives",
      "Share research insights more broadly",
    ],
    goals: [
      "Establish UX research framework",
      "Present at design conference",
      "Build research repository",
    ],
    comments:
      "Emily excels at understanding user needs and translating them into actionable insights. Exceptional contributor.",
  },
  {
    id: "review-007",
    employeeId: "emp-009",
    employeeName: "Tom Harris",
    reviewerId: "emp-008",
    reviewerName: "Lisa Anderson",
    reviewPeriod: "Q4 2025",
    reviewDate: "2025-12-21",
    status: "Submitted",
    overallRating: 4.1,
    ratings: {
      technical: 4,
      communication: 4,
      teamwork: 4,
      initiative: 4,
      leadership: 4,
    },
    strengths: [
      "Organized and detail-oriented",
      "Good with HRIS systems",
      "Responsive to employee needs",
    ],
    areasForImprovement: [
      "Develop strategic HR skills",
      "Take ownership of projects",
    ],
    goals: [
      "Complete HR certification",
      "Lead onboarding improvement project",
      "Implement employee feedback system",
    ],
    comments:
      "Tom handles day-to-day HR operations efficiently and shows promise for taking on more strategic work.",
  },
];
