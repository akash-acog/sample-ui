"use client";

import { useRole } from "@/lib/role-context";
import {
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, setUser } = useRole();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  const handleRoleChange = (newRole: string) => {
    setUser({
      ...user,
      role: newRole as "admin" | "hr" | "manager" | "employee",
    });
    router.refresh();
  };

  const roleColors = {
    admin: "bg-red-500/10 text-red-500 border-red-500/20",
    hr: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    manager: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    employee: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees, projects..."
              className="pl-10 bg-card border-border/50 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Role Switcher - For Testing */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50">
                <RefreshCw className="h-4 w-4" />
                <Badge className={`capitalize ${roleColors[user.role]}`}>
                  {user.role}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover/95 backdrop-blur-xl border-border/50"
            >
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Switch Role (Testing)
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={user.role}
                onValueChange={handleRoleChange}
              >
                <DropdownMenuRadioItem value="admin">
                  <div className="flex items-center justify-between w-full">
                    <span>Admin</span>
                    <Badge className="ml-2 bg-red-500/10 text-red-500 border-red-500/20 text-xs">
                      Full Access
                    </Badge>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hr">
                  <div className="flex items-center justify-between w-full">
                    <span>HR Manager</span>
                    <Badge className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                      HR
                    </Badge>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="manager">
                  <div className="flex items-center justify-between w-full">
                    <span>Manager</span>
                    <Badge className="ml-2 bg-purple-500/10 text-purple-500 border-purple-500/20 text-xs">
                      Team Lead
                    </Badge>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="employee">
                  <div className="flex items-center justify-between w-full">
                    <span>Employee</span>
                    <Badge className="ml-2 bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                      Basic
                    </Badge>
                  </div>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 hover:bg-accent"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 hover:bg-accent"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-popover/95 backdrop-blur-xl border-border/50"
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  3 new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto scrollbar-custom">
                {[
                  {
                    title: "New project assigned",
                    description: "You've been assigned to Project Alpha",
                    time: "5 min ago",
                    unread: true,
                  },
                  {
                    title: "Performance review due",
                    description: "Complete your quarterly review by Friday",
                    time: "1 hour ago",
                    unread: true,
                  },
                  {
                    title: "Team meeting reminder",
                    description: "Sprint planning meeting at 3 PM",
                    time: "2 hours ago",
                    unread: true,
                  },
                ].map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium flex items-center gap-2">
                          {notification.title}
                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 hover:bg-accent px-3 h-9"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-medium shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover/95 backdrop-blur-xl border-border/50"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge
                    className={`capitalize w-fit mt-1 ${roleColors[user.role]}`}
                  >
                    {user.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
