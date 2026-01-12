"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  Target,
  Edit,
  User as UserIcon,
  Github,
  FolderKanban,
  Percent,
} from "lucide-react";
import { employees } from "@/lib/data/employees";
import { projects } from "@/lib/data/projects";
import { workLogs } from "@/lib/data/work-logs";
import type { UserRole } from "@/lib/role-config";
import { Progress } from "@/components/ui/progress";

interface ProfilePageProps {
  userRole: UserRole;
  currentUserId: string;
  viewMode?: boolean;
}

const calculateTenure = (joinDate: string): number => {
  const join = new Date(joinDate);
  const today = new Date();
  return Math.floor(
    (today.getTime() - join.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
};

const getProficiencyColor = (proficiency: string) => {
  const colors = {
    Expert:
      "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
    Advanced:
      "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    Intermediate:
      "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700",
    Beginner:
      "bg-muted text-muted-foreground border-border",
  };
  return (
    colors[proficiency as keyof typeof colors] || colors.Beginner
  );
};

export function ProfilePage({
  userRole,
  currentUserId,
  viewMode = false,
}: ProfilePageProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const employee = employees.find((emp) => emp.id === currentUserId);

  if (!employee) return null;

  const tenure = calculateTenure(employee.joinDate);
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Get manager info
  const manager = employees.find((emp) => emp.name === employee.manager);

  // Get employee projects and work logs
  const employeeWorkLogs = workLogs.filter(
    (log) => log.employeeId === employee.id
  );
  const employeeProjects = projects.filter((project) =>
    employeeWorkLogs.some((log) => log.projectId === project.id)
  );

  // Calculate total hours logged
  const totalHours = employeeWorkLogs.reduce((sum, log) => sum + log.hours, 0);

  // Calculate monthly hours
  const thisMonth = new Date().toISOString().substring(0, 7);
  const monthlyLogs = employeeWorkLogs.filter((log) =>
    log.date.startsWith(thisMonth)
  );
  const monthlyHours = monthlyLogs.reduce((sum, log) => sum + log.hours, 0);

  // Check if user can edit
  const canEdit =
    (userRole === "employee" && !viewMode) ||
    userRole === "admin" ||
    userRole === "hr";

  // Employee can only edit limited fields
  const canEditLimited = userRole === "employee";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="overflow-hidden border-border/50 shadow-soft">
        <div className="h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-background">
              {initials}
            </div>
          </div>
        </div>
        <div className="pt-16 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                {canEdit && (
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          {canEditLimited
                            ? "Update your personal information. Some fields are restricted."
                            : "Update employee information"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Editable by Employee */}
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            defaultValue={employee.phone}
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            defaultValue={employee.location}
                            placeholder="Enter your address"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="emergency">Emergency Contact</Label>
                          <Input
                            id="emergency"
                            defaultValue={employee.emergencyContact}
                            placeholder="Emergency contact number"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            defaultValue={employee.bio}
                            placeholder="Tell us about yourself"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="github">GitHub URL</Label>
                          <Input
                            id="github"
                            defaultValue={employee.githubUrl}
                            placeholder="https://github.com/username"
                          />
                        </div>

                        {/* Admin/HR only fields */}
                        {!canEditLimited && (
                          <>
                            <div className="grid gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" defaultValue={employee.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" defaultValue={employee.email} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="designation">Designation</Label>
                              <Input
                                id="designation"
                                defaultValue={employee.designation}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="department">Department</Label>
                              <Input
                                id="department"
                                defaultValue={employee.department}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsEditDialogOpen(false)}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <p className="text-muted-foreground text-lg mb-3">
                {employee.designation} • {employee.department}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{employee.code}</Badge>
                <Badge
                  variant={
                    employee.status === "Active" ? "success" : "warning"
                  }
                >
                  {employee.status}
                </Badge>
                <Badge variant="outline">{employee.type}</Badge>
                {employee.githubUrl && (
                  <a
                    href={employee.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                    >
                      <Github className="h-3 w-3" />
                      GitHub
                    </Badge>
                  </a>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{employee.utilization}%</p>
                <p className="text-xs text-muted-foreground">Utilization</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Target className="h-5 w-5 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">
                  {100 - employee.utilization}%
                </p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{tenure}y</p>
                <p className="text-xs text-muted-foreground">Tenure</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Award className="h-5 w-5 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{employee.skills.length}</p>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
            </div>
          </div>
          {employee.bio && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">{employee.bio}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact Information */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Contact</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="break-all">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                <p>{employee.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                <p>{employee.location}</p>
              </div>
            </div>
            {employee.emergencyContact && (
              <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Emergency Contact
                  </p>
                  <p>{employee.emergencyContact}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Employment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Department</p>
              <p className="font-semibold text-sm">{employee.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Designation</p>
              <p className="font-semibold text-sm">{employee.designation}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Employment Type
              </p>
              <Badge variant="outline" className="text-xs">
                {employee.type}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date of Joining</p>
              <p className="font-semibold text-sm">
                {new Date(employee.joinDate).toLocaleDateString()}
              </p>
            </div>
            {manager && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Manager</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-xs font-medium">
                    {manager.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{manager.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {manager.designation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Work Statistics */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Work Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Projects</span>
              <span className="text-sm font-bold">
                {employeeProjects.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Hours</span>
              <span className="text-sm font-bold">{totalHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-sm font-bold">{monthlyHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Work Logs</span>
              <span className="text-sm font-bold">
                {employeeWorkLogs.length}
              </span>
            </div>
            <div className="pt-2 border-t border-border/50">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Utilization</span>
                <span className="text-sm font-bold">{employee.utilization}%</span>
              </div>
              <Progress value={employee.utilization} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Skills ({employee.skills.length})</CardTitle>
                <CardDescription>
                  Technical and professional competencies
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">
                  Expert:{" "}
                  {employee.skills.filter((s) => s.proficiency === "Expert").length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">
                  Advanced:{" "}
                  {employee.skills.filter((s) => s.proficiency === "Advanced").length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-muted-foreground">
                  Intermediate:{" "}
                  {employee.skills.filter((s) => s.proficiency === "Intermediate").length}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill Name</TableHead>
                  <TableHead>Proficiency Level</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.skills.map((skill, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <span className="font-medium">{skill.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getProficiencyColor(skill.proficiency)}
                      >
                        {skill.proficiency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {skill.proficiency === "Expert"
                          ? "Core Competency"
                          : skill.proficiency === "Advanced"
                          ? "Strong"
                          : skill.proficiency === "Intermediate"
                          ? "Competent"
                          : "Learning"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Current Projects */}
      {employeeProjects.length > 0 && (
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Current Projects ({employeeProjects.length})</CardTitle>
                <CardDescription>
                  Projects this employee is working on
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {employeeProjects.map((project) => {
                const projectLogs = employeeWorkLogs.filter(
                  (log) => log.projectId === project.id
                );
                const projectHours = projectLogs.reduce(
                  (sum, log) => sum + log.hours,
                  0
                );
                return (
                  <Card key={project.id} className="border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {project.code}
                          </CardDescription>
                        </div>
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
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hours Logged</span>
                        <span className="font-medium">{projectHours}h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Work Logs</span>
                        <span className="font-medium">{projectLogs.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Priority</span>
                        <Badge
                          variant={
                            project.priority === "High" ||
                            project.priority === "Critical"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {project.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
