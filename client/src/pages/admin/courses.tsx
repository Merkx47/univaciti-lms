import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { mockCourses, techLogos } from "@/lib/mock-data";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const specializations = [
  { value: "cloud-engineering", label: "Cloud Engineering" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "software-java", label: "Software Engineering (Java)" },
  { value: "software-react", label: "Software Engineering (React)" },
  { value: "quality-assurance", label: "Quality Assurance" },
  { value: "solutions-architecture", label: "Solutions Architecture" },
  { value: "ai-ml", label: "AI & Machine Learning" },
];

export default function AdminCourses() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpec, setFilterSpec] = useState("");
  const [courses, setCourses] = useState(mockCourses);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
      alert("Course deleted successfully!");
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = !filterSpec || course.specialization === filterSpec;
    return matchesSearch && matchesSpec;
  });

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
                <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>Courses</span>
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Courses</h1>
            <p className="text-muted-foreground">Create and manage your course catalog</p>
          </div>
          <Link href="/admin/courses/new">
            <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Published</p>
            <p className="text-2xl font-bold">{courses.filter(c => c.isPublished).length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Draft</p>
            <p className="text-2xl font-bold">{courses.filter(c => !c.isPublished).length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Total Enrollments</p>
            <p className="text-2xl font-bold">{courses.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={filterSpec}
            onChange={(e) => setFilterSpec(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
          >
            <option value="">All Specializations</option>
            {specializations.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-600 p-4 flex items-end">
                <h3 className="text-white font-bold text-lg leading-tight">{course.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.shortDescription}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  {course.technologies?.slice(0, 4).map((tech: string) => (
                    techLogos[tech] && (
                      <img 
                        key={tech} 
                        src={techLogos[tech]} 
                        alt={tech} 
                        className="w-6 h-6"
                        title={tech}
                      />
                    )
                  ))}
                  {(course.technologies?.length || 0) > 4 && (
                    <span className="text-xs text-muted-foreground">+{course.technologies.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">{course.duration}h</span>
                  <span className="text-muted-foreground">{course.enrollmentCount?.toLocaleString() || 0} enrolled</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    course.isPublished
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/courses/${course.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Link href={`/admin/courses/${course.id}/curriculum`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Curriculum</Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses found</p>
            <Link href="/admin/courses/new">
              <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                Create Your First Course
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
