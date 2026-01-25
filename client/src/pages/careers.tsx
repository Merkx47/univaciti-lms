import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, Briefcase, MapPin, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Cloud Instructor",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    description: "Lead cloud certification courses and mentor students in AWS, Azure, and GCP technologies."
  },
  {
    id: 2,
    title: "Curriculum Developer",
    department: "Content",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "Design and develop cutting-edge tech curriculum for our certification programmes."
  },
  {
    id: 3,
    title: "Student Success Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "Support students throughout their learning journey and ensure high completion rates."
  },
  {
    id: 4,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain our learning platform using React, Node.js, and cloud technologies."
  },
  {
    id: 5,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Nairobi, Kenya",
    type: "Full-time",
    description: "Drive brand awareness and student acquisition across African markets."
  },
];

export default function CareersPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
                <span className="text-xl font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Careers at Univaciti</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join our mission to transform tech education across Africa. We're building the future of learning.
          </p>
        </div>

        <div className="mb-12 p-8 rounded-2xl" style={{ backgroundColor: `${THEME_PRIMARY}15` }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: THEME_PRIMARY }}>Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Impactful Work</h3>
              <p className="text-sm text-foreground/70">Help thousands of students launch tech careers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Remote-First</h3>
              <p className="text-sm text-foreground/70">Work from anywhere across the globe</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-foreground/70">Balance work with life on your terms</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        <div className="space-y-4">
          {jobOpenings.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-sm text-foreground/70 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-muted">
                      <Briefcase className="w-3 h-3" /> {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-muted">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-muted">
                      <Clock className="w-3 h-3" /> {job.type}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-2xl bg-muted/50">
          <h3 className="text-xl font-semibold mb-3">Don't see a role that fits?</h3>
          <p className="text-foreground/70 mb-4">We're always looking for talented people. Send us your resume!</p>
          <Button style={{ backgroundColor: THEME_PRIMARY }} className="text-white">
            Submit General Application
          </Button>
        </div>
      </main>
    </div>
  );
}
