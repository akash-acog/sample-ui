"use client";

import { useRole } from "@/lib/role-context";
import { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  FolderKanban,
  Users,
  Calendar,
  ArrowRight,
  Plus,
} from "lucide-react";
import { projects } from "@/lib/data/projects";
import { employees } from "@/lib/data/employees";

export default function ProjectsPage() {
  const { user } = useRole();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (!user) return null;

  // Filter projects based on role
  const filteredProjects = useMemo(() => {
    switch (user.role) {
      case "admin":
      case "hr":
        // Admin and HR see all projects
        return projects;

      case "manager":
        // Managers see only their projects
        return projects.filter((project) => project.manager === user.name);

      case "employee":
        // Employees see projects they're allocated to
        const employee = employees.find((emp) => emp.email === user.email);
        // For now showing all active projects since we don't have allocations in mock data
        // In real app, filter by allocations
        return projects.filter((project) => project.status === "Active");

      default:
        return [];
    }
  }, [user]);

  const getPageTitle = () => {
    switch (user.role) {
      case "employee":
        return "My Projects";
      case "manager":
        return "My Managed Projects";
      default:
        return "All Projects";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "employee":
        return "Projects you are currently allocated to";
      case "manager":
        return "Projects you are managing";
      default:
        return "View and manage all projects in the organization";
    }
  };

  // Group projects by status
  const projectsByStatus = useMemo(() => {
    return {
      active: filteredProjects.filter((p) => p.status === "Active"),
      onHold: filteredProjects.filter((p) => p.status === "On Hold"),
      completed: filteredProjects.filter((p) => p.status === "Completed"),
    };
  }, [filteredProjects]);

  const handleAddProject = () => {
    // Add project logic
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <FolderKanban className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong>. You
          can see <strong>{filteredProjects.length}</strong> projects.
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
        {(user.role === "admin" || user.role === "manager") && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to the organization
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      placeholder="e.g., Mobile App Redesign"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="projectCode">Project Code *</Label>
                    <Input id="projectCode" placeholder="e.g., PROJ-001" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the project"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="manager">Project Manager *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees
                          .filter((emp) =>
                            ["admin", "manager"].includes(
                              emp.designation.toLowerCase()
                            ) ||
                            emp.role.toLowerCase().includes("manager")
                          )
                          .map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.name} - {emp.designation}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select defaultValue="on-hold">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Target End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget in USD"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Project Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </p>
                <p className="text-3xl font-bold">
                  {projectsByStatus.active.length}
                </p>
              </div>
              <Badge variant="default" className="text-xs">
                In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  On Hold
                </p>
                <p className="text-3xl font-bold">
                  {projectsByStatus.onHold.length}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Paused
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Projects
                </p>
                <p className="text-3xl font-bold">
                  {projectsByStatus.completed.length}
                </p>
              </div>
              <Badge variant="success" className="text-xs">
                Done
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      {projectsByStatus.active.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <p className="text-sm text-muted-foreground">
              Currently in progress
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectsByStatus.active.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {project.progress}% Complete
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{project.manager}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "Ongoing"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* On Hold Projects */}
      {projectsByStatus.onHold.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">On Hold Projects</h2>
            <p className="text-sm text-muted-foreground">Paused projects</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectsByStatus.onHold.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">On Hold</Badge>
                      <Badge variant="outline">
                        {project.progress}% Complete
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{project.manager}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Started{" "}
                          {new Date(project.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {projectsByStatus.completed.length > 0 && user.role !== "employee" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Completed Projects</h2>
            <p className="text-sm text-muted-foreground">Finished projects</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectsByStatus.completed.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow cursor-pointer opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{project.manager}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Completed{" "}
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <Card className="border-border/50 shadow-soft">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-sm text-muted-foreground text-center">
              {user.role === "employee"
                ? "You are not currently allocated to any projects."
                : "No projects available. Create one to get started."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
