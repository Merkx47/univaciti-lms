import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { SiAmazon, SiGooglecloud, SiHuawei } from "react-icons/si";
import azureLogo from "@assets/image_1769038035704.png";
import worldMapImg from "@assets/world_map.png";

export const THEME_PRIMARY = "#1E9AD6";
export const THEME_LIGHT = "#3AAFE6";

export const programmes = [
  { id: "tesa", name: "TESA" },
  { id: "stem", name: "STEM" },
  { id: "nest", name: "NEST" },
];

export const specializations = [
  {
    id: "cloud-engineering",
    name: "Cloud Engineering",
    description: "Choose from the key Hyperscalers and achieve advanced skills in designing, deploying, and managing scalable cloud infrastructure across AWS, Azure, and GCP.",
    skills: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
    programmes: ["tesa", "nest"]
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    description: "Master the art of collecting, analyzing, and visualizing data to drive business decisions. Learn SQL, Python, and modern BI tools for actionable insights.",
    skills: ["SQL", "Python", "Tableau", "Power BI", "Statistics"],
    programmes: ["tesa", "stem", "nest"]
  },
  {
    id: "software-java",
    name: "Software Engineering - Java",
    description: "Build enterprise-grade applications with Java. Cover Spring Boot, microservices, APIs, and industry best practices for scalable backend systems.",
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "Maven"],
    programmes: ["tesa", "nest"]
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    description: "Ensure software excellence through comprehensive testing strategies. Learn manual and automated testing, CI/CD integration, and quality metrics.",
    skills: ["Selenium", "JUnit", "CI/CD", "Test Planning", "Automation"],
    programmes: ["tesa", "nest"]
  },
  {
    id: "software-react",
    name: "Software Engineering - React",
    description: "Create modern, responsive web applications with React. Master components, state management, hooks, and deployment to production environments.",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Testing"],
    programmes: ["tesa", "stem", "nest"]
  },
  {
    id: "solutions-architecture",
    name: "Solutions Architecture",
    description: "Design scalable, resilient, and cost-effective cloud solutions. Learn architectural patterns, security best practices, and system design principles.",
    skills: ["System Design", "Security", "Scalability", "Cost Optimization", "Documentation"],
    programmes: ["tesa", "nest"]
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Apply artificial intelligence and machine learning to solve real-world problems. Cover neural networks, NLP, computer vision, and model deployment.",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    programmes: ["tesa", "stem", "nest"]
  },
];

// Helper function to get specializations for a specific programme
export const getSpecializationsForProgramme = (programmeId: string) => {
  return specializations.filter(spec => spec.programmes.includes(programmeId));
};

export const tabs = [
  { id: "home", label: "Home" },
  { id: "courses", label: "Courses" },
  { id: "structure", label: "Structure" },
  { id: "timetable", label: "Time-Table" },
  { id: "internship", label: "Internship" },
  { id: "fees", label: "Fees" },
  { id: "funding", label: "Funding" },
];

export const cloudProviders = [
  { name: "AWS", icon: SiAmazon, color: "#FF9900", isImage: false },
  { name: "Azure", icon: null, color: "#0078D4", isImage: true, imageSrc: azureLogo },
  { name: "GCP", icon: SiGooglecloud, color: "#4285F4", isImage: false },
  { name: "Huawei", icon: SiHuawei, color: "#FF0000", isImage: false },
];

