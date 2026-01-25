import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Building2, Users, Briefcase, Award, Receipt, HandCoins, Target, TrendingUp, Sun, Moon, Check, ChevronDown } from "lucide-react";
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

const cohorts = [
  { name: "Q1 Training", startDate: "2026-01-05", endDate: "2026-03-31", color: "#1E9AD6" },
  { name: "Q2 Training", startDate: "2026-04-01", endDate: "2026-06-30", color: "#3AAFE6" },
  { name: "Q3 Training", startDate: "2026-07-01", endDate: "2026-09-30", color: "#1E9AD6" },
  { name: "Q4 Training", startDate: "2026-10-01", endDate: "2026-12-31", color: "#3AAFE6" },
];

export default function NestPage() {
  const [, setLocation] = useLocation();
  const [selectedProgramme, setSelectedProgramme] = useState("nest");
  const availableSpecializations = getSpecializationsForProgramme("nest");
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
    if (programmeId !== "nest") {
      setLocation(`/programmes/${programmeId}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Building2 className="w-12 h-12 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-xl font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">{currentSpec?.name}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentSpec?.description}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: THEME_PRIMARY }}>Key Skills You'll Learn</h3>
              <div className="flex flex-wrap gap-2">
                {currentSpec?.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-sm text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <Target className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Tailored Curriculum</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Custom-designed courses aligned with your organization's tech stack and goals.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <TrendingUp className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Measurable ROI</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Track employee progress and measure training impact on productivity.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <Users className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Team Training</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Scale training across departments with consistent quality.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <Award className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Industry Certification</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Employees earn recognized certifications upon completion.</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: THEME_PRIMARY }}>Training Delivery Options</h3>
              <div className="flex gap-4">
                <div className="flex-1 p-3 rounded-lg border border-slate-200 dark:border-slate-600 text-center">
                  <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>On-Site</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Training at your location</p>
                </div>
                <div className="flex-1 p-3 rounded-lg border border-slate-200 dark:border-slate-600 text-center">
                  <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Remote</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Virtual instructor-led</p>
                </div>
                <div className="flex-1 p-3 rounded-lg border border-slate-200 dark:border-slate-600 text-center">
                  <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Hybrid</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Best of both worlds</p>
                </div>
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
            <StructureContent programme="nest" />
          </div>
        );
      case "timetable":
        return <CalendarTimetable cohorts={cohorts} title="NEST 2026 Corporate Training Calendar" />;
      case "internship":
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Briefcase className="w-10 h-10 flex-shrink-0" style={{ color: THEME_PRIMARY }} />
              <div>
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Practical Application</h2>
                <p className="text-slate-600 dark:text-slate-300">NEST participants apply their learning directly within their organizations with our project mentorship support.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <Target className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Real Projects</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Apply skills to actual company projects, not hypothetical scenarios.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <Users className="w-8 h-8 mb-2" style={{ color: THEME_PRIMARY }} />
                <h3 className="font-medium mb-1 text-slate-900 dark:text-slate-100">Mentorship</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Ongoing support from industry experts throughout training.</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3" style={{ color: THEME_PRIMARY }}>Application Benefits</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Immediate value to your organization</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Portfolio of completed work projects</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Cross-company collaboration opportunities</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRIMARY }} />Performance tracking and reporting</li>
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
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Corporate Pricing</h2>
                <p className="text-slate-600 dark:text-slate-300">Volume-based pricing designed for organizations of all sizes.</p>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-4 py-3 border-b-2 border-slate-400 dark:border-slate-500">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Pricing Tiers</h3>
              </div>
              <div className="grid grid-cols-[1fr_auto_auto] border-b border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
                <div className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600">Plan</div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 w-28 text-center border-r border-slate-300 dark:border-slate-600">Price</div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 w-24 text-center">Savings</div>
              </div>
              {[
                { plan: "Individual", price: "$1,500", savings: "-" },
                { plan: "Team (5-10)", price: "$1,200", savings: "20% off" },
                { plan: "Department (11-25)", price: "$1,000", savings: "33% off" },
                { plan: "Enterprise (26+)", price: "Custom", savings: "Best Value" }
              ].map((tier, index, arr) => (
                <div key={index} className={`grid grid-cols-[1fr_auto_auto] ${index !== arr.length - 1 ? 'border-b border-slate-300 dark:border-slate-600' : ''} ${tier.plan.includes("Department") ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <div className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 border-r border-slate-300 dark:border-slate-600">{tier.plan}</div>
                  <div className="px-4 py-3 text-sm font-semibold w-28 text-center border-r border-slate-300 dark:border-slate-600" style={{ color: THEME_PRIMARY }}>{tier.price}</div>
                  <div className="px-4 py-3 text-xs text-green-600 dark:text-green-400 w-24 text-center">{tier.savings}</div>
                </div>
              ))}
            </div>

            {/* What's Included Table */}
            <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-4 py-3 border-b-2 border-slate-400 dark:border-slate-500">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">All Plans Include</h3>
              </div>
              {[
                "Full course materials",
                "Industry certification",
                "Dedicated account manager",
                "Progress reporting"
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
                <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100" data-testid="text-tab-title">Funding Options</h2>
                <p className="text-slate-600 dark:text-slate-300">Flexible payment and funding options for corporate training budgets.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Annual Training Contracts</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Commit to yearly training for additional discounts</p>
                  </div>
                  <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>15% OFF</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Quarterly Billing</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Spread payments across quarters</p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-600">Flexible</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Skills Development Grants</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">We help you apply for government grants</p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-green-500/20 text-green-400">Assistance</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">ROI Reporting</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Measure training impact on productivity</p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-600">Included</span>
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
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" data-testid="text-page-title">
                NEST Programme
              </h1>
              <p className="text-slate-300 text-sm">New Employee Skills Training</p>
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
