"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Download,
  Filter,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { employees } from "@/lib/data/employees";
import { projects } from "@/lib/data/projects";

export default function AllocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [allocationPercent, setAllocationPercent] = useState("");

  // Mock data
  const allocations = [
    {
      id: 1,
      employeeId: "emp-1",
      employee: "Akash Kumar",
      role: "Senior Software Engineer",
      project: "Project Alpha",
      allocation: 75,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      billable: true,
    },
    {
      id: 2,
      employeeId: "emp-2",
      employee: "Priya Sharma",
      role: "Senior Designer",
      project: "Beta Launch",
      allocation: 60,
      startDate: "2024-02-01",
      endDate: "2024-08-15",
      billable: true,
    },
    {
      id: 3,
      employeeId: "emp-3",
      employee: "Rahul Verma",
      role: "Software Engineer",
      project: "Website Redesign",
      allocation: 90,
      startDate: "2024-03-10",
      endDate: "2024-09-30",
      billable: false,
    },
    {
      id: 4,
      employeeId: "emp-5",
      employee: "Amit Singh",
      role: "Senior DevOps Engineer",
      project: "Mobile App v2",
      allocation: 75,
      startDate: "2023-11-01",
      endDate: "2024-04-30",
      billable: true,
    },
    {
      id: 5,
      employeeId: "emp-1",
      employee: "Akash Kumar",
      role: "Senior Software Engineer",
      project: "Data Migration",
      allocation: 25,
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      billable: true,
    },
  ];

  const filteredAllocations = allocations.filter(
    (allocation) =>
      allocation.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalEmployees = new Set(allocations.map((a) => a.employee)).size;
  const avgAllocation = Math.round(
    allocations.reduce((sum, a) => sum + a.allocation, 0) / allocations.length
  );
  const billableCount = allocations.filter((a) => a.billable).length;

  // Calculate employee utilization
  const getEmployeeUtilization = (employeeName: string) => {
    return allocations
      .filter((a) => a.employee === employeeName)
      .reduce((sum, a) => sum + a.allocation, 0);
  };

  // Get available allocation for selected employee
  const getAvailableAllocation = (employeeId: string) => {
    const currentAllocations = allocations
      .filter((a) => a.employeeId === employeeId)
      .reduce((sum, a) => sum + a.allocation, 0);
    return 100 - currentAllocations;
  };

  const handleAddAllocation = () => {
    // Validation
    const available = selectedEmployee ? getAvailableAllocation(selectedEmployee) : 100;
    const percent = parseInt(allocationPercent);
    
    if (percent > available) {
      alert(`Cannot allocate more than ${available}%. Employee would be over-allocated.`);
      return;
    }
    
    // Add allocation logic here
    setIsAddDialogOpen(false);
    setSelectedEmployee("");
    setSelectedProject("");
    setAllocationPercent("");
  };

  const handleExport = () => {
    const headers = ["Employee", "Project", "Allocation", "Start Date", "End Date", "Billable"];
    const csv = [
      headers.join(","),
      ...filteredAllocations.map((a) =>
        [a.employee, a.project, `${a.allocation}%`, a.startDate, a.endDate, a.billable ? "Yes" : "No"].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `allocations-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Resource Allocations
          </h1>
          <p className="text-muted-foreground">
            Manage employee project allocations and utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                New Allocation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Allocation</DialogTitle>
                <DialogDescription>
                  Assign an employee to a project with a specific allocation percentage. Maximum 100% total per employee.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="employee">Employee *</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => {
                        const available = getAvailableAllocation(emp.id);
                        return (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name} - {emp.designation} ({available}% available)
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {selectedEmployee && (
                    <Alert className="mt-2">
                      <AlertDescription className="text-sm">
                        Available allocation: <strong>{getAvailableAllocation(selectedEmployee)}%</strong>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.filter(p => p.status !== "Completed").map((proj) => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name} ({proj.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="allocation">Allocation Percentage (%) *</Label>
                  <Input
                    id="allocation"
                    type="number"
                    min="1"
                    max="100"
                    value={allocationPercent}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value <= 100) {
                        setAllocationPercent(e.target.value);
                      }
                    }}
                    placeholder="Enter percentage (1-100)"
                  />
                  {selectedEmployee && allocationPercent && parseInt(allocationPercent) > getAvailableAllocation(selectedEmployee) && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        This allocation exceeds available capacity. Max: {getAvailableAllocation(selectedEmployee)}%
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="billable">Billable</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes - Billable</SelectItem>
                      <SelectItem value="no">No - Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setSelectedEmployee("");
                    setSelectedProject("");
                    setAllocationPercent("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAllocation}
                  disabled={!selectedEmployee || !selectedProject || !allocationPercent}
                >
                  Create Allocation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Allocations
                </p>
                <p className="text-3xl font-bold">{allocations.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-red-500 shadow-sm">
                <PieChart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Allocated Employees
                </p>
                <p className="text-3xl font-bold">{totalEmployees}</p>
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
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Allocation
                </p>
                <p className="text-3xl font-bold">{avgAllocation}%</p>
              </div>
              <Badge variant="success" className="text-xs">
                Optimal
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Billable
                </p>
                <p className="text-3xl font-bold">{billableCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Utilization Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(new Set(allocations.map((a) => a.employee))).map(
          (employeeName) => {
            const employeeAllocations = allocations.filter(
              (a) => a.employee === employeeName
            );
            const totalAllocation = getEmployeeUtilization(employeeName);
            const isOverAllocated = totalAllocation > 100;
            const isUnderAllocated = totalAllocation < 80;

            return (
              <Card
                key={employeeName}
                className="border-border/50 shadow-soft hover:shadow-medium transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-medium shadow-sm">
                        {employeeName.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {employeeName}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {employeeAllocations[0].role}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        isOverAllocated
                          ? "destructive"
                          : isUnderAllocated
                          ? "warning"
                          : "success"
                      }
                    >
                      {totalAllocation}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Overall Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total Allocation
                      </span>
                      <span className="font-medium">{totalAllocation}%</span>
                    </div>
                    <Progress
                      value={Math.min(totalAllocation, 100)}
                      className="h-2"
                    />
                    {isOverAllocated && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Over-allocated by {totalAllocation - 100}%
                      </p>
                    )}
                  </div>

                  {/* Project Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <p className="text-sm font-medium">Projects</p>
                    {employeeAllocations.map((allocation) => (
                      <div
                        key={allocation.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground truncate flex-1">
                          {allocation.project}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {allocation.allocation}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Table View */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Allocations</CardTitle>
              <CardDescription>
                Detailed view of all resource allocations
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
                placeholder="Search allocations..."
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
                  <TableHead>Employee</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Allocation</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Billable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAllocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-medium shadow-sm">
                          {allocation.employee.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {allocation.employee}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {allocation.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{allocation.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={allocation.allocation}
                          className="h-2 w-16"
                        />
                        <span className="text-sm font-medium">
                          {allocation.allocation}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(allocation.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}{" "}
                          -{" "}
                          {new Date(allocation.endDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={allocation.billable ? "success" : "secondary"}
                      >
                        {allocation.billable ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
