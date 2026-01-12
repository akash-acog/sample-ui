"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role-context";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  PieChart,
  ClipboardCheck,
  Star,
  BarChart3,
  Settings,
  ChevronLeft,
  Sparkles,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useRole();

  if (!user) return null;

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      name: "Employees",
      href: "/employees",
      icon: Users,
      roles: ["admin", "hr", "manager"],
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderKanban,
      roles: ["admin", "hr", "manager"],
    },
    {
      name: "Allocations",
      href: "/allocations",
      icon: PieChart,
      roles: ["admin", "hr", "manager"],
    },
    {
      name: "Checklist",
      href: "/checklist",
      icon: ClipboardCheck,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      name: "Performance",
      href: "/ratings",
      icon: Star,
      roles: ["admin", "hr", "manager"],
    },
    {
      name: "Skill Matching",
      href: "/skill-matching",
      icon: Sparkles,
      roles: ["admin", "hr", "manager"],
    },
    {
      name: "Reports",
      href: "/reporting",
      icon: BarChart3,
      roles: ["admin", "hr", "manager"],
    },
  ];

  const secondaryNavigation = [
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["admin", "hr", "manager", "employee"],
    },
  ];

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user.role)
  );

  const filteredSecondaryNavigation = secondaryNavigation.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              EmployeeHub
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-sm mx-auto">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="border-b border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-medium shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0 h-5 capitalize mt-1"
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-custom">
        {!collapsed && (
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Main Menu
          </p>
        )}
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5 shrink-0", isActive && "text-primary")}
              />
              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
            </Link>
          );
        })}

        {!collapsed && (
          <>
            <Separator className="my-4" />
            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Settings
            </p>
          </>
        )}

        {filteredSecondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5 shrink-0", isActive && "text-primary")}
              />
              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle for Collapsed State */}
      {collapsed && (
        <div className="border-t border-border/50 p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-10 w-10 mx-auto hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}
    </div>
  );
}
