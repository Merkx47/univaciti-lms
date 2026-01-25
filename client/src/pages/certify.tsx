import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";

const THEME_PRIMARY = "#1E9AD6";

function WorldMapWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <img
        src={worldMapImg}
        alt=""
        className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.15] dark:invert"
        style={{ filter: 'grayscale(100%)' }}
      />
    </div>
  );
}

function CertifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="16" width="52" height="36" rx="3"/>
      <circle cx="40" cy="34" r="9"/>
      <path d="M36 34L39 37L45 31"/>
      <path d="M33 52L30 68L40 62L50 68L47 52"/>
    </svg>
  );
}

const examTypes = [
  { name: "Cloud Engineering", description: "Validate your cloud infrastructure skills", duration: "90 mins", questions: 60 },
  { name: "Data Analytics", description: "Prove your data analysis expertise", duration: "90 mins", questions: 55 },
  { name: "Software Engineering - Java", description: "Demonstrate Java proficiency", duration: "120 mins", questions: 70 },
  { name: "Quality Assurance", description: "Show your QA capabilities", duration: "90 mins", questions: 50 },
  { name: "Software Engineering - React", description: "Validate React development skills", duration: "90 mins", questions: 55 },
  { name: "Solutions Architecture", description: "Prove system design expertise", duration: "120 mins", questions: 65 },
  { name: "AI & Machine Learning", description: "Demonstrate AI/ML knowledge", duration: "120 mins", questions: 70 },
];

export default function CertifyPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-background relative">
      <WorldMapWatermark />
      <nav className="frosted-nav border-b border-border/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-10 fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 float" style={{ color: THEME_PRIMARY }}>
            <CertifyIcon className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-light mb-3 gradient-text text-glow">
            CERTIFY
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Univaciti certification exams in key tech skills, for skills validation. 
            Get certified to prove your expertise to employers worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-xl border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift shine-effect">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: THEME_PRIMARY }}>1</div>
                <p className="text-sm text-foreground/80">Complete a Univaciti learning programme or self-study</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: THEME_PRIMARY }}>2</div>
                <p className="text-sm text-foreground/80">Register for the certification exam in your specialization</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: THEME_PRIMARY }}>3</div>
                <p className="text-sm text-foreground/80">Take the proctored online exam</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: THEME_PRIMARY }}>4</div>
                <p className="text-sm text-foreground/80">Receive your verified digital certificate</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift shine-effect">
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Industry-recognized certification
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Verifiable digital credentials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Listed in Univaciti talent pool
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Access to exclusive job opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Lifetime certificate validity
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 gradient-text">Available Certification Exams</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examTypes.map((exam, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 border-gray-400 dark:border-slate-500 glass-card glow-card hover-lift cursor-pointer fade-in-up stagger-${(index % 7) + 1}`}>
              <h3 className="font-semibold text-sm mb-1">{exam.name}</h3>
              <p className="text-xs text-foreground/60 mb-2">{exam.description}</p>
              <div className="flex gap-4 text-xs text-foreground/50">
                <span>{exam.duration}</span>
                <span>{exam.questions} questions</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" style={{ backgroundColor: THEME_PRIMARY }}>
            Schedule an Exam
          </Button>
        </div>
      </main>
    </div>
  );
}
