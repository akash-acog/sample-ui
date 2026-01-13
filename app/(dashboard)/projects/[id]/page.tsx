"use client";

import { useRole } from "@/lib/role-context";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Calendar,
  Users,
  FolderKanban,
  Clock,
  Star,
  Edit,
} from "lucide-react";
import { projects } from "@/lib/data/projects";
import { employees } from "@/lib/data/employees";
import { workLogs } from "@/lib/data/work-logs";
import { performanceRatings } from "@/lib/data/performance";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useRole();

  if (!user) return null;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Get project work logs
  const projectLogs = workLogs.filter((log) => log.projectId === project.id);
  const totalHours = projectLogs.reduce((sum, log) => sum + log.hours, 0);

  // Get team members (in real app, this would come from allocations)
  const teamMembers = employees.filter((emp) =>
    projectLogs.some((log) => log.employeeId === emp.id)
  );

  // Calculate project progress
  const startDate = new Date(project.startDate);
  const endDate = project.endDate ? new Date(project.endDate) : new Date();
  const today = new Date();
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const elapsedDays = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

  // Get performance ratings for this project
  const projectRatings = performanceRatings.filter(
    (rating) => rating.projectName === project.name
  );

  const canEdit = user.role === "admin" || user.role === "manager";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <Link href="/projects">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {project.name}
            </h1>
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
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        {canEdit && (
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Project
          </Button>
        )}
      </div>

      {/* Project Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Manager</span>
                <span className="text-sm font-medium">{project.manager}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Start Date
                </span>
                <span className="text-sm font-medium">
                  {new Date(project.startDate).toLocaleDateString()}
                </span>
              </div>
              {project.endDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    End Date
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Progress
                </span>
                <Badge variant="secondary">{project.progress}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Team Members
                </span>
                <span className="text-sm font-medium">
                  {teamMembers.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Hours
                </span>
                <span className="text-sm font-medium">{totalHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Work Logs
                </span>
                <span className="text-sm font-medium">
                  {projectLogs.length}
                </span>
              </div>
              {project.status === "Active" && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Days Elapsed
                    </span>
                    <span className="text-sm font-medium">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      {(user.role === "admin" ||
        user.role === "hr" ||
        user.role === "manager") && (
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Employees working on this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length > 0 ? (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Hours Logged</TableHead>
                      <TableHead>Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => {
                      const memberLogs = projectLogs.filter(
                        (log) => log.employeeId === member.id
                      );
                      const memberHours = memberLogs.reduce(
                        (sum, log) => sum + log.hours,
                        0
                      );
                      return (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-xs font-medium">
                                {member.name.charAt(0)}
                              </div>
                              <span className="font-medium">
                                {member.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{member.department}</TableCell>
                          <TableCell>{member.designation}</TableCell>
                          <TableCell>{memberHours}h</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                member.utilization >= 80
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {member.utilization}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No team members assigned yet
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Work Logs */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Recent Work Logs</CardTitle>
          <CardDescription>
            Latest work activities on this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projectLogs.length > 0 ? (
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {user.role !== "employee" && <TableHead>Employee</TableHead>}
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectLogs.slice(0, 10).map((log) => (
                    <TableRow key={log.id}>
                      {user.role !== "employee" && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-xs font-medium">
                              {log.employeeName.charAt(0)}
                            </div>
                            <span className="font-medium">
                              {log.employeeName}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        {new Date(log.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{log.hours}h</TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {log.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "Completed"
                              ? "success"
                              : log.status === "In Progress"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No work logs recorded yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Performance Ratings (for completed projects) */}
      {project.status === "Completed" &&
        (user.role === "admin" ||
          user.role === "hr" ||
          user.role === "manager") &&
        projectRatings.length > 0 && (
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle>Performance Ratings</CardTitle>
              <CardDescription>
                Team member ratings for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Rated By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectRatings.map((rating) => (
                      <TableRow key={rating.id}>
                        <TableCell className="font-medium">
                          {rating.employeeName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {rating.rating}/5
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm text-muted-foreground">
                            {rating.remarks}
                          </p>
                        </TableCell>
                        <TableCell>{rating.ratedBy}</TableCell>
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
