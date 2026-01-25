import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cloud Computing in Africa",
    excerpt: "Explore how cloud adoption is transforming businesses across the African continent and creating new opportunities for tech professionals.",
    category: "Cloud Computing",
    author: "Dr. Amara Okonkwo",
    date: "January 20, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "5 Essential Skills Every Data Analyst Needs in 2026",
    excerpt: "From Python to Power BI, discover the must-have skills that employers are looking for in data analytics professionals.",
    category: "Data Analytics",
    author: "Michael Adebayo",
    date: "January 15, 2026",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "How to Prepare for Your AWS Certification Exam",
    excerpt: "A comprehensive guide to acing your AWS certification, including study tips, practice resources, and exam strategies.",
    category: "Certifications",
    author: "Sarah Wanjiku",
    date: "January 10, 2026",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "From Bootcamp to Tech Lead: A Success Story",
    excerpt: "Read how one of our TESA graduates went from complete beginner to leading a development team in just 2 years.",
    category: "Success Stories",
    author: "Emmanuel Nwosu",
    date: "January 5, 2026",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Understanding Microservices Architecture",
    excerpt: "A beginner-friendly introduction to microservices and why they're becoming the standard for modern application development.",
    category: "Software Engineering",
    author: "Michael Adebayo",
    date: "December 28, 2025",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "The Rise of AI in Quality Assurance",
    excerpt: "How artificial intelligence is revolutionizing software testing and what it means for QA professionals.",
    category: "Quality Assurance",
    author: "Sarah Wanjiku",
    date: "December 20, 2025",
    readTime: "6 min read"
  },
];

const categories = ["All", "Cloud Computing", "Data Analytics", "Software Engineering", "Certifications", "Success Stories", "Quality Assurance"];

export default function BlogPage() {
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Univaciti Blog</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Insights, tutorials, and stories from the world of tech education.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
              style={index === 0 ? { backgroundColor: THEME_PRIMARY } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-blue-400 to-cyan-500" />
              <div className="p-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
                  style={{ backgroundColor: THEME_PRIMARY }}
                >
                  {post.category}
                </span>
                <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-foreground/50">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {post.author.split(' ')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date.split(',')[0]}
                    </span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="group">
            Load More Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-16 p-8 rounded-2xl text-center" style={{ backgroundColor: `${THEME_PRIMARY}15` }}>
          <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
            Get the latest articles, tutorials, and updates delivered straight to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
            />
            <Button style={{ backgroundColor: THEME_PRIMARY }} className="text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
