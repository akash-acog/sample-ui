"use client";

import { useRole } from "@/lib/role-context";
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Clock,
  Calendar as CalendarIcon,
  FolderKanban,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { workLogs } from "@/lib/data/work-logs";
import { projects, getActiveProjects } from "@/lib/data/projects";
import { employees } from "@/lib/data/employees";

export default function WorkLogsPage() {
  const { user } = useRole();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (!user) return null;

  // Filter work logs based on role
  const filteredWorkLogs = useMemo(() => {
    switch (user.role) {
      case "admin":
      case "hr":
        // Admin and HR see all logs
        return workLogs;

      case "manager":
        // Managers see their team's logs
        const teamMembers = employees.filter(
          (emp) => emp.manager === user.name || emp.email === user.email
        );
        const teamIds = teamMembers.map((emp) => emp.id);
        return workLogs.filter((log) => teamIds.includes(log.employeeId));

      case "employee":
        // Employees only see their own logs
        const employee = employees.find((emp) => emp.email === user.email);
        return workLogs.filter((log) => log.employeeId === employee?.id);

      default:
        return [];
    }
  }, [user]);

  // Calculate statistics
  const todayLogs = filteredWorkLogs.filter(
    (log) => log.date === new Date().toISOString().split("T")[0]
  );
  const totalHoursToday = todayLogs.reduce((sum, log) => sum + log.hours, 0);
  const activeProjects = new Set(todayLogs.map((log) => log.projectId)).size;
  const inProgressTasks = todayLogs.filter(
    (log) => log.status === "In Progress"
  ).length;

  const getPageTitle = () => {
    switch (user.role) {
      case "employee":
        return "My Work Logs";
      case "manager":
        return "Team Work Logs";
      default:
        return "Work Logs";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "employee":
        return "Track your daily work and project time";
      case "manager":
        return "Monitor your team's work logs and productivity";
      default:
        return "View and manage employee work logs across the organization";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <Clock className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong>. You
          can see <strong>{filteredWorkLogs.length}</strong> work log entries.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
        {user.role === "employee" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                Add Work Log
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Work Log Entry</DialogTitle>
                <DialogDescription>
                  Record your work for the day with project and time details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {getActiveProjects().map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Work Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you worked on..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="completed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Save Work Log
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Hours Today
                </p>
                <p className="text-3xl font-bold">
                  {totalHoursToday.toFixed(1)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </p>
                <p className="text-3xl font-bold">{activeProjects}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Logs
                </p>
                <p className="text-3xl font-bold">{filteredWorkLogs.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress
                </p>
                <p className="text-3xl font-bold">{inProgressTasks}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-sm">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Logs Table */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Work Log Entries</CardTitle>
          <CardDescription>
            {user.role === "employee"
              ? "Your recorded work logs"
              : `Showing ${filteredWorkLogs.length} work log entries`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {user.role !== "employee" && <TableHead>Employee</TableHead>}
                  <TableHead>Project</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={user.role === "employee" ? 6 : 7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No work logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkLogs.map((log) => (
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
                        <Badge variant="secondary">{log.projectName}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(log.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {log.startTime} - {log.endTime}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{log.hours}h</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
