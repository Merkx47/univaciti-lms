import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { AWSIcon, GCPIcon, HuaweiIcon } from "@/components/icons";
import logoUrl from "@assets/logo_1769031259580.png";
import pepsiLogo from "@assets/image_1769036912372.png";
import unionBankLogo from "@assets/image_1769037382283.png";
import citiLogo from "@assets/image_1769037532565.png";
import stanbicLogo from "@assets/image_1769038375769.png";
import polarisLogo from "@assets/image_1769037805080.png";
import firstBankLogo from "@assets/image_1769037850316.png";
import azureLogo from "@assets/image_1769038035704.png";

const THEME_PRIMARY = "#1E9AD6";

export default function RecruitmentPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && company) {
      toast({ title: "Registration submitted!", description: "We'll be in touch shortly." });
      setEmail("");
      setCompany("");
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <nav className="frosted-nav border-b border-border/30 relative z-10">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <h1 className="text-3xl font-light mb-6 gradient-text text-glow fade-in-up">
          Recruiters
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Join the growing list of recruiters and have access to the pool of exceptional 
              Univaciti graduates. Get alerted by new additions to the pool. Track talents 
              of interest, track skills of interest.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift fade-in-up stagger-1">
                <h3 className="font-semibold mb-2">Access Certified Talent</h3>
                <p className="text-sm text-foreground/70">Browse our pool of certified professionals with verified skills.</p>
              </div>
              <div className="p-4 rounded-lg border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift fade-in-up stagger-2">
                <h3 className="font-semibold mb-2">Skills-Based Matching</h3>
                <p className="text-sm text-foreground/70">Filter candidates by specific certifications and skill sets.</p>
              </div>
              <div className="p-4 rounded-lg border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift fade-in-up stagger-3">
                <h3 className="font-semibold mb-2">Instant Notifications</h3>
                <p className="text-sm text-foreground/70">Get notified when new talent matching your criteria becomes available.</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-border glass-card shine-effect fade-in-up stagger-4">
            <h2 className="text-xl font-semibold mb-4">Register as a Recruiter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <Input 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: THEME_PRIMARY }}
                data-testid="button-submit"
              >
                Register
              </Button>
            </form>
          </div>
        </div>

        {/* Recruiter Logos */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6 text-center">Companies Hiring From Univaciti</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img src={pepsiLogo} alt="Pepsi" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={stanbicLogo} alt="Stanbic IBTC" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={polarisLogo} alt="Polaris Bank" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={citiLogo} alt="Citi" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={firstBankLogo} alt="FirstBank" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={unionBankLogo} alt="Union Bank" className="h-20 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Cloud Platform Partners */}
        <div className="mt-12 p-8 rounded-2xl bg-muted/30 border border-border">
          <h3 className="text-lg font-medium mb-6 text-center" style={{ color: THEME_PRIMARY }}>Cloud Platform Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <AWSIcon className="w-14 h-14" style={{ color: "#FF9900" }} />
              <span className="text-xs text-foreground/70">AWS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src={azureLogo} alt="Azure" className="w-14 h-14 object-contain" />
              <span className="text-xs text-foreground/70">Azure</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <GCPIcon className="w-14 h-14" style={{ color: "#4285F4" }} />
              <span className="text-xs text-foreground/70">Google Cloud</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HuaweiIcon className="w-14 h-14" style={{ color: "#FF0000" }} />
              <span className="text-xs text-foreground/70">Huawei Cloud</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
