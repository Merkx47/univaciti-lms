import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, ChevronDown, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Univaciti?",
        a: "Univaciti is a next-generation learning platform that provides intensive tech skills training and certification programmes. We specialize in cloud computing, software engineering, data analytics, and other in-demand tech skills."
      },
      {
        q: "Who can enroll in Univaciti programmes?",
        a: "Our programmes are designed for anyone looking to start or advance their tech career. We have programmes for beginners (TESA), young learners (STEM), and professionals/businesses (NEST)."
      },
      {
        q: "What certifications do you offer?",
        a: "We offer certifications in Cloud Engineering (AWS, Azure, GCP), Data Analytics, Software Engineering (Java & React), Quality Assurance, Solutions Architecture, and AI & Machine Learning."
      },
    ]
  },
  {
    category: "Programmes",
    questions: [
      {
        q: "How long are the programmes?",
        a: "Our TESA programme is an intensive 8-week accelerator. STEM programmes run during school terms and summer camps. NEST programmes are customized based on organizational needs."
      },
      {
        q: "Are the classes online or in-person?",
        a: "We offer both options. Most of our programmes are delivered online with live instructor-led sessions, but we also have in-person cohorts in select locations across Africa."
      },
      {
        q: "What are the prerequisites for enrollment?",
        a: "For TESA, you need basic computer literacy. For specific certifications, prerequisites vary. Our admissions team will guide you through the selection process which includes assessments."
      },
    ]
  },
  {
    category: "Fees & Payment",
    questions: [
      {
        q: "How much do the programmes cost?",
        a: "Programme fees vary by specialization and location. We offer flexible payment plans and scholarship opportunities for qualified candidates. Contact us for detailed pricing."
      },
      {
        q: "Do you offer scholarships or financial aid?",
        a: "Yes! We partner with various organizations to provide scholarships and funding opportunities. Visit our Funding page or contact us to learn about available options."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers, credit/debit cards, and mobile money (in supported regions). Payment plans are available for most programmes."
      },
    ]
  },
  {
    category: "Career & Certification",
    questions: [
      {
        q: "Will I get a job after completing the programme?",
        a: "While we cannot guarantee employment, our placement rate is over 95%. We provide career support including resume building, interview preparation, and connections to our network of hiring partners."
      },
      {
        q: "Are the certifications recognized internationally?",
        a: "Yes. Our programmes prepare you for industry-recognized certifications from AWS, Microsoft, Google Cloud, and Huawei. These certifications are valued globally."
      },
      {
        q: "Do you offer internship opportunities?",
        a: "Yes! Top-performing students get access to internship placements with our partner companies. Internships provide real-world experience and often lead to full-time offers."
      },
    ]
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-foreground/70 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Find answers to common questions about our programmes, certifications, and more.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold mb-4" style={{ color: THEME_PRIMARY }}>{category.category}</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                {category.questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-2xl bg-muted/50">
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="text-foreground/70 mb-4">Can't find the answer you're looking for? Contact our support team.</p>
          <Link href="/contact">
            <Button style={{ backgroundColor: THEME_PRIMARY }} className="text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
