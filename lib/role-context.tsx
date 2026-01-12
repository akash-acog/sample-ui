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

// Map role to appropriate user
const getUserByRole = (role: UserRole): User => {
  switch (role) {
    case "admin":
      return {
        id: "admin-001",
        name: "Admin User",
        email: "admin@company.com",
        role: "admin",
        avatar: "AU",
      }
    case "hr":
      return {
        id: "emp-008",
        name: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        role: "hr",
        avatar: "LA",
      }
    case "manager":
      return {
        id: "emp-006",
        name: "John Smith",
        email: "john.smith@company.com",
        role: "manager",
        avatar: "JS",
      }
    case "employee":
      return {
        id: "emp-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "employee",
        avatar: "SJ",
      }
    default:
      return {
        id: "emp-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "employee",
        avatar: "SJ",
      }
  }
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getUserByRole("admin"))

  const switchRole = (role: UserRole) => {
    setUser(getUserByRole(role))
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
