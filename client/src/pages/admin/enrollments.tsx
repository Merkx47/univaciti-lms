import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Pagination } from "@/components/Pagination";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockStore, Enrollment, User, Course } from "@/lib/mock-store";

const THEME_PRIMARY = "#1E9AD6";

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function AdminEnrollments() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({
    userId: "",
    courseId: "",
  });

  // Load data from store and subscribe to changes
  useEffect(() => {
    setEnrollments(mockStore.getEnrollments());
    setUsers(mockStore.getUsers());
    setCourses(mockStore.getCourses());
    const unsubscribe = mockStore.subscribe(() => {
      setEnrollments(mockStore.getEnrollments());
      setUsers(mockStore.getUsers());
      setCourses(mockStore.getCourses());
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  // Get students for dropdown
  const students = users.filter(u => u.role === "student");

  const handleEnroll = () => {
    if (!newEnrollment.userId || !newEnrollment.courseId) return;

    const userId = Number(newEnrollment.userId);
    const courseId = Number(newEnrollment.courseId);

    try {
      mockStore.addEnrollment(userId, courseId);
      setShowEnrollModal(false);
      setNewEnrollment({ userId: "", courseId: "" });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to enroll student');
    }
  };

  const handleDeleteEnrollment = (id: number) => {
    if (confirm("Are you sure you want to remove this enrollment?")) {
      mockStore.deleteEnrollment(id);
    }
  };

  // Filter enrollments
  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      e.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEnrollments = filteredEnrollments.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
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
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</span>
              </Link>
              <Link href="/admin/courses">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Courses</span>
              </Link>
              <Link href="/admin/users">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Users</span>
              </Link>
              <Link href="/admin/enrollments">
                <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>Enrollments</span>
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Enrollments</h1>
            <p className="text-muted-foreground">Track and manage student course enrollments</p>
          </div>
          <Button
            onClick={() => setShowEnrollModal(true)}
            className="text-white"
            style={{ backgroundColor: THEME_PRIMARY }}
          >
            Enroll Student
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Total Enrollments</p>
            <p className="text-2xl font-bold">{enrollments.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold">{enrollments.filter(e => e.status === "active").length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{enrollments.filter(e => e.status === "completed").length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Avg Progress</p>
            <p className="text-2xl font-bold">
              {enrollments.length > 0 ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length) : 0}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search by student or course..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3 font-medium">Student</th>
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Progress</th>
                <th className="px-6 py-3 font-medium">Enrolled</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedEnrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{enrollment.user.firstName} {enrollment.user.lastName}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm">{enrollment.course.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {enrollment.course.specialization.replace(/-/g, ' ')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[enrollment.status]}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${enrollment.progress}%`, backgroundColor: THEME_PRIMARY }}
                        />
                      </div>
                      <span className="text-sm">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteEnrollment(enrollment.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedEnrollments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No enrollments found</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredEnrollments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </main>

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enroll Student</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select Student</label>
                <select
                  value={newEnrollment.userId}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, userId: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="">Choose a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Select Course</label>
                <select
                  value={newEnrollment.courseId}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, courseId: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="">Choose a course...</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowEnrollModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleEnroll}
                className="flex-1 text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                Enroll Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
