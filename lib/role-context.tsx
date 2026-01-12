"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { UserRole } from "./role-config"

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

// Map roles to actual employees - using IDs that match employees data
const roleUserMap: Record<UserRole, User> = {
  admin: {
    id: "emp-1",
    name: "Akash Kumar",
    email: "akash@company.com",
    role: "admin",
    avatar: "AK",
  },
  hr: {
    id: "emp-2",
    name: "Priya Sharma",
    email: "priya@company.com",
    role: "hr",
    avatar: "PS",
  },
  manager: {
    id: "emp-3",
    name: "Rahul Verma",
    email: "rahul@company.com",
    role: "manager",
    avatar: "RV",
  },
  employee: {
    id: "emp-4",
    name: "Sneha Patel",
    email: "sneha@company.com",
    role: "employee",
    avatar: "SP",
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
