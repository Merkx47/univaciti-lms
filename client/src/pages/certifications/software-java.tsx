import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, ArrowLeft, Clock, BookOpen, Target, Award } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ToolsGrid } from "@/components/tool-logo";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
const THEME_PRIMARY = "#1E9AD6";

function WorldMapWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <img
        src={worldMapImg}
        alt=""
        className="w-full h-full object-cover opacity-[0.08] dark:opacity-[0.12] dark:invert"
        style={{ filter: 'grayscale(100%)' }}
      />
    </div>
  );
}

function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
      <path d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
      <path d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
      <path d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  );
}

const modules = [
  { name: "Java Fundamentals", hours: "20", description: "Java syntax, data types, operators, and control flow" },
  { name: "Object-Oriented Programming", hours: "25", description: "Inheritance, polymorphism, encapsulation, and abstraction" },
  { name: "Data Structures & Algorithms", hours: "30", description: "Arrays, lists, trees, graphs, and common algorithms" },
  { name: "Spring Framework", hours: "25", description: "Spring Boot, Spring MVC, and dependency injection" },
  { name: "Database Integration", hours: "20", description: "JPA, Hibernate, and relational database operations" },
  { name: "RESTful APIs", hours: "15", description: "Designing and implementing REST web services" },
  { name: "Testing & Debugging", hours: "15", description: "JUnit testing and debugging best practices" },
];

const skills = [
  { title: "Core Java", description: "Master Java syntax, data types, operators, and control flow." },
  { title: "OOP Principles", description: "Implement inheritance, polymorphism, encapsulation, and abstraction." },
  { title: "Spring Boot", description: "Build enterprise applications with Spring Boot and Spring MVC." },
  { title: "Database Integration", description: "Work with JPA, Hibernate, and relational databases." },
  { title: "API Development", description: "Design and implement RESTful web services." },
  { title: "Testing", description: "Write unit tests with JUnit and integration tests." },
  { title: "Best Practices", description: "Apply design patterns and clean code principles." },
];

const highlights = [
  { icon: Clock, label: "Duration", value: "150 Hours" },
  { icon: BookOpen, label: "Modules", value: "7 Modules" },
  { icon: Target, label: "Projects", value: "3 Projects" },
  { icon: Award, label: "Certificate", value: "Industry Recognized" },
];

const tools = ["Java 17+", "Spring Boot", "Hibernate", "MySQL", "PostgreSQL", "Maven", "JUnit"];

export default function SoftwareJavaPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-muted/30 relative">
      <WorldMapWatermark />
      <nav className="fixed top-0 left-0 right-0 z-50 frosted-nav border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <img src={logoUrl} alt="Univaciti" className="h-9 w-9 rounded-full" />
                <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/register">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Register</Button>
              </Link>
              <Link href="/login">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <div
            className="rounded-2xl p-8 sm:p-10 border border-white/20 shadow-xl"
            style={{ backgroundColor: THEME_PRIMARY }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                <JavaIcon className="w-12 h-12 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Software Engineering</h1>
                <p className="text-lg text-white/80">Java Specialization</p>
              </div>
            </div>
            <p className="text-white/90 text-base leading-relaxed mb-8">
              Master Java development from fundamentals to enterprise applications.
              This specialization covers core Java, object-oriented programming,
              Spring Framework, database integration, and modern development practices
              to prepare you for backend engineering roles.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <div className="text-white font-semibold">{item.value}</div>
                  <div className="text-white/60 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Modules */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
              Course Modules
            </h2>
            <div className="grid gap-3">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{module.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{module.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>{module.hours}</span>
                    <span className="text-xs text-muted-foreground ml-1">hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
              Skills You'll Learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-medium mb-1" style={{ color: THEME_PRIMARY }}>{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Covered */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Tools & Platforms Covered</h2>
            <ToolsGrid tools={tools} />
          </div>

          {/* CTA */}
          <div className="text-center py-6">
            <Link href="/certify">
              <Button size="lg" className="px-8" style={{ backgroundColor: THEME_PRIMARY }}>
                Get Certified
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              Schedule your certification exam today
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
