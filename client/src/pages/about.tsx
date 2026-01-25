import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, Target, Eye, Heart, Users, Award, Globe, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const stats = [
  { number: "10,000+", label: "Students Trained" },
  { number: "95%", label: "Employment Rate" },
  { number: "50+", label: "Countries" },
  { number: "200+", label: "Partner Companies" },
];

const team = [
  { name: "Dr. Amara Okonkwo", role: "Founder & CEO", image: null },
  { name: "Michael Adebayo", role: "Chief Technology Officer", image: null },
  { name: "Sarah Wanjiku", role: "Head of Education", image: null },
  { name: "Emmanuel Nwosu", role: "Head of Operations", image: null },
];

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">About Univaciti</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We're on a mission to democratize tech education and create pathways to prosperity across Africa and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-muted/50">
              <div className="text-3xl font-bold mb-1" style={{ color: THEME_PRIMARY }}>{stat.number}</div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Univaciti was founded in 2020 with a simple belief: that talent is universal, but opportunity is not. 
              We saw brilliant minds across Africa struggling to access quality tech education that could transform their careers.
            </p>
            <p>
              Our founders, themselves products of the African tech ecosystem, set out to build a platform that would 
              bridge this gap. Today, Univaciti has trained thousands of students in cloud computing, software engineering, 
              data analytics, and more.
            </p>
            <p>
              We partner with leading tech companies including AWS, Microsoft, Google, and Huawei to deliver 
              industry-recognized certifications that open doors to global opportunities.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-2xl bg-muted/50">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-foreground/70">
              To accelerate tech skills development and create employment opportunities for the next generation of African tech talent.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-muted/50">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-foreground/70">
              A world where geography is not a barrier to world-class tech education and career opportunities.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-muted/50">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: THEME_PRIMARY }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <p className="text-foreground/70">
              Excellence, accessibility, community, and continuous learning drive everything we do.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-foreground/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: `${THEME_PRIMARY}15` }}>
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-foreground/70 mb-6">Join thousands of learners transforming their careers with Univaciti.</p>
          <Link href="/programmes">
            <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
              Explore Programmes
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
