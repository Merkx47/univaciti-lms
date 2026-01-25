import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";
const THEME_LIGHT = "#3AAFE6";

// Programme Icons
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 12C40 12 55 20 55 40C55 55 40 68 40 68C40 68 25 55 25 40C25 20 40 12 40 12Z"/>
      <circle cx="40" cy="38" r="6"/>
      <path d="M25 45L15 55L25 52"/>
      <path d="M55 45L65 55L55 52"/>
      <path d="M35 68L40 75L45 68"/>
    </svg>
  );
}

function StemIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 25H60"/>
      <path d="M30 25V60"/>
      <path d="M50 25V45C50 55 55 60 60 60"/>
      <circle cx="25" cy="15" r="3" fill="currentColor"/>
      <circle cx="55" cy="15" r="3" fill="currentColor"/>
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="25" width="44" height="45" rx="2"/>
      <rect x="28" y="12" width="24" height="13"/>
      <rect x="25" y="32" width="6" height="6"/>
      <rect x="37" y="32" width="6" height="6"/>
      <rect x="49" y="32" width="6" height="6"/>
      <rect x="25" y="44" width="6" height="6"/>
      <rect x="37" y="44" width="6" height="6"/>
      <rect x="49" y="44" width="6" height="6"/>
      <rect x="35" y="56" width="10" height="14"/>
    </svg>
  );
}

const programmes = [
  {
    id: "tesa",
    name: "TESA",
    fullName: "Tech Skills Accelerator",
    icon: RocketIcon,
    description: "Intensive 8-week tech skills accelerator programme for beginners who need intensive courses in specialized skills.",
    duration: "8 weeks",
    format: "Full-time intensive",
    link: "/programmes/tesa"
  },
  {
    id: "stem",
    name: "STEM",
    fullName: "Science, Tech, Engineering & Maths",
    icon: StemIcon,
    description: "Comprehensive courses in Science, Technology, Engineering and Mathematics designed for young people building foundational tech skills.",
    duration: "12 weeks",
    format: "Part-time flexible",
    link: "/programmes/stem"
  },
  {
    id: "nest",
    name: "NEST",
    fullName: "Enterprise Skills Training",
    icon: BuildingIcon,
    description: "Tailored corporate training programme with rapid but flexible curriculum for employees in key tech skills.",
    duration: "Custom",
    format: "Corporate training",
    link: "/programmes/nest"
  },
];

export default function ProgrammesPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-background">
      <nav className="frosted-nav border-b border-border/30 sticky top-0 z-50">
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4 gradient-text">
            Learning Programmes
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose from the pool of Univaciti programmes and start learning when and how you choose to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programmes.map((programme, index) => (
            <Link key={index} href={programme.link}>
              <div
                className="rounded-2xl p-6 flex flex-col h-full cursor-pointer hover-lift shine-effect border border-white/20 transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <programme.icon className="w-12 h-12 text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{programme.name}</h3>
                    <p className="text-sm text-white/90">{programme.fullName}</p>
                  </div>
                </div>

                <p className="text-base text-white leading-relaxed flex-1 mb-4">
                  {programme.description}
                </p>

                <div className="flex justify-between items-center text-sm text-white/80 mb-4">
                  <span>{programme.duration}</span>
                  <span>{programme.format}</span>
                </div>

                <div
                  className="self-end py-2 px-5 rounded-full text-white text-sm font-medium border border-white/50"
                  style={{ backgroundColor: THEME_LIGHT }}
                >
                  Learn More
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl bg-muted/30 border border-border">
          <h2 className="text-2xl font-light mb-4">Not sure which programme is right for you?</h2>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Take our quick assessment to find the perfect learning path based on your goals, experience level, and schedule.
          </p>
          <Button size="lg" style={{ backgroundColor: THEME_PRIMARY }}>
            Take Assessment
          </Button>
        </div>
      </main>
    </div>
  );
}
