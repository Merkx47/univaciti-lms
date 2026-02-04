import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import {
  Search,
  Clock,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { mockStore, Course } from "@/lib/mock-store";

const THEME_PRIMARY = "#1E9AD6";

const techLogos: Record<string, string> = {
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  spring: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  googlecloud: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  powerbi: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  tableau: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
  maven: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  cypress: "https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/logo/cypress-io-logo.svg",
  jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  microservices: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
};

const specializations = [
  { id: "all", name: "All Courses" },
  { id: "cloud-engineering", name: "Cloud Engineering" },
  { id: "data-analytics", name: "Data Analytics" },
  { id: "software-java", name: "Software Engineering (Java)" },
  { id: "software-react", name: "Software Engineering (React)" },
  { id: "quality-assurance", name: "Quality Assurance" },
  { id: "solutions-architecture", name: "Solutions Architecture" },
  { id: "ai-ml", name: "AI & Machine Learning" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Load courses from store and subscribe to changes
  useEffect(() => {
    setCourses(mockStore.getCourses());
    const unsubscribe = mockStore.subscribe(() => {
      setCourses(mockStore.getCourses());
    });
    return unsubscribe;
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec =
      selectedSpecialization === "all" || course.specialization === selectedSpecialization;
    const isPublished = course.isPublished !== false; // Only show published courses
    return matchesSearch && matchesSpec && isPublished;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSpecChange = (spec: string) => {
    setSelectedSpecialization(spec);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Browse Courses</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specializations.map((spec) => (
              <Button
                key={spec.id}
                variant={selectedSpecialization === spec.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleSpecChange(spec.id)}
                style={selectedSpecialization === spec.id ? { backgroundColor: THEME_PRIMARY } : {}}
              >
                {spec.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-muted-foreground">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-36 bg-gradient-to-br from-blue-400 to-cyan-500 relative">
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-4">
                  {(course.technologies || []).slice(0, 4).map((tech) => (
                    techLogos[tech] && (
                      <img
                        key={tech}
                        src={techLogos[tech]}
                        alt={tech}
                        className="w-10 h-10 bg-white rounded-lg p-1.5"
                      />
                    )
                  ))}
                </div>
                {course.isFeatured && (
                  <span
                    className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-white rounded-full"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${THEME_PRIMARY}15`,
                      color: THEME_PRIMARY
                    }}
                  >
                    {(course.difficulty || "Beginner").charAt(0).toUpperCase() + (course.difficulty || "beginner").slice(1)}
                  </span>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.shortDescription || course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration || 0}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{(course as any).totalLessons || course.modules?.length || 0} lessons</span>
                  </div>
                </div>

                <Link href={`/course/${course.id}/lesson/${course.id * 1000 + 1}`}>
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    View Course
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${THEME_PRIMARY}20` }}
            >
              <Search className="w-8 h-8" style={{ color: THEME_PRIMARY }} />
            </div>
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCourses.length > 0 && (
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCourses.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(newSize) => {
                setItemsPerPage(newSize);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
