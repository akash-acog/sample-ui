"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRole } from "@/lib/role-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { canAccessPage } from "@/lib/role-config";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useRole();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const page = pathname.split("/")[1] || "dashboard";
    if (!canAccessPage(user.role, page)) {
      router.push("/dashboard");
    }
  }, [user, pathname, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Header />

        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-muted rounded-lg animate-pulse"></div>
                    <div className="h-4 w-72 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-32 bg-card rounded-xl border border-border animate-pulse"
                      ></div>
                    ))}
                  </div>
                  <div className="h-96 bg-card rounded-xl border border-border animate-pulse"></div>
                </div>
              }
            >
              <div className="animate-fade-in">{children}</div>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
