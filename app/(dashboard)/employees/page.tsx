"use client";

import { useRole } from "@/lib/role-context";
import { useState, useMemo } from "react";
import { employees } from "@/lib/data/employees";
import { filterEmployeesByRole, hasPermission, getPageTitle } from "@/lib/utils/role-filter";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  Users,
  Shield,
  UserCog,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EmployeesPage() {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  // Filter employees based on user role
  const filteredByRole = useMemo(
    () => filterEmployeesByRole(employees, user),
    [user]
  );

  // Further filter based on search
  const filteredEmployees = filteredByRole.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check permissions
  const canAddEmployee = hasPermission(user, "employee:create");
  const canEditEmployee = hasPermission(user, "employee:edit");
  const canDeleteEmployee = hasPermission(user, "employee:delete");
  const canExport = user.role !== "employee";

  const pageTitle = getPageTitle("employees", user.role);
  const pageDescription =
    user.role === "employee"
      ? "View and manage your profile information"
      : user.role === "manager"
      ? "Manage your team members and their information"
      : "Manage employee records across the organization";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong> •{" "}
          <strong>{filteredByRole.length}</strong> employee
          {filteredByRole.length !== 1 ? "s" : ""} accessible
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {pageTitle}
            {user.role === "manager" && (
              <UserCog className="h-7 w-7 text-primary" />
            )}
          </h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
        <div className="flex items-center gap-2">
          {canExport && (
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
          {canAddEmployee && (
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          )}
        </div>
      </div>

      {/* Stats - Only show for admin/hr/manager */}
      {user.role !== "employee" && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {user.role === "manager" ? "Team Size" : "Total Employees"}
                  </p>
                  <p className="text-3xl font-bold">{filteredByRole.length}</p>
                  <p className="text-xs text-muted-foreground">Active workforce</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>
                  <p className="text-3xl font-bold">
                    {filteredByRole.filter((e) => e.status === "Active").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Currently working</p>
                </div>
                <Badge variant="success" className="text-sm px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5 animate-pulse" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    On Leave
                  </p>
                  <p className="text-3xl font-bold">
                    {filteredByRole.filter((e) => e.status === "On Leave").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Temporary absence</p>
                </div>
                <Badge variant="warning" className="text-sm px-3 py-1">
                  Leave
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Performance
                  </p>
                  <p className="text-3xl font-bold">
                    {
                      (
                        filteredByRole.reduce((sum, e) => sum + e.performance, 0) /
                        filteredByRole.length
                      ).toFixed(1)
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">Out of 5.0</p>
                </div>
                <Badge variant="success" className="text-sm px-3 py-1">
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {user.role === "employee"
                  ? "My Information"
                  : user.role === "manager"
                  ? "Team Directory"
                  : "Employee Directory"}
              </CardTitle>
              <CardDescription>
                {user.role === "employee"
                  ? "Your personal information and employment details"
                  : `Showing ${filteredEmployees.length} of ${filteredByRole.length} employee${filteredByRole.length !== 1 ? "s" : ""}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter - Hide for single employee view */}
          {filteredByRole.length > 1 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, department, or role..."
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
          )}

          {/* Table */}
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Role & Department</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  {user.role !== "employee" && <TableHead className="font-semibold">Status</TableHead>}
                  {user.role !== "employee" && <TableHead className="font-semibold">Performance</TableHead>}
                  {canEditEmployee && (
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={canEditEmployee ? 6 : 5}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">No employees found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm shadow-sm">
                            {employee.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{employee.role}</p>
                          <Badge variant="secondary" className="text-xs">
                            {employee.department}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </p>
                          <p className="text-xs flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {employee.location}
                          </p>
                        </div>
                      </TableCell>
                      {user.role !== "employee" && (
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === "Active" ? "success" : "warning"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                      )}
                      {user.role !== "employee" && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">
                                {employee.performance}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                / 5.0
                              </span>
                            </div>
                            {employee.performance >= 4.5 && (
                              <Badge variant="success" className="text-xs">Top</Badge>
                            )}
                          </div>
                        </TableCell>
                      )}
                      {canEditEmployee && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {hasPermission(user, "employee:edit", employee) && (
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Employee
                                </DropdownMenuItem>
                              )}
                              {canDeleteEmployee && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
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
