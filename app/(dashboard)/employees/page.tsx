"use client";

import { useRole } from "@/lib/role-context";
import { useState, useMemo } from "react";
import Link from "next/link";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { employees } from "@/lib/data/employees";
import { Textarea } from "@/components/ui/textarea";

export default function EmployeesPage() {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    (typeof employees)[0] | null
  >(null);
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (!user) return null;

  // Filter employees based on user role
  const filteredEmployees = useMemo(() => {
    let result = employees;

    switch (user.role) {
      case "admin":
      case "hr":
        // Admin and HR see everyone
        result = employees;
        break;

      case "manager":
        // Managers see their team members + themselves
        result = employees.filter(
          (emp) => emp.manager === user.name || emp.email === user.email
        );
        break;

      case "employee":
        // Employees only see themselves
        result = employees.filter((emp) => emp.email === user.email);
        break;
    }

    // Apply department filter
    if (filterDepartment !== "all") {
      result = result.filter((emp) => emp.department === filterDepartment);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [user, searchTerm, filterDepartment]);

  // Get unique departments
  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  );

  // Check permissions
  const canAddEmployee = user.role === "admin" || user.role === "hr";
  const canEditEmployee =
    user.role === "admin" || user.role === "hr" || user.role === "manager";
  const canDeleteEmployee = user.role === "admin";
  const canExport = user.role !== "employee";

  // Get page title based on role
  const getPageTitle = () => {
    switch (user.role) {
      case "employee":
        return "My Profile";
      case "manager":
        return "My Team";
      default:
        return "Employees";
    }
  };

  const getPageDescription = () => {
    switch (user.role) {
      case "employee":
        return "View your profile information";
      case "manager":
        return "Manage your team members and their information";
      default:
        return "Manage employee records and information across the organization";
    }
  };

  const handleExport = () => {
    // Export to CSV
    const headers = ["Name", "Email", "Department", "Designation", "Status"];
    const csv = [
      headers.join(","),
      ...filteredEmployees.map((emp) =>
        [
          emp.name,
          emp.email,
          emp.department,
          emp.designation,
          emp.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `employees-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role indicator */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You are viewing as{" "}
          <strong className="capitalize">{user.role}</strong>. You can see{" "}
          <strong>{filteredEmployees.length}</strong> employee
          {filteredEmployees.length !== 1 ? "s" : ""}.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {getPageTitle()}
            {user.role === "manager" && (
              <UserCog className="h-7 w-7 text-muted-foreground" />
            )}
          </h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
        <div className="flex items-center gap-2">
          {canExport && (
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
          {canAddEmployee && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Enter employee details to create a new record
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input id="designation" placeholder="Software Engineer" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 234 567 8900" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="joinDate">Date of Joining *</Label>
                      <Input id="joinDate" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Textarea
                      id="location"
                      placeholder="123 Main St, City, Country"
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
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Employee
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Stats - Only show for admin/hr/manager */}
      {user.role !== "employee" && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {user.role === "manager" ? "Team Members" : "Total Employees"}
                  </p>
                  <p className="text-3xl font-bold">{filteredEmployees.length}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-3xl font-bold">
                    {filteredEmployees.filter((e) => e.status === "Active").length}
                  </p>
                </div>
                <Badge variant="success" className="text-xs">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    On Leave
                  </p>
                  <p className="text-3xl font-bold">
                    {
                      filteredEmployees.filter((e) => e.status === "On Leave")
                        .length
                    }
                  </p>
                </div>
                <Badge variant="warning" className="text-xs">
                  Leave
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Departments
                  </p>
                  <p className="text-3xl font-bold">
                    {new Set(filteredEmployees.map((e) => e.department)).size}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Unique
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
                  ? "Your personal information and details"
                  : `Showing ${filteredEmployees.length} employee${
                      filteredEmployees.length !== 1 ? "s" : ""
                    }`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          {filteredEmployees.length > 1 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    {filterDepartment !== "all" && (
                      <Badge variant="secondary" className="ml-1">
                        1
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Employees</DialogTitle>
                    <DialogDescription>
                      Filter employees by department or other criteria
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Department</Label>
                      <Select
                        value={filterDepartment}
                        onValueChange={setFilterDepartment}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilterDepartment("all");
                        setIsFilterOpen(false);
                      }}
                    >
                      Clear Filters
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)}>
                      Apply
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Table */}
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  {user.role !== "employee" && <TableHead>Status</TableHead>}
                  {user.role !== "employee" && <TableHead>Utilization</TableHead>}
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={user.role === "employee" ? 4 : 6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Link href={`/employees/${employee.id}`}>
                          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-medium shadow-sm">
                              {employee.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{employee.department}</Badge>
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
                            <div className="w-20">
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${employee.utilization}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              {employee.utilization}%
                            </span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        {new Date(employee.joinDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/employees/${employee.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            {canEditEmployee && (
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {canDeleteEmployee && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => {
                                    setSelectedEmployee(employee);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedEmployee?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedEmployee(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
