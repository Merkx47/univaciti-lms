import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { GraduationCap, Users, Briefcase, Award, Receipt, HandCoins, Sun, Moon, Check, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import {
  THEME_PRIMARY,
  programmes,
  specializations,
  getSpecializationsForProgramme,
  tabs,
  CalendarTimetable,
  CoursesContent,
  StructureContent,
  BackButton
} from "@/components/programme-shared";
import { SkillsWithLogos } from "@/components/tool-logo";

const cohorts = [
  { name: "January Cohort", startDate: "2026-01-15", endDate: "2026-03-10", color: "#1E9AD6" },
  { name: "March Cohort", startDate: "2026-03-15", endDate: "2026-05-10", color: "#3AAFE6" },
  { name: "July Cohort", startDate: "2026-07-15", endDate: "2026-09-10", color: "#1E9AD6" },
  { name: "September Cohort", startDate: "2026-09-15", endDate: "2026-11-10", color: "#3AAFE6" },
];

export default function TesaPage() {
  const [, setLocation] = useLocation();
  const [selectedProgramme, setSelectedProgramme] = useState("tesa");
  const availableSpecializations = getSpecializationsForProgramme("tesa");
  const [selectedSpecialization, setSelectedSpecialization] = useState(availableSpecializations[0]?.id || "");
  const [activeTab, setActiveTab] = useState("home");
  const [programmeDropdownOpen, setProgrammeDropdownOpen] = useState(false);
  const [specDropdownOpen, setSpecDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const currentSpec = availableSpecializations.find(s => s.id === selectedSpecialization) || availableSpecializations[0];

  const handleProgrammeChange = (programmeId: string) => {
    setSelectedProgramme(programmeId);
    setProgrammeDropdownOpen(false);
    if (programmeId !== "tesa") {
      setLocation(`/programmes/${programmeId}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-12 h-12 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-xl font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">{currentSpec?.name}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentSpec?.description}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: THEME_PRIMARY }}>Key Skills You'll Learn</h3>
              <SkillsWithLogos skills={currentSpec?.skills || []} themeColor={THEME_PRIMARY} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <h3 className="font-medium mb-2" style={{ color: THEME_PRIMARY }}>Programme Duration</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">8-week intensive specialization courses, curated for top quality intakes. Transform from beginner to job-ready professional.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <h3 className="font-medium mb-2" style={{ color: THEME_PRIMARY }}>Quality Experience</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Top quality internship and practical experience through various mission-critical customer projects.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <h3 className="font-medium mb-2" style={{ color: THEME_PRIMARY }}>Selection Process</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Two rounds of proctored assessment in Numeracy and basic computing skills, followed by an interview.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <h3 className="font-medium mb-2" style={{ color: THEME_PRIMARY }}>Job Opportunity</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Near 100% employment within 3 months of course completion. We connect students directly to employers.</p>
              </div>
            </div>
          </div>
        );
      case "courses":
        return (
          <div>
            <h2 className="text-lg font-medium mb-4 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Courses - {currentSpec?.name}</h2>
            <CoursesContent specialization={currentSpec?.name || ""} />
          </div>
        );
      case "structure":
        return (
          <div>
            <h2 className="text-lg font-medium mb-4 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Programme Structure</h2>
            <StructureContent programme="tesa" />
          </div>
        );
      case "timetable":
        return <CalendarTimetable cohorts={cohorts} title="TESA 2026 Cohort Schedule" />;
      case "internship":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Briefcase className="w-10 h-10 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Internship & Practical Experience</h2>
                <p className="text-slate-600 dark:text-slate-300">Upon successful completion of the TESA programme, graduates are connected with partner companies for internship opportunities.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <Users className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Industry Partners</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Access to 50+ partner companies across fintech, banking, telecom, and tech sectors.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <Award className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">100% Placement</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Near 100% employment rate within 3 months of programme completion.</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: THEME_PRIMARY }}>What You'll Experience</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Real-world project experience with actual clients</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Mentorship from senior industry professionals</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Portfolio-building projects for your career</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Networking opportunities with potential employers</li>
              </ul>
            </div>
          </div>
        );
      case "fees":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Receipt className="w-10 h-10 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Programme Fees</h2>
                <p className="text-slate-600 dark:text-slate-300">Invest in your future with TESA's comprehensive training programme.</p>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-4 py-3 border-b-2 border-slate-400 dark:border-slate-500">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Tuition Breakdown</h3>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-slate-300 dark:border-slate-600">
                <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-600">Full Programme Price</div>
                <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 line-through w-32 text-right">$2,000</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-slate-300 dark:border-slate-600">
                <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-600">Qucoon Scholarship (70%)</div>
                <div className="px-4 py-3 text-sm text-green-600 dark:text-green-400 w-32 text-right">-$1,400</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] bg-slate-50 dark:bg-slate-800">
                <div className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 border-r border-slate-300 dark:border-slate-600">Your Price</div>
                <div className="px-4 py-3 text-lg font-bold w-32 text-right" style={{ color: THEME_PRIMARY }}>$600</div>
              </div>
            </div>

            {/* What's Included Table */}
            <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-4 py-3 border-b-2 border-slate-400 dark:border-slate-500">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">What's Included</h3>
              </div>
              {[
                "Full course materials & resources",
                "Hands-on projects & assignments",
                "Certification exam fees",
                "Career placement support",
                "Alumni network access",
                "Mentorship programme"
              ].map((item, index, arr) => (
                <div key={index} className={`flex items-center gap-3 px-4 py-3 ${index !== arr.length - 1 ? 'border-b border-slate-300 dark:border-slate-600' : ''}`}>
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "funding":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <HandCoins className="w-10 h-10 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Funding & Scholarships</h2>
                <p className="text-slate-600 dark:text-slate-300">Multiple funding options available to make TESA accessible for everyone.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg border border-slate-600 bg-gradient-to-r from-slate-100 dark:from-slate-700/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">70% Qucoon Scholarship</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Available for all qualifying candidates</p>
                  </div>
                  <span className="text-xl font-bold" style={{ color: THEME_PRIMARY }}>70% OFF</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">100% Full Scholarship</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">For exceptional candidates demonstrating need and merit</p>
                  </div>
                  <span className="text-xl font-bold text-green-400">FREE</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Payment Plans</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">3-month installment options available</p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200">Flexible</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Early Bird Discount</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Register early for additional savings</p>
                  </div>
                  <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>10% OFF</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-background">
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BackButton className="bg-slate-700/50 hover:bg-slate-600" />
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
                className="text-slate-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/register">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm" data-testid="button-register">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm" data-testid="button-sign-in">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-[#1E9AD6]/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#1E9AD6] flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M40 12C40 12 55 20 55 40C55 55 40 68 40 68C40 68 25 55 25 40C25 20 40 12 40 12Z"/>
                <circle cx="40" cy="38" r="6"/>
                <path d="M25 45L15 55L25 52"/>
                <path d="M55 45L65 55L55 52"/>
                <path d="M35 68L40 75L45 68"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" data-testid="text-page-title">
                TESA Programme
              </h1>
              <p className="text-slate-300 text-sm">Tech Skills Accelerator</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="space-y-3 mb-6">
          <div className="flex items-center border border-slate-600 rounded-lg shadow-lg">
            <div className="w-48 px-4 py-3 bg-slate-700 text-sm font-medium text-slate-200 border-r border-slate-600">
              Programme:
            </div>
            <div className="flex-1 relative">
              <button
                type="button"
                className="w-full px-4 py-3 text-left flex items-center justify-between text-sm bg-slate-800 hover:bg-slate-700 cursor-pointer text-white transition-colors"
                onClick={() => { setProgrammeDropdownOpen(!programmeDropdownOpen); setSpecDropdownOpen(false); }}
                data-testid="dropdown-programme"
              >
                <span className="tracking-widest font-medium">
                  {programmes.find(p => p.id === selectedProgramme)?.name.split('').join(' ')}
                </span>
              </button>
              {programmeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 mt-1 overflow-hidden">
                  {programmes.map((prog) => (
                    <button
                      type="button"
                      key={prog.id}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 border-b border-slate-700 last:border-b-0 text-white transition-colors ${
                        selectedProgramme === prog.id ? 'bg-[#1E9AD6] font-medium' : ''
                      }`}
                      onClick={() => handleProgrammeChange(prog.id)}
                    >
                      {prog.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center border border-slate-600 rounded-lg shadow-lg">
            <div className="w-48 px-4 py-3 bg-slate-700 text-sm font-medium text-slate-200 border-r border-slate-600">
              Specialization:
            </div>
            <div className="flex-1 relative">
              <button
                type="button"
                className="w-full px-4 py-3 text-left flex items-center justify-between text-sm bg-slate-800 hover:bg-slate-700 cursor-pointer text-white transition-colors"
                onClick={() => { setSpecDropdownOpen(!specDropdownOpen); setProgrammeDropdownOpen(false); }}
                data-testid="dropdown-specialization"
              >
                <span>{currentSpec?.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${specDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {specDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 mt-1 overflow-hidden max-h-64 overflow-y-auto">
                  {availableSpecializations.map((spec) => (
                    <button
                      type="button"
                      key={spec.id}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 border-b border-slate-700 last:border-b-0 text-white transition-colors ${
                        selectedSpecialization === spec.id ? 'bg-[#1E9AD6] font-medium' : ''
                      }`}
                      onClick={() => { setSelectedSpecialization(spec.id); setSpecDropdownOpen(false); }}
                    >
                      {spec.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-0 border border-slate-600 rounded-xl overflow-hidden h-[calc(100vh-260px)] shadow-xl">
          <div className="w-48 border-r border-slate-600 bg-slate-800 flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-left text-sm font-medium border-l-4 transition-all ${
                  activeTab === tab.id
                    ? "border-l-[#1E9AD6] bg-[#1E9AD6] text-white"
                    : "border-l-transparent text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 overflow-hidden">
            <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 h-full overflow-y-auto shadow-lg text-slate-900 dark:text-slate-100">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
