"use client";

import { useRole } from "@/lib/role-context";
import { useState, useMemo } from "react";
import { projects } from "@/lib/data/projects";
import { filterProjectsByRole, hasPermission, getPageTitle } from "@/lib/utils/role-filter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, FolderKanban, Clock, TrendingUp, DollarSign, Shield, CalendarDays, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ProjectsPage() {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (!user) return null;

  const filteredByRole = useMemo(
    () => filterProjectsByRole(projects, user, user.id),
    [user]
  );

  const filteredProjects = filteredByRole.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || project.status === statusFilter)
  );

  const canCreateProject = hasPermission(user, "project:create");
  const pageTitle = getPageTitle("projects", user.role);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "default";
      case "On Hold": return "warning";
      case "Planning": return "secondary";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const activeProjects = filteredByRole.filter(p => p.status === "In Progress").length;
  const completedProjects = filteredByRole.filter(p => p.status === "Completed").length;
  const totalBudget = filteredByRole.reduce((sum, p) => sum + (p.budget || 0), 0);
  const totalSpent = filteredByRole.reduce((sum, p) => sum + (p.spent || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong> •{" "}
          <strong>{filteredByRole.length}</strong> project{filteredByRole.length !== 1 ? "s" : ""} accessible
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {user.role === "employee"
              ? "Track your project assignments and progress"
              : "Manage and monitor project portfolio"}
          </p>
        </div>
        {canCreateProject && (
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </div>

      {user.role !== "employee" && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-bold">{filteredByRole.length}</p>
                  <p className="text-xs text-muted-foreground">In portfolio</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                  <FolderKanban className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-3xl font-bold">{activeProjects}</p>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </div>
                <Badge variant="default" className="text-sm px-3 py-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completedProjects}</p>
                  <p className="text-xs text-muted-foreground">Successfully delivered</p>
                </div>
                <Badge variant="success" className="text-sm px-3 py-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Done
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Budget Spent</p>
                  <p className="text-3xl font-bold">{((totalSpent / totalBudget) * 100).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">${(totalSpent / 1000).toFixed(0)}K of ${(totalBudget / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Project Portfolio</CardTitle>
          <CardDescription>
            Showing {filteredProjects.length} of {filteredByRole.length} project{filteredByRole.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects by name, description, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2" onClick={() => setStatusFilter("all")}>
              <Filter className="h-4 w-4" />
              All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredProjects.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                <FolderKanban className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No projects found</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card key={project.id} className="border-border/50 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </div>
                      <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(project.status)} className="text-xs">{project.status}</Badge>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.team.length}
                      </span>
                    </div>

                    {project.client && (
                      <p className="text-xs text-muted-foreground">
                        Client: <span className="font-medium text-foreground">{project.client}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
