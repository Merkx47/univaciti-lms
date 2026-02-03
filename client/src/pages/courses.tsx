import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  ChevronLeft,
  Filter
} from "lucide-react";
import { mockCourses, nigerianInstructors } from "@/lib/mock-data";

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
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = 
      selectedSpecialization === "all" || course.specialization === selectedSpecialization;
    return matchesSearch && matchesSpec;
  });

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
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specializations.map((spec) => (
              <Button
                key={spec.id}
                variant={selectedSpecialization === spec.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialization(spec.id)}
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
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-36 bg-gradient-to-br from-blue-400 to-cyan-500 relative">
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-4">
                  {course.technologies.slice(0, 4).map((tech) => (
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
                    {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.shortDescription}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollmentCount.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.reduce((acc, m) => acc + m.lessons, 0)} lessons</span>
                  </div>
                </div>

                <Link href={`/course/${course.id}/lesson/1`}>
                  <Button 
                    className="w-full text-white" 
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    Enroll Now
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
      </main>
    </div>
  );
}
