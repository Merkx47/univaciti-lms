import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, Settings,
  Bell, LogOut, Menu, X, Plus, Search, Sun, Moon, Edit,
  Trash2, Filter, Award, UserPlus, CheckCircle, Clock, XCircle
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const statusIcons: Record<string, any> = {
  active: Clock,
  completed: CheckCircle,
  expired: XCircle,
  pending: Clock,
};

export default function AdminEnrollments() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [newEnrollment, setNewEnrollment] = useState({
    userId: "",
    courseId: "",
  });

  const { data: enrollments, isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/enrollments"],
  });

  const { data: courses } = useQuery<any[]>({
    queryKey: ["/api/courses"],
  });

  const { data: usersData } = useQuery<any>({
    queryKey: ["/api/admin/users"],
  });

  const students = usersData?.users?.filter((u: any) => u.role === "student") || [];

  const createEnrollmentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/enrollments", {
        userId: Number(newEnrollment.userId),
        courseId: Number(newEnrollment.courseId),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/enrollments"] });
      setShowEnrollModal(false);
      setNewEnrollment({ userId: "", courseId: "" });
      toast({ title: "Success", description: "Student enrolled successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to enroll student", variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  const filteredEnrollments = enrollments?.filter(e => {
    const matchesSearch = 
      e.user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: GraduationCap, label: "Enrollments", href: "/admin/enrollments", active: true },
    { icon: Award, label: "Certificates", href: "/admin/certificates" },
    { icon: Bell, label: "Announcements", href: "/admin/announcements" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
          <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
          {sidebarOpen && (
            <div>
              <span className="font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
              <span className="text-xs block text-muted-foreground">Admin Portal</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                style={item.active ? { backgroundColor: THEME_PRIMARY } : {}}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-xl font-bold">Enrollment Management</h1>
                <p className="text-sm text-muted-foreground">Manage student course enrollments</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }} onClick={() => setShowEnrollModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Enroll Student
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search enrollments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{enrollments?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Enrollments</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-bold text-blue-600">{enrollments?.filter((e: any) => e.status === "active").length || 0}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-bold text-green-600">{enrollments?.filter((e: any) => e.status === "completed").length || 0}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-bold text-amber-600">
                {enrollments?.reduce((acc: number, e: any) => acc + e.progress, 0) / (enrollments?.length || 1) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </div>
          </div>

          {/* Enrollments Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Progress</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      Loading enrollments...
                    </td>
                  </tr>
                ) : filteredEnrollments?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No enrollments found
                    </td>
                  </tr>
                ) : (
                  filteredEnrollments?.map((enrollment: any) => {
                    const StatusIcon = statusIcons[enrollment.status] || Clock;
                    return (
                      <tr key={enrollment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: THEME_PRIMARY }}>
                              {enrollment.user?.firstName?.[0]?.toUpperCase() || enrollment.user?.username?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <p className="font-medium">
                                {enrollment.user?.firstName && enrollment.user?.lastName
                                  ? `${enrollment.user.firstName} ${enrollment.user.lastName}`
                                  : enrollment.user?.username}
                              </p>
                              <p className="text-sm text-muted-foreground">{enrollment.user?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{enrollment.course?.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{enrollment.course?.specialization}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${enrollment.progress}%`,
                                  backgroundColor: enrollment.progress === 100 ? "#10B981" : THEME_PRIMARY
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{enrollment.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[enrollment.status] || statusColors.pending}`}>
                            <StatusIcon className="w-3 h-3" />
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Enroll Student in Course</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Student</label>
                <select
                  value={newEnrollment.userId}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, userId: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="">Select a student...</option>
                  {students.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName && s.lastName ? `${s.firstName} ${s.lastName}` : s.username} ({s.email})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Select Course</label>
                <select
                  value={newEnrollment.courseId}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, courseId: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="">Select a course...</option>
                  {courses?.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowEnrollModal(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
                onClick={() => createEnrollmentMutation.mutate()}
                disabled={createEnrollmentMutation.isPending || !newEnrollment.userId || !newEnrollment.courseId}
              >
                {createEnrollmentMutation.isPending ? "Enrolling..." : "Enroll Student"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
