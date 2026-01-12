import type { Employee } from "@/lib/data/employees";
import type { Project } from "@/lib/data/projects";
import type { PerformanceReview } from "@/lib/data/reviews";
import type { UserRole } from "@/lib/role-config";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/**
 * Filter employees based on user role
 */
export function filterEmployeesByRole(
  employees: Employee[],
  user: User
): Employee[] {
  switch (user.role) {
    case "admin":
    case "hr":
      // Admin and HR see everyone
      return employees;

    case "manager":
      // Managers see their direct reports + themselves
      return employees.filter(
        (emp) => emp.managerId === user.id || emp.email === user.email
      );

    case "employee":
      // Employees only see themselves
      return employees.filter((emp) => emp.email === user.email);

    default:
      return [];
  }
}

/**
 * Filter projects based on user role
 */
export function filterProjectsByRole(
  projects: Project[],
  user: User,
  employeeId?: string
): Project[] {
  switch (user.role) {
    case "admin":
      // Admin sees all projects
      return projects;

    case "hr":
      // HR sees all projects (for reporting)
      return projects;

    case "manager":
      // Managers see projects they manage
      return projects.filter((proj) => proj.managerId === user.id);

    case "employee":
      // Employees see projects they're assigned to
      if (!employeeId) return [];
      return projects.filter((proj) => proj.team.includes(employeeId));

    default:
      return [];
  }
}

/**
 * Filter performance reviews based on user role
 */
export function filterReviewsByRole(
  reviews: PerformanceReview[],
  user: User,
  employeeId?: string
): PerformanceReview[] {
  switch (user.role) {
    case "admin":
    case "hr":
      // Admin and HR see all reviews
      return reviews;

    case "manager":
      // Managers see reviews they conducted or for their team
      return reviews.filter(
        (review) =>
          review.reviewerId === user.id ||
          // Check if the employee reports to this manager
          review.reviewerId === user.id
      );

    case "employee":
      // Employees only see their own reviews
      if (!employeeId) return [];
      return reviews.filter((review) => review.employeeId === employeeId);

    default:
      return [];
  }
}

/**
 * Check if user has permission to perform action
 */
export function hasPermission(
  user: User,
  action: string,
  resource?: any
): boolean {
  // Admin has all permissions
  if (user.role === "admin") return true;

  switch (action) {
    case "employee:create":
    case "employee:delete":
      return user.role === "admin" || user.role === "hr";

    case "employee:edit":
      return (
        user.role === "admin" ||
        user.role === "hr" ||
        (user.role === "manager" && resource?.managerId === user.id)
      );

    case "employee:view":
      if (user.role === "admin" || user.role === "hr") return true;
      if (user.role === "manager" && resource?.managerId === user.id)
        return true;
      if (user.role === "employee" && resource?.email === user.email)
        return true;
      return false;

    case "project:create":
    case "project:delete":
      return user.role === "admin";

    case "project:edit":
      return (
        user.role === "admin" ||
        (user.role === "manager" && resource?.managerId === user.id)
      );

    case "project:view":
      if (user.role === "admin" || user.role === "hr") return true;
      if (user.role === "manager" && resource?.managerId === user.id)
        return true;
      if (
        user.role === "employee" &&
        resource?.team?.includes(user.id)
      )
        return true;
      return false;

    case "review:create":
    case "review:edit":
      return (
        user.role === "admin" ||
        user.role === "hr" ||
        user.role === "manager"
      );

    case "review:view":
      if (user.role === "admin" || user.role === "hr") return true;
      if (user.role === "manager" && resource?.reviewerId === user.id)
        return true;
      if (user.role === "employee" && resource?.employeeId === user.id)
        return true;
      return false;

    case "reports:view":
      return user.role !== "employee";

    case "settings:system":
      return user.role === "admin";

    case "settings:profile":
      return true; // Everyone can edit their own profile

    default:
      return false;
  }
}

/**
 * Get page title based on role
 */
export function getPageTitle(page: string, role: UserRole): string {
  const titles: Record<string, Record<UserRole, string>> = {
    employees: {
      admin: "Employee Management",
      hr: "Employee Directory",
      manager: "My Team",
      employee: "My Profile",
    },
    projects: {
      admin: "All Projects",
      hr: "Projects Overview",
      manager: "My Projects",
      employee: "My Assignments",
    },
    reviews: {
      admin: "Performance Reviews",
      hr: "Performance Reviews",
      manager: "Team Reviews",
      employee: "My Reviews",
    },
    dashboard: {
      admin: "System Dashboard",
      hr: "HR Dashboard",
      manager: "Team Dashboard",
      employee: "My Dashboard",
    },
  };

  return titles[page]?.[role] || page;
}
