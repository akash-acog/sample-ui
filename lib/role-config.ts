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

export function hasPermission(role: UserRole, permission: string): boolean {
  // Define permission mappings for different roles
  const permissions: Record<UserRole, string[]> = {
    admin: [
      "manage_allocations",
      "manage_employees",
      "manage_projects",
      "view_analytics",
      "manage_settings",
    ],
    hr: [
      "manage_allocations",
      "manage_employees",
      "view_projects",
      "view_analytics",
    ],
    manager: [
      "manage_allocations",
      "view_employees",
      "view_projects",
      "view_analytics",
    ],
    employee: [
      "view_own_data",
      "view_projects",
    ],
  };

  return permissions[role]?.includes(permission) ?? false;
}
