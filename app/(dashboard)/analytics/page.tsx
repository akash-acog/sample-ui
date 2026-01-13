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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Users,
  FolderKanban,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Percent,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { employees } from "@/lib/data/employees";
import { projects, getActiveProjects } from "@/lib/data/projects";
import { workLogs } from "@/lib/data/work-logs";
import { performanceRatings } from "@/lib/data/performance";

export default function AnalyticsPage() {
  const { user } = useRole();

  if (!user) return null;

  // Calculate analytics based on role
  const analytics = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const thisMonth = new Date().toISOString().substring(0, 7);

    switch (user.role) {
      case "admin":
      case "hr":
        // Admin/HR see organization-wide analytics
        const activeEmployees = employees.filter(
          (emp) => emp.status === "Active"
        ).length;
        const totalProjects = projects.length;
        const activeProjects = getActiveProjects().length;
        const avgUtilization =
          employees.reduce((sum, emp) => sum + emp.utilization, 0) /
          employees.length;

        // Department distribution
        const deptStats = employees.reduce((acc, emp) => {
          acc[emp.department] = (acc[emp.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Work logs this month
        const monthlyLogs = workLogs.filter((log) =>
          log.date.startsWith(thisMonth)
        );
        const monthlyHours = monthlyLogs.reduce(
          (sum, log) => sum + log.hours,
          0
        );

        return {
          stats: [
            {
              label: "Active Employees",
              value: activeEmployees,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Total Projects",
              value: totalProjects,
              icon: FolderKanban,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Avg Utilization",
              value: `${avgUtilization.toFixed(1)}%`,
              icon: Percent,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Monthly Hours",
              value: monthlyHours,
              icon: Clock,
              color: "from-orange-500 to-red-500",
            },
          ],
          departmentData: Object.entries(deptStats).map(([dept, count]) => ({
            department: dept,
            employees: count,
            percentage: ((count / employees.length) * 100).toFixed(1),
          })),
          projectStats: projects.map((project) => {
            const projectLogs = workLogs.filter(
              (log) => log.projectId === project.id
            );
            const totalHours = projectLogs.reduce(
              (sum, log) => sum + log.hours,
              0
            );
            return {
              ...project,
              totalHours,
              logCount: projectLogs.length,
            };
          }),
        };

      case "manager":
        // Manager sees team analytics
        const teamMembers = employees.filter(
          (emp) => emp.manager === user.name || emp.email === user.email
        );
        const teamIds = teamMembers.map((emp) => emp.id);
        const teamLogs = workLogs.filter((log) =>
          teamIds.includes(log.employeeId)
        );
        const teamProjects = projects.filter((p) => p.manager === user.name);

        const teamMonthlyLogs = teamLogs.filter((log) =>
          log.date.startsWith(thisMonth)
        );
        const teamMonthlyHours = teamMonthlyLogs.reduce(
          (sum, log) => sum + log.hours,
          0
        );

        const avgTeamUtilization =
          teamMembers.reduce((sum, emp) => sum + emp.utilization, 0) /
          (teamMembers.length || 1);

        return {
          stats: [
            {
              label: "Team Members",
              value: teamMembers.length,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "My Projects",
              value: teamProjects.length,
              icon: FolderKanban,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Team Utilization",
              value: `${avgTeamUtilization.toFixed(1)}%`,
              icon: Percent,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Monthly Hours",
              value: teamMonthlyHours,
              icon: Clock,
              color: "from-orange-500 to-red-500",
            },
          ],
          teamPerformance: teamMembers.map((emp) => {
            const empLogs = workLogs.filter(
              (log) => log.employeeId === emp.id
            );
            const empRatings = performanceRatings.filter(
              (r) => r.employeeId === emp.id
            );
            const avgRating =
              empRatings.reduce((sum, r) => sum + r.rating, 0) /
              (empRatings.length || 1);
            return {
              employee: emp.name,
              logsCount: empLogs.length,
              utilization: emp.utilization,
              avgRating: avgRating.toFixed(1),
            };
          }),
          projectStats: teamProjects.map((project) => {
            const projectLogs = workLogs.filter(
              (log) => log.projectId === project.id
            );
            const totalHours = projectLogs.reduce(
              (sum, log) => sum + log.hours,
              0
            );
            return {
              ...project,
              totalHours,
              logCount: projectLogs.length,
            };
          }),
        };

      case "employee":
        // Employee sees personal analytics
        const employee = employees.find((emp) => emp.email === user.email);
        const myLogs = workLogs.filter(
          (log) => log.employeeId === employee?.id
        );
        const myMonthlyLogs = myLogs.filter((log) =>
          log.date.startsWith(thisMonth)
        );
        const myMonthlyHours = myMonthlyLogs.reduce(
          (sum, log) => sum + log.hours,
          0
        );
        const myRatings = performanceRatings.filter(
          (r) => r.employeeId === employee?.id
        );
        const myAvgRating =
          myRatings.reduce((sum, r) => sum + r.rating, 0) /
          (myRatings.length || 1);

        // Project breakdown
        const myProjectLogs = myLogs.reduce((acc, log) => {
          if (!acc[log.projectName]) {
            acc[log.projectName] = { hours: 0, count: 0 };
          }
          acc[log.projectName].hours += log.hours;
          acc[log.projectName].count += 1;
          return acc;
        }, {} as Record<string, { hours: number; count: number }>);

        return {
          stats: [
            {
              label: "Total Logs",
              value: myLogs.length,
              icon: BarChart3,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Monthly Hours",
              value: myMonthlyHours,
              icon: Clock,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Utilization",
              value: `${employee?.utilization || 0}%`,
              icon: Percent,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Avg Rating",
              value: myAvgRating.toFixed(1),
              icon: CheckCircle,
              color: "from-orange-500 to-red-500",
            },
          ],
          projectBreakdown: Object.entries(myProjectLogs).map(
            ([project, data]) => ({
              project,
              hours: data.hours,
              logs: data.count,
              percentage: ((data.hours / myMonthlyHours) * 100).toFixed(1),
            })
          ),
        };

      default:
        return null;
    }
  }, [user]);

  if (!analytics) return null;

  const getPageTitle = () => {
    switch (user.role) {
      case "employee":
        return "My Analytics";
      case "manager":
        return "Team Analytics";
      default:
        return "Organization Analytics";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "employee":
        return "Track your performance and productivity metrics";
      case "manager":
        return "Monitor your team's performance and project analytics";
      default:
        return "Organization-wide analytics and insights";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <BarChart3 className="h-4 w-4" />
        <AlertDescription>
          Viewing <strong className="capitalize">{user.role}</strong> analytics
          dashboard with role-specific insights
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
        <p className="text-muted-foreground">{getPageDescription()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {analytics.stats.map((stat, index) => (
          <Card key={index} className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-sm`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-specific analytics */}
      {(user.role === "admin" || user.role === "hr") && (
        <>
          {/* Department Distribution */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>
                Employee count across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.departmentData?.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {dept.department}
                        </TableCell>
                        <TableCell>{dept.employees}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{dept.percentage}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {user.role === "manager" && (
        <>
          {/* Team Performance */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Individual team member analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Work Logs</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Avg Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.teamPerformance?.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {member.employee}
                        </TableCell>
                        <TableCell>{member.logsCount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.utilization >= 80 ? "default" : "secondary"
                            }
                          >
                            {member.utilization}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {member.avgRating}
                            </span>
                            <span className="text-muted-foreground">/5</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {user.role === "employee" && (
        <>
          {/* Project Time Breakdown */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Project Time Breakdown</CardTitle>
              <CardDescription>
                Your time allocation across projects this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Logs</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.projectBreakdown?.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {project.project}
                        </TableCell>
                        <TableCell>{project.hours}h</TableCell>
                        <TableCell>{project.logs}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {project.percentage}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Project Statistics */}
      {(user.role === "admin" ||
        user.role === "hr" ||
        user.role === "manager") && (
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
            <CardDescription>
              Work log and time tracking across projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Log Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.projectStats?.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "Active"
                              ? "default"
                              : project.status === "Completed"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {project.progress}%
                        </Badge>
                      </TableCell>
                      <TableCell>{project.totalHours}h</TableCell>
                      <TableCell>{project.logCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
