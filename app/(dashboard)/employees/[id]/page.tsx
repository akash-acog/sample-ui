"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProfilePage } from "@/components/pages/profile-page";
import { useRole } from "@/lib/role-context";
import { employees } from "@/lib/data/employees";

export default function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useRole();

  if (!user) return null;

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    notFound();
  }

  // Check if user can view this employee
  const canView =
    user.role === "admin" ||
    user.role === "hr" ||
    (user.role === "manager" &&
      (employee.manager === user.name || employee.email === user.email)) ||
    (user.role === "employee" && employee.email === user.email);

  if (!canView) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Link href="/employees">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>
      </Link>

      <ProfilePage userRole={user.role} currentUserId={id} viewMode={true} />
    </div>
  );
}
