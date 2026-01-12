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
  Plus,
  Search,
  Filter,
  FolderKanban,
  Users,
  Calendar,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { projects } from "@/lib/data/projects";
import { employees } from "@/lib/data/employees";

export default function ProjectsPage() {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  // Filter projects based on role
  const filteredProjects = useMemo(() => {
    let result = projects;

    switch (user.role) {
      case "admin":
      case "hr":
        // Admin and HR see all projects
        result = projects;
        break;

      case "manager":
        // Managers see projects they manage
        result = projects.filter((proj) => proj.manager === user.name);
        break;

      case "employee":
        // Employees see projects they're assigned to
        const employee = employees.find((emp) => emp.email === user.email);
        result = projects.filter((proj) =>
          proj.team.includes(employee?.id || "")
        );
        break;
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (proj) =>
          proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          proj.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [user, searchTerm]);

  const canCreateProject = user.role === "admin" || user.role === "manager";
  const activeProjects = filteredProjects.filter((p) => p.status === "Active");
  const completedProjects = filteredProjects.filter(
    (p) => p.status === "Completed"
  );

  const getPageTitle = () => {
    switch (user.role) {
      case "employee":
        return "My Projects";
      case "manager":
        return "Managed Projects";
      default:
        return "All Projects";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "employee":
        return "Projects you are currently working on";
      case "manager":
        return "Projects under your management";
      default:
        return "All projects across the organization";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong>. You
          can see <strong>{filteredProjects.length}</strong> project
          {filteredProjects.length !== 1 ? "s" : ""}.
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
        {canCreateProject && (
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </p>
                <p className="text-3xl font-bold">{filteredProjects.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
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
                  Active
                </p>
                <p className="text-3xl font-bold">{activeProjects.length}</p>
              </div>
              <Badge variant="success" className="text-xs">
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
                  Completed
                </p>
                <p className="text-3xl font-bold">{completedProjects.length}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Done
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Progress
                </p>
                <p className="text-3xl font-bold">
                  {
                    (
                      filteredProjects.reduce((sum, p) => sum + p.progress, 0) /
                      filteredProjects.length
                    ).toFixed(0)
                  }%
                </p>
              </div>
              <Badge variant="default" className="text-xs">
                Overall
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project List</CardTitle>
              <CardDescription>
                Showing {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team Size</TableHead>
                  {user.role !== "employee" && <TableHead>Manager</TableHead>}
                  <TableHead>Start Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={user.role === "employee" ? 5 : 6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No projects found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "Active"
                              ? "success"
                              : project.status === "Completed"
                              ? "secondary"
                              : "warning"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{project.team.length}</span>
                        </div>
                      </TableCell>
                      {user.role !== "employee" && (
                        <TableCell>{project.manager}</TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(project.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
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