// Reusable Back Button Component
export function BackButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.history.back()}
      className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${className || ''}`}
      title="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
    </button>
  );
}

export function CalendarTimetable({ cohorts, title }: { cohorts: { name: string; startDate: string; endDate: string; color: string }[]; title: string }) {
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quarters = [
    { name: "Q1", months: [0, 1, 2] },
    { name: "Q2", months: [3, 4, 5] },
    { name: "Q3", months: [6, 7, 8] },
    { name: "Q4", months: [9, 10, 11] },
  ];
  const currentYear = 2026;

  const getDaysInMonth = (month: number) => new Date(currentYear, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number) => new Date(currentYear, month, 1).getDay();

  const getCohortForDate = (month: number, day: number) => {
    const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const matchingCohort = cohorts.find(c => dateStr >= c.startDate && dateStr <= c.endDate);
    if (selectedCohort && matchingCohort?.name !== selectedCohort) return null;
    return matchingCohort;
  };

  const visibleMonths = quarters[currentQuarter].months;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100" data-testid="text-calendar-title">{title}</h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedCohort || ""}
            onChange={(e) => setSelectedCohort(e.target.value || null)}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          >
            <option value="">All Cohorts</option>
            {cohorts.map((cohort, i) => (
              <option key={i} value={cohort.name}>{cohort.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setCurrentQuarter(q => Math.max(0, q - 1))}
          disabled={currentQuarter === 0}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {quarters.map((q, i) => (
            <button
              key={q.name}
              onClick={() => setCurrentQuarter(i)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                currentQuarter === i
                  ? 'text-white'
                  : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              style={currentQuarter === i ? { backgroundColor: THEME_PRIMARY } : {}}
            >
              {q.name} {currentYear}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentQuarter(q => Math.min(3, q + 1))}
          disabled={currentQuarter === 3}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {visibleMonths.map((monthIndex) => (
          <div key={monthIndex} className="border border-slate-300 dark:border-slate-600 rounded-lg p-3 bg-slate-50 dark:bg-slate-700/50">
            <h4 className="text-sm font-medium text-center mb-2" style={{ color: THEME_PRIMARY }}>{months[monthIndex]} {currentYear}</h4>
            <div className="grid grid-cols-7 gap-0.5 text-xs">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center text-slate-500 dark:text-slate-400 font-medium py-1">{d}</div>
              ))}
              {Array.from({ length: getFirstDayOfMonth(monthIndex) }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: getDaysInMonth(monthIndex) }).map((_, i) => {
                const day = i + 1;
                const cohort = getCohortForDate(monthIndex, day);
                return (
                  <div
                    key={day}
                    className={`text-center py-1 rounded-sm ${cohort ? 'text-white font-medium' : 'text-slate-700 dark:text-slate-300'}`}
                    style={cohort ? { backgroundColor: cohort.color } : {}}
                    title={cohort?.name}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {cohorts.map((cohort, i) => (
          <button
            key={i}
            onClick={() => setSelectedCohort(selectedCohort === cohort.name ? null : cohort.name)}
            className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              selectedCohort === cohort.name
                ? 'border-transparent text-white'
                : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            style={selectedCohort === cohort.name ? { backgroundColor: cohort.color } : {}}
          >
            <div className="w-3 h-3 rounded" style={{ backgroundColor: cohort.color }} />
            <span>{cohort.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CoursesContent({ specialization }: { specialization: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modulePage, setModulePage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const courseModules: Record<string, { modules: string[]; skills: string[]; tools: string[] }> = {
    "Cloud Engineering": {
      modules: ["Cloud Fundamentals", "Cloud Services", "Cloud Solution Architecture", "Infrastructure As Code", "DevOps & DevSecOps", "Advanced Security", "Infrastructure Operations"],
      skills: ["Compute, Storage & Networking", "Identity Management", "Automation & Scripting", "CI/CD Pipelines", "Monitoring & Logging", "Cost Optimization"],
      tools: ["Terraform", "Ansible", "Docker", "Kubernetes", "Jenkins", "GitLab CI"]
    },
    "Data Analytics": {
      modules: ["Data Fundamentals", "SQL & Database Design", "Python for Analytics", "Statistical Analysis", "Data Visualization", "Business Intelligence", "Machine Learning Basics"],
      skills: ["Data Cleaning", "ETL Processes", "Dashboard Creation", "Report Writing", "Predictive Modeling", "Data Storytelling"],
      tools: ["Python", "SQL", "Power BI", "Tableau", "Excel", "Pandas"]
    },
    "Software Engineering - Java": {
      modules: ["Java Fundamentals", "Object-Oriented Programming", "Spring Framework", "REST APIs", "Microservices", "Testing & TDD", "Database Integration"],
      skills: ["Clean Code", "Design Patterns", "API Design", "Unit Testing", "Version Control", "Agile Development"],
      tools: ["Java 17+", "Spring Boot", "Maven", "JUnit", "Git", "IntelliJ IDEA"]
    },
    "Quality Assurance": {
      modules: ["QA Fundamentals", "Manual Testing", "Test Planning", "Automation Testing", "Performance Testing", "API Testing", "CI/CD Integration"],
      skills: ["Test Case Design", "Bug Reporting", "Test Automation", "Load Testing", "Security Testing", "Test Management"],
      tools: ["Selenium", "Cypress", "JMeter", "Postman", "JIRA", "TestRail"]
    },
    "Software Engineering - React": {
      modules: ["JavaScript ES6+", "React Fundamentals", "State Management", "React Hooks", "Routing & Navigation", "API Integration", "Testing React Apps"],
      skills: ["Component Design", "State Management", "Responsive Design", "Performance Optimization", "Accessibility", "Modern CSS"],
      tools: ["React 18", "TypeScript", "Redux", "React Query", "Tailwind CSS", "Jest"]
    },
    "Solutions Architecture": {
      modules: ["Architecture Fundamentals", "System Design", "Cloud Architecture", "Security Architecture", "Scalability Patterns", "Cost Optimization", "Documentation"],
      skills: ["Requirements Analysis", "Trade-off Decisions", "Diagramming", "Capacity Planning", "Disaster Recovery", "Stakeholder Communication"],
      tools: ["Draw.io", "Lucidchart", "AWS Well-Architected", "Azure Architecture Center", "Miro", "Confluence"]
    },
    "AI & Machine Learning": {
      modules: ["AI Fundamentals", "Python for ML", "Supervised Learning", "Deep Learning", "NLP Basics", "Computer Vision", "Model Deployment"],
      skills: ["Data Preprocessing", "Feature Engineering", "Model Training", "Hyperparameter Tuning", "Model Evaluation", "MLOps"],
      tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Jupyter", "Hugging Face"]
    }
  };

  const course = courseModules[specialization] || courseModules["Cloud Engineering"];

  // Define slides - add Cloud Platforms only for Cloud Engineering
  const isCloudEngineering = specialization.includes("Cloud Engineering");
  const slides = isCloudEngineering
    ? ["modules", "skills", "tools", "platforms"] as const
    : ["modules", "skills", "tools"] as const;

  const slideLabels = {
    modules: "Course Modules",
    skills: "Skills You'll Gain",
    tools: "Tools & Technologies",
    platforms: "Cloud Platforms"
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const renderSlideContent = () => {
    switch (slides[currentSlide]) {
      case "modules":
        const totalModulePages = Math.ceil(course.modules.length / ITEMS_PER_PAGE);
        const paginatedModules = course.modules.slice(modulePage * ITEMS_PER_PAGE, (modulePage + 1) * ITEMS_PER_PAGE);
        return (
          <div>
            <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[auto_1fr] bg-slate-200 dark:bg-slate-600 border-b-2 border-slate-400 dark:border-slate-500">
                <div className="px-3 py-2 font-semibold text-sm border-r border-slate-400 dark:border-slate-500 w-12 text-center">#</div>
                <div className="px-4 py-2 font-semibold text-sm">Module Name</div>
              </div>
              {paginatedModules.map((module, i) => {
                const actualIndex = modulePage * ITEMS_PER_PAGE + i;
                return (
                  <div
                    key={actualIndex}
                    className={`grid grid-cols-[auto_1fr] ${i !== paginatedModules.length - 1 ? 'border-b border-slate-300 dark:border-slate-600' : ''}`}
                  >
                    <div className="px-3 py-2 text-sm border-r border-slate-300 dark:border-slate-600 w-12 text-center font-medium" style={{ color: THEME_PRIMARY }}>{actualIndex + 1}</div>
                    <div className="px-4 py-2 text-sm text-slate-900 dark:text-slate-100">{module}</div>
                  </div>
                );
              })}
            </div>
            {totalModulePages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  onClick={() => setModulePage(p => Math.max(0, p - 1))}
                  disabled={modulePage === 0}
                  className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Prev
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {modulePage + 1} / {totalModulePages}
                </span>
                <button
                  onClick={() => setModulePage(p => Math.min(totalModulePages - 1, p + 1))}
                  disabled={modulePage === totalModulePages - 1}
                  className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        );
      case "skills":
        return (
          <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
            <div className="bg-slate-200 dark:bg-slate-600 px-4 py-2 font-semibold text-sm border-b-2 border-slate-400 dark:border-slate-500">
              Core Competencies
            </div>
            {course.skills.map((skill, i) => (
              <div
                key={i}
                className={`px-4 py-2 text-sm text-slate-900 dark:text-slate-100 ${i !== course.skills.length - 1 ? 'border-b border-slate-300 dark:border-slate-600' : ''}`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: THEME_PRIMARY }}></span>
                {skill}
              </div>
            ))}
          </div>
        );
      case "tools":
        return (
          <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
            <div className="bg-slate-200 dark:bg-slate-600 px-4 py-2 font-semibold text-sm border-b-2 border-slate-400 dark:border-slate-500">
              Technology Stack
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6">
              {course.tools.map((tool, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 text-sm text-slate-900 dark:text-slate-100 text-center border-slate-300 dark:border-slate-600 ${
                    i < course.tools.length - (course.tools.length % 3 === 0 ? 3 : course.tools.length % 3) ? 'border-b' : ''
                  } ${(i + 1) % 3 !== 0 && i !== course.tools.length - 1 ? 'border-r' : ''} sm:border-r sm:last:border-r-0`}
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        );
      case "platforms":
        return (
          <div className="border-2 border-slate-400 dark:border-slate-500 rounded-lg overflow-hidden">
            <div className="bg-slate-200 dark:bg-slate-600 px-4 py-2 font-semibold text-sm border-b-2 border-slate-400 dark:border-slate-500">
              Supported Providers
            </div>
            <div className="grid grid-cols-4">
              {cloudProviders.map((provider, i) => (
                <div key={i} className={`flex flex-col items-center gap-2 py-4 ${i !== cloudProviders.length - 1 ? 'border-r border-slate-300 dark:border-slate-600' : ''}`}>
                  {provider.isImage ? (
                    <img src={provider.imageSrc} alt={provider.name} className="w-10 h-10 object-contain" />
                  ) : (
                    provider.icon && <provider.icon className="w-10 h-10" style={{ color: provider.color }} />
                  )}
                  <span className="text-xs text-slate-900 dark:text-slate-100 font-medium">{provider.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Fixed Header with Navigation */}
      <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 py-2 z-10">
        <button
          onClick={prevSlide}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 text-center">
          <h3 className="font-semibold text-lg" style={{ color: THEME_PRIMARY }}>
            {slideLabels[slides[currentSlide]]}
          </h3>
          <div className="flex justify-center gap-1.5 mt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentSlide ? '' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                style={i === currentSlide ? { backgroundColor: THEME_PRIMARY } : {}}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div>
        {renderSlideContent()}
      </div>

      {/* Fixed Quick Navigation Tabs */}
      <div className="flex justify-center gap-2 pt-2">
        {slides.map((slide, i) => (
          <button
            key={slide}
            onClick={() => setCurrentSlide(i)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              i === currentSlide
                ? 'text-white border-transparent'
                : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            style={i === currentSlide ? { backgroundColor: THEME_PRIMARY } : {}}
          >
            {slideLabels[slide]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StructureContent({ programme }: { programme: "tesa" | "stem" | "nest" }) {
  const structures = {
    tesa: {
      duration: "8 Weeks Intensive",
      schedule: "Monday - Saturday, 9:00 AM - 5:00 PM",
      weeks: [
        { week: "1-2", title: "Foundation & Core Concepts", description: "Introduction to fundamentals, environment setup, basic exercises" },
        { week: "3-4", title: "Intermediate Skills & Projects", description: "Hands-on projects, real-world scenarios, team collaboration" },
        { week: "5-6", title: "Advanced Topics & Team Projects", description: "Complex problems, capstone project initiation, peer reviews" },
        { week: "7-8", title: "Capstone & Certification Prep", description: "Final project presentation, certification exam preparation" }
      ]
    },
    stem: {
      duration: "12 Weeks Term-based",
      schedule: "Weekends & After-School Options",
      weeks: [
        { week: "1-3", title: "Discovery Phase", description: "Introduction to concepts through games and interactive activities" },
        { week: "4-6", title: "Exploration Phase", description: "Hands-on experiments and guided projects" },
        { week: "7-9", title: "Creation Phase", description: "Build your own projects with mentor guidance" },
        { week: "10-12", title: "Showcase Phase", description: "Present projects, peer collaboration, certificates" }
      ]
    },
    nest: {
      duration: "Flexible (4-16 Weeks)",
      schedule: "Customizable for Organizations",
      weeks: [
        { week: "Phase 1", title: "Assessment & Planning", description: "Skills gap analysis, custom curriculum design, team onboarding" },
        { week: "Phase 2", title: "Core Training", description: "Intensive skill building, workshops, practical exercises" },
        { week: "Phase 3", title: "Application", description: "Apply skills to real company projects with mentorship" },
        { week: "Phase 4", title: "Certification", description: "Skills validation, assessment, certification awards" }
      ]
    }
  };

  const structure = structures[programme];

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600">
          <span className="text-xs text-slate-500 dark:text-slate-400">Duration</span>
          <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{structure.duration}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600">
          <span className="text-xs text-slate-500 dark:text-slate-400">Schedule</span>
          <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{structure.schedule}</p>
        </div>
      </div>
      <div className="space-y-4">
        {structure.weeks.map((week, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-20 flex-shrink-0 px-3 py-3 rounded-lg text-center text-white text-sm font-medium" style={{ backgroundColor: THEME_PRIMARY }}>
              {week.week}
            </div>
            <div className="flex-1 p-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
              <h4 className="font-medium mb-1 text-slate-900 dark:text-slate-100">{week.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{week.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorldMapBackground() {
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
