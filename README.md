# 🚀 EmployeeHub - Modern HRMS Platform

A comprehensive Human Resource Management System built with **Next.js 15**, **TypeScript**, and **shadcn/ui**. This platform enables efficient employee management, project tracking, and daily work log monitoring with role-based access control.

## ✨ Features

### 🎯 Core Functionality

- **📊 Role-Based Access Control (RBAC)**
  - **Admin**: Full system access, manage all employees and projects
  - **HR**: Employee management, work log oversight, reporting
  - **Manager**: Team management, team work logs, project oversight
  - **Employee**: Personal work logs, assigned projects, profile management

- **⏰ Work Log Tracking**
  - Daily time tracking with start/end timestamps
  - Project-based work logging
  - Task descriptions and status tracking (Completed, In Progress, Blocked)
  - Role-based visibility: Employees see own logs, Managers see team logs, Admin/HR see all

- **👥 Employee Management**
  - Comprehensive employee directory
  - Role-based filtering (Admin/HR see all, Managers see team, Employees see self)
  - Employee profiles with department, team, and status information
  - Search and filter capabilities

- **📁 Project Management**
  - Active project tracking
  - Progress monitoring with visual indicators
  - Team assignment and management
  - Role-based project visibility

- **📈 Dashboard Analytics**
  - Real-time statistics based on role
  - Recent work log activity
  - Active project overview
  - Quick action shortcuts

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/akash-acog/sample-ui.git
cd sample-ui

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Run development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Project Structure

```
sample-ui/
├── app/
│   ├── (dashboard)/          # Dashboard layout group
│   │   ├── dashboard/        # Main dashboard
│   │   ├── work-logs/        # Work log tracking
│   │   ├── employees/        # Employee management
│   │   ├── projects/         # Project management
│   │   └── layout.tsx        # Dashboard layout
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── layout/               # Layout components
│   │   ├── sidebar.tsx       # Navigation sidebar
│   │   ├── header.tsx        # Top header
│   │   └── role-selector.tsx # Role switcher
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── data/                 # Mock data
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── employees.ts      # Employee data
│   │   ├── projects.ts       # Project data
│   │   └── work-logs.ts      # Work log data
│   ├── role-config.ts        # Role configuration
│   └── role-context.tsx      # Role context provider
└── public/                   # Static assets
```

## 👥 User Roles & Permissions

### 🔴 Admin
- View all employees, projects, and work logs
- Full CRUD operations
- Access to all reports and analytics
- System configuration access

### 🟠 HR
- View all employees and work logs
- Manage employee records
- Access HR reports
- Limited system configuration

### 🟡 Manager
- View and manage team members
- Monitor team work logs
- Manage assigned projects
- Team performance reports

### 🟢 Employee
- View personal profile
- Log daily work activities
- View assigned projects
- Update personal information

## 🔄 Role Switching (Demo)

In the top-right corner, use the role selector to switch between:
- **Employee** (Sarah Johnson)
- **Manager** (John Smith)
- **HR** (Lisa Anderson)
- **Admin** (Demo Admin)

## 📱 Key Pages

### Dashboard (`/dashboard`)
- Role-specific overview
- Real-time statistics
- Recent activity feed
- Quick actions

### Work Logs (`/work-logs`)
- Add daily work entries with timestamps
- Track project time allocation
- View work history
- Status tracking (Completed/In Progress/Blocked)

### Employees (`/employees`)
- Employee directory
- Role-based filtering
- Search and filter capabilities
- Employee details and management

### Projects (`/projects`)
- Active and completed projects
- Progress tracking
- Team assignments
- Project timelines

## 🎯 Work Log Features

### For Employees
- ➕ Add new work log entries
- ⏰ Record start and end times
- 📝 Describe work performed
- 🏷️ Tag with project names
- 📊 View personal work history

### For Managers
- 👁️ View team member work logs
- 📈 Monitor team productivity
- 🎯 Track project time allocation
- 📊 Generate team reports

### For Admin/HR
- 🌐 Access all work logs
- 📊 Organization-wide analytics
- 📈 Cross-team insights
- 📋 Comprehensive reporting

## 🎨 UI Components

Using **shadcn/ui** components:
- ✅ Button
- ✅ Card
- ✅ Badge
- ✅ Table
- ✅ Dialog
- ✅ Select
- ✅ Input
- ✅ Textarea
- ✅ Alert
- ✅ Separator
- ✅ Dropdown Menu
- ✅ Avatar

## 🌈 Theming

- Light and Dark mode support
- Custom color scheme
- Gradient utilities
- Soft shadows and borders
- Smooth animations

## 📊 Data Models

### Employee
```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
  manager: string;
  phone: string;
  location: string;
}
```

### Work Log
```typescript
interface WorkLog {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  description: string;
  status: "In Progress" | "Completed" | "Blocked";
  createdAt: string;
  updatedAt: string;
}
```

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "On Hold" | "Completed" | "Cancelled";
  startDate: string;
  endDate?: string;
  team: string[];
  manager: string;
  progress: number;
}
```

## 🚀 Deployment

The app is production-ready and can be deployed to:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Any Node.js hosting platform

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔮 Future Enhancements

- [ ] Leave management system
- [ ] Performance review module
- [ ] Document management
- [ ] Payroll integration
- [ ] Attendance tracking
- [ ] Email notifications
- [ ] Export to PDF/Excel
- [ ] Advanced analytics dashboard
- [ ] Mobile app

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

**Akash** - [GitHub](https://github.com/akash-acog)

---

⭐ If you find this project useful, please give it a star!
