export type UserRole = "admin" | "hr" | "manager" | "employee";

export const roleConfig = {
  admin: {
    pages: [
      "dashboard",
      "employees",
      "projects",
      "allocations",
      "skill-matching",
      "analytics",
      "profile",
      "settings",
      "work-logs",
    ],
  },
  hr: {
    pages: [
      "dashboard",
      "employees",
      "projects",
      "allocations",
      "skill-matching",
      "analytics",
      "profile",
      "settings",
      "work-logs",
    ],
  },
  manager: {
    pages: [
      "dashboard",
      "employees",
      "projects",
      "allocations",
      "skill-matching",
      "analytics",
      "profile",
      "settings",
      "work-logs",
    ],
  },
  employee: {
    pages: [
      "dashboard",
      "employees",
      "projects",
      "analytics",
      "profile",
      "settings",
      "work-logs",
    ],
  },
};

export function canAccessPage(role: UserRole, page: string): boolean {
  return roleConfig[role]?.pages.includes(page) ?? false;
}
