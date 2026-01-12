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
  Download,
  Filter,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AllocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const allocations = [
    {
      id: 1,
      employee: "Sarah Johnson",
      role: "Senior Developer",
      project: "Project Alpha",
      allocation: 100,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      billable: true,
    },
    {
      id: 2,
      employee: "Mike Chen",
      role: "Product Manager",
      project: "Beta Launch",
      allocation: 75,
      startDate: "2024-02-01",
      endDate: "2024-08-15",
      billable: true,
    },
    {
      id: 3,
      employee: "Emily Davis",
      role: "UX Designer",
      project: "Website Redesign",
      allocation: 50,
      startDate: "2024-03-10",
      endDate: "2024-09-30",
      billable: false,
    },
    {
      id: 4,
      employee: "James Wilson",
      role: "DevOps Engineer",
      project: "Mobile App v2",
      allocation: 100,
      startDate: "2023-11-01",
      endDate: "2024-04-30",
      billable: true,
    },
    {
      id: 5,
      employee: "Lisa Anderson",
      role: "HR Manager",
      project: "Internal - HR",
      allocation: 100,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      billable: false,
    },
    {
      id: 6,
      employee: "Sarah Johnson",
      role: "Senior Developer",
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
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Allocation
          </Button>
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
            const totalAllocation = employeeAllocations.reduce(
              (sum, a) => sum + a.allocation,
              0
            );
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
