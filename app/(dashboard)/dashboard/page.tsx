"use client";

import { useRole } from "@/lib/role-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FolderKanban,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useRole();

  if (!user) return null;

  // Stats based on role
  const stats = [
    {
      title: "Total Employees",
      value: "156",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "Active employees",
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+8%",
      changeType: "positive",
      icon: FolderKanban,
      description: "In progress",
    },
    {
      title: "Avg Performance",
      value: "4.2",
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Out of 5.0",
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-15%",
      changeType: "negative",
      icon: Clock,
      description: "Due this week",
    },
  ];

  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "completed onboarding",
      time: "2 hours ago",
      status: "success",
    },
    {
      user: "Mike Chen",
      action: "submitted quarterly review",
      time: "4 hours ago",
      status: "info",
    },
    {
      user: "Emily Davis",
      action: "requested leave",
      time: "6 hours ago",
      status: "warning",
    },
    {
      user: "James Wilson",
      action: "joined Beta Launch project",
      time: "1 day ago",
      status: "success",
    },
  ];

  const upcomingTasks = [
    {
      title: "Q4 Performance Reviews",
      dueDate: "Due in 3 days",
      priority: "high",
    },
    {
      title: "Budget Planning Meeting",
      dueDate: "Tomorrow at 2 PM",
      priority: "medium",
    },
    {
      title: "Update Project Allocations",
      dueDate: "Due in 1 week",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your team today.
          </p>
        </div>
        <Button className="gap-2 shadow-sm">
          <ArrowUpRight className="h-4 w-4" />
          View Full Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-border/50 shadow-soft hover:shadow-medium transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                      <span
                        className={`text-xs font-medium ${
                          stat.changeType === "positive"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-medium shadow-sm">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "success"
                            : activity.status === "warning"
                            ? "warning"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="lg:col-span-3 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Your pending items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors"
                >
                  {task.priority === "high" ? (
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {task.dueDate}
                      </p>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                            ? "warning"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Add Employee", icon: Users, href: "/employees" },
              {
                label: "Create Project",
                icon: FolderKanban,
                href: "/projects",
              },
              {
                label: "Performance Review",
                icon: TrendingUp,
                href: "/ratings",
              },
              { label: "View Reports", icon: Clock, href: "/reporting" },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex-col gap-2 hover:border-primary/50 hover:bg-accent transition-all"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
