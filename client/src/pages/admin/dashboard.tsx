import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockCourses, mockEnrollments } from "@/lib/mock-data";

const THEME_PRIMARY = "#1E9AD6";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  const stats = {
    totalUsers: 1523,
    totalCourses: mockCourses.length,
    totalEnrollments: 4892,
    completionRate: 78,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Simple Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-bold text-lg" style={{ color: THEME_PRIMARY }}>Univaciti</span>
                <span className="text-xs block text-muted-foreground">Admin Portal</span>
              </div>
            </div>
            
            <nav className="flex items-center gap-6">
              <Link href="/admin/dashboard">
                <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>Dashboard</span>
              </Link>
              <Link href="/admin/courses">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Courses</span>
              </Link>
              <Link href="/admin/users">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Users</span>
              </Link>
              <Link href="/admin/enrollments">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Enrollments</span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.firstName || user?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.firstName || user?.username}</h1>
          <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
            <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
            <p className="text-3xl font-bold">{stats.totalCourses}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground mb-1">Enrollments</p>
            <p className="text-3xl font-bold">{stats.totalEnrollments.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
            <p className="text-3xl font-bold">{stats.completionRate}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/courses/new">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="font-medium">Create New Course</span>
                  <span className="text-sm text-muted-foreground block">Add a new course to the platform</span>
                </button>
              </Link>
              <Link href="/admin/users">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="font-medium">Manage Users</span>
                  <span className="text-sm text-muted-foreground block">View and manage student accounts</span>
                </button>
              </Link>
              <Link href="/admin/enrollments">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="font-medium">View Enrollments</span>
                  <span className="text-sm text-muted-foreground block">Track student enrollment data</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">New student registered</p>
                  <p className="text-xs text-muted-foreground">Chukwuemeka Okonkwo</p>
                </div>
                <span className="text-xs text-muted-foreground">2 mins ago</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Course completed</p>
                  <p className="text-xs text-muted-foreground">Cloud Engineering Fundamentals</p>
                </div>
                <span className="text-xs text-muted-foreground">15 mins ago</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">New enrollment</p>
                  <p className="text-xs text-muted-foreground">Data Analytics course</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Quiz submitted</p>
                  <p className="text-xs text-muted-foreground">Ngozi Adeyemi scored 92%</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold">Courses</h2>
            <Link href="/admin/courses">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Specialization</th>
                <th className="px-6 py-3 font-medium">Duration</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockCourses.slice(0, 5).map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{course.title}</p>
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {course.specialization.replace(/-/g, ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm">{course.duration}h</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/courses/${course.id}`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
