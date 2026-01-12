"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/lib/role-context";
import {
  ArrowRight,
  Users,
  FolderKanban,
  PieChart,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { user } = useRole();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-mesh">
        <div className="text-center space-y-6 p-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-gradient">
              Employee Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Loading your dashboard...
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-mesh">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="glass border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-lg">EmployeeHub</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  Features
                </Button>
                <Button variant="ghost" size="sm">
                  Pricing
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  onClick={() => router.push("/dashboard")}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Enterprise Resource Management
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-gradient">Employee Management</span>
                  <br />
                  <span className="text-foreground">Made Simple</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Streamline your workforce operations with our comprehensive
                  employee management system. Track projects, allocations, and
                  performance all in one place.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="btn-modern btn-primary glow-primary-sm group w-full sm:w-auto"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-modern border-border/50 w-full sm:w-auto"
                >
                  View Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gradient">50K+</div>
                  <div className="text-sm text-muted-foreground">Employees</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gradient">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to{" "}
              <span className="text-gradient">manage your team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you manage employees, projects, and
              resources efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Employee Management
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive employee profiles with skills, allocations, and
                  performance tracking in one place.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manage projects, timelines, and team assignments with
                  real-time updates and notifications.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Resource Allocation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimize resource utilization with intelligent allocation
                  algorithms and analytics.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Performance Analytics
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track employee performance with detailed metrics and
                  customizable evaluation criteria.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered insights to help you make better decisions about
                  workforce planning.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all hover:shadow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Enterprise Security
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bank-level security with role-based access control and
                  compliance features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">EmployeeHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2026 EmployeeHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
