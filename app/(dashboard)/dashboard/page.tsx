"use client";

import { useRole } from "@/lib/role-context";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FolderKanban,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { employees } from "@/lib/data/employees";
import { projects } from "@/lib/data/projects";
import { workLogs } from "@/lib/data/work-logs";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useRole();

  if (!user) return null;

  // Filter data based on role
  const { visibleEmployees, visibleProjects, visibleWorkLogs } = useMemo(() => {
    let emps = employees;
    let projs = projects;
    let logs = workLogs;

    switch (user.role) {
      case "admin":
      case "hr":
        // See everything
        break;

      case "manager":
        // See team members
        emps = employees.filter(
          (emp) => emp.manager === user.name || emp.email === user.email
        );
        const empIds = emps.map((e) => e.id);
        logs = workLogs.filter((log) => empIds.includes(log.employeeId));
        projs = projects.filter((p) => p.manager === user.name);
        break;

      case "employee":
        // See only self
        emps = employees.filter((emp) => emp.email === user.email);
        const myId = emps[0]?.id;
        logs = workLogs.filter((log) => log.employeeId === myId);
        projs = projects.filter((p) => p.team.includes(myId || ""));
        break;
    }

    return {
      visibleEmployees: emps,
      visibleProjects: projs,
      visibleWorkLogs: logs,
    };
  }, [user]);

  // Calculate stats
  const todayLogs = visibleWorkLogs.filter(
    (log) => log.date === new Date().toISOString().split("T")[0]
  );
  const totalHoursToday = todayLogs.reduce((sum, log) => sum + log.hours, 0);
  const activeProjectsCount = visibleProjects.filter(
    (p) => p.status === "Active"
  ).length;

  const stats = [
    {
      title: user.role === "employee" ? "My Work Hours" : "Total Hours Today",
      value: totalHoursToday.toFixed(1) + "h",
      change: "+8%",
      changeType: "positive" as const,
      icon: Clock,
      description: "Logged today",
    },
    {
      title: user.role === "employee" ? "My Projects" : "Active Projects",
      value: activeProjectsCount.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: FolderKanban,
      description: "In progress",
    },
    {
      title: user.role === "employee" ? "Tasks" : "Team Members",
      value:
        user.role === "employee"
          ? todayLogs.length.toString()
          : visibleEmployees.length.toString(),
      change: user.role === "employee" ? "+3" : "+2",
      changeType: "positive" as const,
      icon: user.role === "employee" ? CheckCircle2 : Users,
      description: user.role === "employee" ? "Today" : "Active",
    },
    {
      title: "Work Logs",
      value: visibleWorkLogs.length.toString(),
      change: "+15%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Total entries",
    },
  ];

  // Recent work logs
  const recentLogs = visibleWorkLogs
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Quick actions based on role
  const quickActions = useMemo(() => {
    const actions = [];

    if (user.role === "employee") {
      actions.push(
        { label: "Add Work Log", icon: Clock, href: "/work-logs" },
        { label: "My Projects", icon: FolderKanban, href: "/projects" },
        { label: "My Profile", icon: Users, href: "/employees" },
        { label: "Settings", icon: CheckCircle2, href: "/settings" }
      );
    } else if (user.role === "manager") {
      actions.push(
        { label: "Team Work Logs", icon: Clock, href: "/work-logs" },
        { label: "Team Members", icon: Users, href: "/employees" },
        { label: "Projects", icon: FolderKanban, href: "/projects" },
        { label: "Reports", icon: TrendingUp, href: "/reporting" }
      );
    } else {
      actions.push(
        { label: "All Employees", icon: Users, href: "/employees" },
        { label: "All Projects", icon: FolderKanban, href: "/projects" },
        { label: "Work Logs", icon: Clock, href: "/work-logs" },
        { label: "Reports", icon: TrendingUp, href: "/reporting" }
      );
    }

    return actions;
  }, [user.role]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Welcome, <strong>{user.name}</strong> (Role:{" "}
          <strong className="capitalize">{user.role}</strong>)
        </AlertDescription>
      </Alert>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {user.role === "employee"
              ? "My Dashboard"
              : user.role === "manager"
              ? "Team Dashboard"
              : "Overview Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {user.role === "employee"
              ? "Track your work and stay productive"
              : user.role === "manager"
              ? "Monitor your team's activity and performance"
              : "Complete overview of your organization"}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-border/50 shadow-soft hover:shadow-medium transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                      <span
                        className={`text-xs font-medium ${
                          stat.changeType === "positive"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Work Logs */}
        <Card className="lg:col-span-4 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Work Logs</CardTitle>
            <CardDescription>
              {user.role === "employee"
                ? "Your latest work entries"
                : "Latest work logs from your team"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLogs.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No work logs yet
                </p>
              ) : (
                recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-medium shadow-sm">
                      {log.employeeName.charAt(0)}
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{log.employeeName}</span>{" "}
                        <span className="text-muted-foreground">
                          worked on {log.projectName}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {log.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {log.hours}h logged
                        </p>
                        <Badge
                          variant={
                            log.status === "Completed"
                              ? "success"
                              : log.status === "In Progress"
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link href="/work-logs">
              <Button variant="outline" className="w-full mt-4">
                View All Work Logs
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="lg:col-span-3 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Active Projects
            </CardTitle>
            <CardDescription>
              {user.role === "employee" ? "Your projects" : "Team projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {visibleProjects
                .filter((p) => p.status === "Active")
                .slice(0, 4)
                .map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{project.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Link href="/projects">
              <Button variant="outline" className="w-full mt-4">
                View All Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Button
                    variant="outline"
                    className="h-24 w-full flex-col gap-2 hover:border-primary/50 hover:bg-accent transition-all"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
