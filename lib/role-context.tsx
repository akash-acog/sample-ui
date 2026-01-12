"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { UserRole } from "./role-config"
import { employees } from "./data/employees"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

interface RoleContextType {
  user: User | null
  setUser: (user: User) => void
  switchRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

// Map roles to actual employees
const roleUserMap: Record<UserRole, User> = {
  admin: {
    id: "emp-011",
    name: "Demo Admin",
    email: "admin@company.com",
    role: "admin",
    avatar: "DA",
  },
  hr: {
    id: "emp-005",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "hr",
    avatar: "LA",
  },
  manager: {
    id: "emp-006",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "manager",
    avatar: "JS",
  },
  employee: {
    id: "emp-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "employee",
    avatar: "SJ",
  },
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(roleUserMap.employee)

  const switchRole = (role: UserRole) => {
    setUser(roleUserMap[role])
  }

  return <RoleContext.Provider value={{ user, setUser, switchRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within RoleProvider")
  }
  return context
}
